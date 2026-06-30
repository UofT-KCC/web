import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { retrieveKB } from '@/lib/chat/retrieval';
import type { Lang } from '@/lib/chat/retrieval';
import { UTKCC_KB } from '@/data/kb';
import { sponsorData } from '@/data/sponsors-data';
import { execData } from '@/data/executives-data';
import {
  erDirectorEmail,
  joinMemberShipLink,
  kccEmail,
  presEmail,
  recruitmentLink,
  subscribeNewsletterLink,
  vicePresEmail,
} from '@/data/change-annually-data';

// 여기다 루트 추가 할 수 있음
const ALLOWED_INTERNAL_ROUTES = new Set([
  '/',
  '/about',
  '/contact',
  '/events',
  '/executives',
  '/newsletter',
  '/resources',
  '/sponsors',
  '/tmp',
]);

type Source = { title: string; url: string };

type HistoryMsg = {
  role: 'user' | 'assistant';
  content: string;
};

type Match = {
  title: string;
  url: string;
  snippet: string;
  tags: string[];
};

type ChatResponsePayload = {
  answer: string;
  sources: Source[];
  suggestions: string[];
};

type Intent =
  | 'events'
  | 'membership'
  | 'sponsorship'
  | 'eo'
  | 'executives'
  | 'resources'
  | 'newsletter'
  | 'contact'
  | 'general';

type PromptPack = { ko: string[]; en: string[] };

const DEFAULT_AI_MODEL = 'gpt-4.1-nano';
const AI_MODEL_ALIASES: Record<string, string> = {
  'gpt-5.4-nano': DEFAULT_AI_MODEL,
  'gpt-5.4-mini': 'gpt-4.1-mini',
};

function normalizeAiModel(model?: string) {
  const value = model?.trim();
  if (!value) return DEFAULT_AI_MODEL;
  return AI_MODEL_ALIASES[value] ?? value;
}

const AI_MODEL = normalizeAiModel(process.env.CHAT_AI_MODEL);
const AI_ENABLED = process.env.CHAT_AI_ENABLED !== 'false';
const AI_MAX_OUTPUT_TOKENS = Number(process.env.CHAT_AI_MAX_OUTPUT_TOKENS || 420);
const AI_MONTHLY_BUDGET_CAD = Number(
  process.env.CHAT_AI_MONTHLY_BUDGET_CAD ||
    process.env.CHAT_AI_MONTHLY_BUDGET_USD ||
    9.5,
);
const AI_CAD_PER_USD = Number(process.env.CHAT_AI_CAD_PER_USD || 1.5);
const AI_SOFT_REQUEST_LIMIT = Number(process.env.CHAT_AI_MONTHLY_REQUEST_LIMIT || 3500);

const ESTIMATED_PRICING_USD_PER_1M: Record<string, { input: number; output: number }> = {
  'gpt-4.1-nano': { input: 0.1, output: 0.4 },
  'gpt-4.1-mini': { input: 0.4, output: 1.6 },
};

type AiBudgetState = {
  monthKey: string;
  requests: number;
  estimatedCostUsd: number;
  estimatedCostCad: number;
};

const aiBudgetState = globalThis as typeof globalThis & {
  __utkccChatAiBudget?: AiBudgetState;
};

const PROMPT_LIBRARY: Record<Intent, PromptPack> = {
  events: {
    ko: [
      '이번 학기 이벤트는 어디서 확인해요?',
      'RSVP(신청)는 어디서 하나요?',
      '이벤트 공지는 인스타/웹 중 어디가 더 최신이에요?',
      '이벤트 장소/시간은 어디서 확인해요?',
      '이벤트 관련 문의는 어디로 하면 돼요?',
    ],
    en: [
      "Where can I see this semester’s events?",
      'Where do I RSVP/sign up?',
      'Are announcements more up-to-date on Instagram or the website?',
      'Where can I confirm the event time/location?',
      'Who should I contact about events?',
    ],
  },
  membership: {
    ko: [
      'UTKCC 가입/지원은 어디서 해요?',
      '가입 조건이나 절차가 있나요?',
      '회비가 있나요? 있다면 어디서 확인해요?',
      '신입생도 참여할 수 있나요?',
      '가입 관련 문의는 어디로 하면 돼요?',
    ],
    en: [
      'How do I join/apply to UTKCC?',
      'Are there any requirements or steps to join?',
      'Is there a membership fee? Where can I confirm it?',
      'Can first-years participate?',
      'Who should I contact about membership?',
    ],
  },
  sponsorship: {
    ko: [
      '스폰서십(후원) 문의는 어디로 하면 돼요?',
      '스폰서십 안내/덱(Deck)은 어디서 볼 수 있어요?',
      '후원 문의할 때 어떤 정보를 같이 보내면 좋아요?',
      '파트너십 종류(채용/브랜딩 등)는 어디서 확인해요?',
      '빠르게 연락 가능한 공식 채널은 뭐예요?',
    ],
    en: [
      'How do I inquire about sponsorship?',
      'Where can I view the sponsorship info/deck?',
      'What details should I include in a sponsorship email?',
      'Where can I see partnership options (recruiting/branding)?',
      'What’s the fastest official contact channel?',
    ],
  },
  eo: {
    ko: [
      'EO가 정확히 뭐예요?',
      'EO는 익명으로 제출되나요?',
      'EO는 어디서 제출해요?',
      '급한/민감한 내용은 어디로 연락해야 하나요?',
      'EO 제출 후 답변은 어디서 확인하나요?',
    ],
    en: [
      'What is EO exactly?',
      'Is EO anonymous?',
      'Where do I submit EO?',
      'For urgent/sensitive issues, who should I contact instead?',
      'Where would I see any follow-up after submitting EO?',
    ],
  },
  executives: {
    ko: [
      '회장단/디렉터 라인업은 어디서 볼 수 있어요?',
      '특정 팀/디렉터에게 연락하려면 어디서 확인해요?',
      '연락처(이메일/인스타)는 어디에 있어요?',
    ],
    en: [
      'Where can I see the execs/directors list?',
      'How can I contact a specific team/director?',
      'Where can I find official contact info (email/IG)?',
    ],
  },
  resources: {
    ko: [
      '자료/리소스는 어디서 볼 수 있어요?',
      '세미나/행사 자료는 어디에 올라오나요?',
      '커리어 관련 리소스가 있나요?',
      '시험/스터디 자료(족보)는 어디서 확인해요?',
      '중간/기말 대비 자료가 있나요?',
      '소셜 미디어 자료는 어디서 볼 수 있나요?',
    ],
    en: [
      'Where can I find UTKCC resources?',
      'Where are seminar/event materials posted?',
      'Do you have any career-related resources?',
      'Where can I find past exam/study packages?',
      'Do you have midterm/final study materials?',
      'Where can I access social media resources?',
    ],
  },
  newsletter: {
    ko: [
      '뉴스레터는 어디서 볼 수 있어요?',
      '뉴스레터 구독/신청은 어떻게 해요?',
      '새 공지는 어디에서 가장 빨리 올라오나요?',
    ],
    en: [
      'Where can I read the newsletter?',
      'How do I subscribe to the newsletter?',
      'Where are new announcements posted first?',
    ],
  },
  contact: {
    ko: [
      'Contact 페이지는 어디 있어요?',
      '가장 빠른 문의 방법은 뭐예요?',
      '이메일/인스타 중 어디로 연락하는 게 좋아요?',
    ],
    en: [
      'Where is the Contact page?',
      'What’s the fastest way to reach UTKCC?',
      'Should I contact by email or Instagram?',
    ],
  },
  general: {
    ko: [
      '이벤트는 어디서 확인해요?',
      '가입은 어떻게 해요?',
      '스폰서십 문의는 어디로 해요?',
      'EO(익명 피드백)는 어디서 제출해요?',
      '뉴스레터는 어디서 봐요?',
      'Contact는 어디 있어요?',
    ],
    en: [
      'Where can I see events?',
      'How do I join UTKCC?',
      'How do I inquire about sponsorship?',
      'Where do I submit EO (anonymous feedback)?',
      'Where can I read the newsletter?',
      'Where is the Contact page?',
    ],
  },
};

function normalizeSourceUrl(url: string): string | null {
  const u = String(url ?? '').trim();
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
  if (u === '/join') return joinMemberShipLink;
  if (u === '/recruitment') return recruitmentLink;
  if (u === '/eo') return '/contact';
  if (u.startsWith('/') && ALLOWED_INTERNAL_ROUTES.has(u)) return u;
  return null;
}

function cleanHistory(history?: HistoryMsg[]) {
  if (!Array.isArray(history)) return [];

  return history
    .filter(
      (m) =>
        (m?.role === 'user' || m?.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim(),
    )
    .slice(-8)
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, 700),
    }));
}

function pickPrompts(intent: Intent, lang: Lang, n = 4) {
  const pack = PROMPT_LIBRARY[intent] ?? PROMPT_LIBRARY.general;
  const list = lang === 'ko' ? pack.ko : pack.en;
  return list.slice(0, n);
}

function inferIntent(opts: {
  message: string;
  effectiveQuery: string;
  topMatchUrl?: string;
  topMatchTags?: string[];
}): Intent {
  const q = `${opts.message}\n${opts.effectiveQuery}`.toLowerCase();
  const url = (opts.topMatchUrl ?? '').toLowerCase();
  const tags = (opts.topMatchTags ?? []).map((t) => String(t).toLowerCase());
  const tagHas = (w: string) => tags.some((t) => t.includes(w));

  if (/eo|익명|피드백|건의|요청|회장단|디렉터/.test(q) || url.includes('/eo') || tagHas('eo')) return 'eo';
  if (/sponsor|sponsorship|후원|스폰서|파트너|제휴|할인|혜택|benefit|discount/.test(q) || url.includes('sponsor') || tagHas('sponsor')) return 'sponsorship';
  if (/event|이벤트|행사|세미나|rsvp|신청|career|professional|networking|coffee chat|alumni|case competition|커리어|네트워킹|커피챗|친구|소셜|파티/.test(q) || url.includes('/events') || tagHas('event')) return 'events';
  if (/join|member|membership|가입|지원|회비|신입생/.test(q) || url.includes('/join') || tagHas('member')) return 'membership';
  if (/exec|executive|director|운영진|회장단|디렉터/.test(q) || url.includes('/executives') || tagHas('exec')) return 'executives';
  if (/resource|자료|리소스|자료실|study|exam|midterm|final|course|수업|시험|중간|기말|족보/.test(q) || url.includes('/resources') || tagHas('resource')) return 'resources';
  if (/newsletter|뉴스레터|구독/.test(q) || url.includes('/newsletter') || tagHas('newsletter')) return 'newsletter';
  if (/contact|문의|연락|메일|email|instagram|인스타/.test(q) || url.includes('/contact') || tagHas('contact')) return 'contact';

  return 'general';
}

function intentFromText(text: string): Intent {
  return inferIntent({ message: text, effectiveQuery: text });
}

function inferHistoryIntent(history: HistoryMsg[]): Intent {
  for (const msg of [...history].reverse()) {
    const intent = intentFromText(msg.content);
    if (intent !== 'general') return intent;
  }

  return 'general';
}

function isContextualFollowup(message: string) {
  const m = message.trim().toLowerCase();

  if (m.length <= 18 && /(그거|그건|이거|이건|저거|저건|그럼|그러면|더|어디|언제|어떻게|왜|what about|how about|where|when|why|that|this|it)/i.test(m)) {
    return true;
  }

  return /^(and|also|more|tell me more|what about that|how about that)\??$/i.test(m);
}

function topicLabel(intent: Intent, lang: Lang) {
  const labels: Record<Intent, { ko: string; en: string }> = {
    events: { ko: '이벤트', en: 'events' },
    membership: { ko: '가입/멤버십', en: 'membership' },
    sponsorship: { ko: '스폰서십', en: 'sponsorship' },
    eo: { ko: 'EO 익명 피드백', en: 'EO anonymous feedback' },
    executives: { ko: '임원진', en: 'executives' },
    resources: { ko: '리소스', en: 'resources' },
    newsletter: { ko: '뉴스레터', en: 'newsletter' },
    contact: { ko: '문의/연락', en: 'contact' },
    general: { ko: 'UTKCC', en: 'UTKCC' },
  };

  return labels[intent][lang];
}

function buildEffectiveQuery(message: string, history?: HistoryMsg[]) {
  const msg = String(message ?? '').trim();
  const hist = cleanHistory(history);
  const lastUserMessages = hist
    .filter((m) => m.role === 'user')
    .map((m) => m.content)
    .filter(Boolean)
    .slice(-3);

  const currentIntent = intentFromText(msg);
  const historyIntent = inferHistoryIntent(hist);
  const intentContext =
    currentIntent === 'general' && historyIntent !== 'general'
      ? topicLabel(historyIntent, 'en')
      : '';

  if (isContextualFollowup(msg) && lastUserMessages.length > 0) {
    return [intentContext, ...lastUserMessages, msg].filter(Boolean).join('\n');
  }

  return msg;
}

function getRelevantExternalLinks(intent: Intent): Source[] {
  if (intent === 'membership') {
    return [
      { title: 'Membership application', url: joinMemberShipLink },
      { title: 'Recruitment form', url: recruitmentLink },
    ];
  }

  if (intent === 'newsletter') {
    return [{ title: 'Newsletter subscription', url: subscribeNewsletterLink }];
  }

  if (intent === 'sponsorship') {
    return [{ title: 'Sponsor inquiries', url: `mailto:${erDirectorEmail}` }];
  }

  if (intent === 'contact') {
    return [{ title: 'General inquiries', url: `mailto:${kccEmail}` }];
  }

  return [];
}

function dedupeSources(sources: Source[]) {
  const seen = new Set<string>();
  return sources.filter((source) => {
    const key = `${source.title}-${source.url}`;
    if (!source.url || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildSuggestions(intent: Intent, lang: Lang) {
  return pickPrompts(intent, lang, 3);
}

function findExecutiveByMessage(message: string) {
  const normalized = message.toLowerCase();
  return execData.find((exec) => {
    const name = exec.name.toLowerCase();
    return normalized.includes(name);
  });
}

function getMonthKey() {
  return new Date().toISOString().slice(0, 7);
}

function getAiBudgetState() {
  const monthKey = getMonthKey();
  if (!aiBudgetState.__utkccChatAiBudget || aiBudgetState.__utkccChatAiBudget.monthKey !== monthKey) {
    aiBudgetState.__utkccChatAiBudget = {
      monthKey,
      requests: 0,
      estimatedCostUsd: 0,
      estimatedCostCad: 0,
    };
  }

  return aiBudgetState.__utkccChatAiBudget;
}

function canUseAi() {
  if (!AI_ENABLED || !process.env.OPENAI_API_KEY) return false;

  const state = getAiBudgetState();
  return state.requests < AI_SOFT_REQUEST_LIMIT && state.estimatedCostCad < AI_MONTHLY_BUDGET_CAD;
}

function estimateCostUsd(inputTokens = 0, outputTokens = 0) {
  const pricing = ESTIMATED_PRICING_USD_PER_1M[AI_MODEL] ?? ESTIMATED_PRICING_USD_PER_1M[DEFAULT_AI_MODEL];
  return (inputTokens / 1_000_000) * pricing.input + (outputTokens / 1_000_000) * pricing.output;
}

function recordAiUsage(usage?: {
  input_tokens?: number;
  output_tokens?: number;
  total_tokens?: number;
}) {
  const state = getAiBudgetState();
  const usageCostUsd = estimateCostUsd(usage?.input_tokens ?? 0, usage?.output_tokens ?? 0);
  state.requests += 1;
  state.estimatedCostUsd += usageCostUsd;
  state.estimatedCostCad += usageCostUsd * AI_CAD_PER_USD;
}

function buildUtkccContext(lang: Lang, matches: Match[]) {
  const kbFacts = UTKCC_KB.map((entry) => {
    const title = lang === 'ko' ? entry.title_ko : entry.title_en;
    const content = lang === 'ko' ? entry.content_ko : entry.content_en;
    const url = normalizeSourceUrl(entry.url) ?? entry.url;
    return `- ${title}: ${content} [${url}]`;
  }).join('\n');

  const matchedFacts = matches
    .slice(0, 5)
    .map((match) => `- ${match.title}: ${match.snippet} [${match.url || 'no link'}]`)
    .join('\n');

  const sponsors = sponsorData
    .map((sponsor) => `- ${sponsor.name}: ${sponsor.exp}; website ${sponsor.websiteUrl}; location ${sponsor.locationUrl}`)
    .join('\n');

  const executives = execData
    .map((exec) => {
      const intro = exec.intro?.length ? ` Intro: ${exec.intro.join(' ')}` : '';
      return `- ${exec.name}: ${exec.position}, ${exec.dept}; program ${exec.program}; image ${exec.imageSrc}.${intro}`;
    })
    .join('\n');

  return `
UTKCC identity:
- UTKCC stands for University of Toronto Korean Commerce Community.
- UTKCC is a Korean student commerce/career community at the University of Toronto.
- The assistant name is Kacy.
- Current president: ${execData.find((exec) => exec.position === 'president')?.name || 'listed on Executives page'}.
- Current vice president: ${execData.find((exec) => exec.position === 'vice president')?.name || 'listed on Executives page'}.

Official links and contacts:
- General email: ${kccEmail}
- President email: ${presEmail}
- Vice-President email: ${vicePresEmail}
- Sponsorship / ER Director email: ${erDirectorEmail}
- Membership application: ${joinMemberShipLink}
- Executive/intern recruitment: ${recruitmentLink}
- Newsletter subscription: ${subscribeNewsletterLink}
- Website pages: /about, /events, /executives, /sponsors, /resources, /newsletter, /contact
- Instagram: https://www.instagram.com/utkcc_/
- YouTube: https://www.youtube.com/@utkcc3050
- Facebook: https://www.facebook.com/groups/utkcc/
- LinkedIn: https://www.linkedin.com/company/utkcc/mycompany/

Most relevant retrieved facts:
${matchedFacts || '- No high-confidence retrieved facts.'}

UTKCC knowledge base:
${kbFacts}

Current sponsors and partners:
${sponsors}

Current executives and directors:
${executives}
`.trim();
}

function buildSystemPrompt(lang: Lang) {
  return lang === 'ko'
    ? [
        '너는 UTKCC 웹사이트 도우미 Kacy다.',
        '친근하지만 정확하게 한국어로 답한다. 사용자가 영어로 물으면 영어로 답해도 된다.',
        '반드시 제공된 UTKCC CONTEXT 안의 정보만 사실로 사용한다.',
        '정보가 없거나 최신성이 필요한 내용은 지어내지 말고 공식 Contact/공지 확인을 권한다.',
        '짧은 일반 대화, 이름 소개, 감사 인사는 자연스럽게 받아준다.',
        '답변은 보통 2-6문장으로 간결하게 한다. 필요하면 bullet을 쓴다.',
        '링크가 필요하면 텍스트로 페이지명이나 공식 채널을 말하되, 출처 링크 목록은 서버가 별도로 제공한다.',
      ].join('\n')
    : [
        'You are Kacy, the UTKCC website assistant.',
        'Answer warmly and accurately in English unless the user writes Korean.',
        'Use only facts from the provided UTKCC CONTEXT.',
        'If information is missing or time-sensitive, do not invent it; suggest checking Contact or official UTKCC posts.',
        'Handle small talk, name introductions, and thanks naturally.',
        'Keep answers concise, usually 2-6 sentences. Use bullets when helpful.',
        'Mention relevant pages/channels in text; source links are returned separately by the server.',
      ].join('\n');
}

function buildAiInput(opts: {
  message: string;
  lang: Lang;
  history: HistoryMsg[];
  matches: Match[];
}) {
  const historyText = opts.history
    .slice(-6)
    .map((m) => `${m.role}: ${m.content}`)
    .join('\n');

  return `
UTKCC CONTEXT:
${buildUtkccContext(opts.lang, opts.matches)}

RECENT CHAT:
${historyText || '(none)'}

USER MESSAGE:
${opts.message}
`.trim();
}

async function buildAiResponse(opts: {
  message: string;
  lang: Lang;
  history: HistoryMsg[];
  matches: Match[];
  sources: Source[];
  suggestions: string[];
}): Promise<ChatResponsePayload | null> {
  if (!canUseAi()) return null;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await client.responses.create({
      model: AI_MODEL,
      instructions: buildSystemPrompt(opts.lang),
      input: buildAiInput(opts),
      max_output_tokens: AI_MAX_OUTPUT_TOKENS,
    });

    const answer = response.output_text?.trim();
    if (!answer) return null;

    recordAiUsage(response.usage);

    return {
      answer,
      sources: opts.sources,
      suggestions: opts.suggestions,
    };
  } catch (err) {
    console.error('UTKCC chat AI failed', err);
    return null;
  }
}

function handleCommonQuestions(message: string, lang: Lang) {
  const m = String(message ?? '').trim();
  const lower = m.toLowerCase();

  const mentionedExec = findExecutiveByMessage(m);
  if (mentionedExec) {
    const role =
      mentionedExec.position === 'president'
        ? lang === 'ko'
          ? '회장'
          : 'president'
        : mentionedExec.position === 'vice president'
          ? lang === 'ko'
            ? '부회장'
            : 'vice president'
          : mentionedExec.position;

    if (lang === 'ko') {
      return `${mentionedExec.name}님은 UTKCC의 ${role}이고, 소속 부서는 ${mentionedExec.dept}, 전공/프로그램은 ${mentionedExec.program}로 등록되어 있어요.\n\n더 자세한 임원진 라인업은 Executives 페이지에서 확인할 수 있어요.`;
    }

    return `${mentionedExec.name} is listed as UTKCC's ${role}. Department: ${mentionedExec.dept}. Program: ${mentionedExec.program}.\n\nYou can see the full executive lineup on the Executives page.`;
  }

  const nameIntroKo =
    /(?:내\s*이름은|제\s*이름은|나는|저는)\s*([가-힣a-zA-Z]{2,20})(?:이야|야|이에요|예요|입니다|라고\s*해|라고\s*합니다)?[.!?。]*$/i.exec(m) ||
    /^([가-힣a-zA-Z]{2,20})(?:이야|입니다|라고\s*해|라고\s*합니다)[.!?。]*$/i.exec(m);
  const nameIntroEn =
    /^(?:my name is|i am|i'm)\s+([a-zA-Z][a-zA-Z\s'-]{0,30})[.!?]*$/i.exec(m);

  if (lang === 'ko' && nameIntroKo) {
    const name = nameIntroKo[1].trim();
    const notAName = ['신입생', '학생', '멤버', '회원', '임원', '인턴', '스폰서'].includes(name);
    if (!notAName) {
      return `반가워요, ${name}님! 저는 UTKCC 도우미 Kacy예요.\n\n이벤트, 가입/멤버십, 리소스, 스폰서십, 뉴스레터 같은 UTKCC 정보를 같이 찾아드릴게요. 뭐부터 볼까요?`;
    }
  }

  if (lang === 'en' && nameIntroEn) {
    const name = nameIntroEn[1].trim();
    return `Nice to meet you, ${name}! I'm Kacy, the UTKCC website assistant.\n\nI can help with events, membership, resources, sponsorship, newsletters, and contact info. What would you like to check first?`;
  }

  const thanksKo = /^(고마워|감사|감사해|땡큐|ㄱㅅ)(요|요!|!|\.)*$/i.test(m);
  const thanksEn = /^(thanks|thank you|thx|ty)[.!?]*$/i.test(lower);

  if ((lang === 'ko' && thanksKo) || (lang === 'en' && thanksEn)) {
    return lang === 'ko'
      ? '천만에요! 더 궁금한 UTKCC 정보가 있으면 이어서 물어봐 주세요.'
      : 'You’re welcome. Ask me anything else about UTKCC.';
  }

  // What is UTKCC?
  const asksUtkccKo =
    /(utkcc|유티케이씨씨|케이씨씨).*?(뭐야|뭔데|뭐에요|뭔가|무슨)/i.test(m) ||
    /utkcc가\s*뭐/i.test(lower);
  const asksUtkccEn = /(what is|what’s)\s+utkcc\??/i.test(m) || /utkcc\s+meaning/i.test(lower);

  // "What are you?" (bot identity)
  const asksBotKo =
    /(너|넌|당신|너희).*?(뭐야|뭔데|뭐에요|누구|정체)/i.test(m) ||
    /(챗봇|봇|도우미).*?(뭐야|뭔데|누구)/i.test(m);
  const asksBotEn = /(who are you|what are you|what’s this bot)\??/i.test(lower);

  if ((lang === 'ko' && asksUtkccKo) || (lang === 'en' && asksUtkccEn)) {
    const aboutUrl = '/about';
    return lang === 'ko'
      ? `UTKCC는 UofT Korean Commerce Community(한인 커머스/커리어 커뮤니티)예요.\n\n무엇을 찾고 있어요?\n- 이번 학기 이벤트\n- 가입/지원\n- 스폰서십\n- EO(익명 피드백)\n\n관련 페이지: ${aboutUrl}`
      : `UTKCC stands for UofT Korean Commerce Community.\n\nWhat are you looking for?\n- Events\n- Membership / joining\n- Sponsorship\n- EO (anonymous feedback)\n\nRelated page: ${aboutUrl}`;
  }

  if ((lang === 'ko' && asksBotKo) || (lang === 'en' && asksBotEn)) {
    return lang === 'ko'
      ? `안녕하세요! 저는 UTKCC 웹사이트 도우미 Kacy에요 😁\n\nUTKCC 사이트에서 이벤트/가입/스폰서십/EO 같은 정보를 빠르게 찾을 수 있게 도와줄게요.\n\n(도움이 필요하면 help 라고 입력해 주세요.)`
      : `Hey, I’m your assistant Kacy 😁\n\nI can help you find anything related to the UTKCC website, such as events, membership, sponsorship, and EO (anonymous feedback).\n\n(If you need help, type help.)`;
  }

  // What is email?
  const asksEmailKo = /(이메일|메일).*?(뭐야|뭐에요|뭔데|무슨 뜻)/i.test(m);
  const asksEmailEn = /(what is|what’s)\s+(an\s+)?email\??/i.test(m) || /email\s+meaning/i.test(lower);

  if ((lang === 'ko' && asksEmailKo) || (lang === 'en' && asksEmailEn)) {
    return lang === 'ko'
      ? `이메일(email)은 인터넷으로 주고받는 편지 같은 거예요.\n\n보통은\n- 주소: example@gmail.com 같은 형태\n- 용도: 공지/문의/파일 전달\n\nUTKCC에 연락하려면 Contact 페이지에 있는 공식 안내를 따라주면 돼요.`
      : `Email is like a message you send over the internet (digital mail).\n\nUsually:\n- Address: looks like example@gmail.com\n- Used for: announcements, inquiries, sending files\n\nFor UTKCC, follow the official Contact page instructions.`;
  }

  // What is RSVP?
  const asksRsvpKo = /(rsvp|알에스브이피|신청).*?(뭐야|뭐에요|뭔데|무슨 뜻)/i.test(m);
  const asksRsvpEn = /(what is|what’s)\s+rsvp\??/i.test(m);

  if ((lang === 'ko' && asksRsvpKo) || (lang === 'en' && asksRsvpEn)) {
    return lang === 'ko'
      ? `RSVP는 참석 의사를 미리 알려주는 것(사전 신청)이에요.\n\n보통 링크/폼에\n- 이름\n- 연락처\n- 참석 여부\n를 적어서 제출해요.`
      : `RSVP means confirming attendance in advance (pre-registration).\nYou usually fill out a link/form with your info and attendance.`;
  }

  return null;
}

function buildAnswer(opts: {
  message: string;
  effectiveQuery: string;
  lang: Lang;
  matches: Match[];
  topMatchTags?: string[];
  historyIntent: Intent;
}) {
  const { message, effectiveQuery, lang, matches, topMatchTags, historyIntent } = opts;

  const top = matches[0];
  const inferredIntent = inferIntent({
    message,
    effectiveQuery,
    topMatchUrl: top?.url,
    topMatchTags,
  });
  const intent = inferredIntent === 'general' ? historyIntent : inferredIntent;

  if (matches.length === 0) {
    return lang === 'ko'
      ? `그건 제가 가진 UTKCC 정보만으로는 확실히 말하기 어려워요.\n\n대신 ${topicLabel(intent, 'ko')} 쪽으로 이어서 도와드릴 수 있어요. 정확한 최신 정보가 필요한 내용이면 Contact 페이지나 공식 공지를 확인하는 게 좋아요.`
      : `I can't confirm that from the UTKCC info I have right now.\n\nI can still help you around ${topicLabel(intent, 'en')}. For anything time-sensitive or official, please check Contact or UTKCC's official posts.`;
  }

  const usefulMatches = matches
    .filter((m, index, arr) => arr.findIndex((x) => x.title === m.title) === index)
    .slice(0, intent === 'general' ? 2 : 3);
  const detailLines = usefulMatches
    .map((m) => m.snippet.trim())
    .filter(Boolean)
    .slice(0, 3);

  if (lang === 'ko') {
    const lines: string[] = [];

    switch (intent) {
      case 'events':
        lines.push('좋아요, 이벤트 기준으로 보면 이렇게 보면 돼요.');
        break;
      case 'membership':
        lines.push('가입/멤버십 쪽이면 먼저 참여 목적에 따라 보면 좋아요.');
        break;
      case 'sponsorship':
        lines.push('스폰서십 문의라면 공식 Contact 쪽으로 연결하는 게 가장 정확해요.');
        break;
      case 'eo':
        lines.push('EO는 익명 피드백/건의 성격으로 이해하면 돼요.');
        break;
      case 'executives':
        lines.push('임원진 관련 정보는 Executives 페이지가 기준이에요.');
        break;
      case 'resources':
        lines.push('리소스는 수업/시험 대비랑 UTKCC 소식 확인에 초점이 있어요.');
        break;
      case 'newsletter':
        lines.push('뉴스레터는 UTKCC 소식을 한 번에 보는 용도예요.');
        break;
      case 'contact':
        lines.push('문의는 목적별로 연락 채널을 나누면 제일 빨라요.');
        break;
      default:
        lines.push('제가 UTKCC 사이트 정보 기준으로 정리해볼게요.');
    }

    detailLines.forEach((line) => lines.push(`\n- ${line}`));

    if (intent === 'membership') {
      lines.push('\n신입생이면 이벤트를 먼저 보고, 실제 참여/혜택은 멤버십 신청 쪽으로 이어가면 자연스러워요.');
    } else if (intent === 'events') {
      lines.push('\n관심사가 수업 도움인지, 커리어인지, 친구/네트워킹인지에 따라 볼 이벤트가 달라져요.');
    } else if (intent === 'resources') {
      lines.push('\n시험 대비라면 Study Package/Anti-calendar 쪽을 먼저 보면 좋아요.');
    }

    return lines.join('\n');
  }

  const lines: string[] = [];

  switch (intent) {
    case 'events':
      lines.push('For events, here is the best way to think about it.');
      break;
    case 'membership':
      lines.push('For joining or membership, start with what you want out of UTKCC.');
      break;
    case 'sponsorship':
      lines.push('For sponsorship, the official Contact path is the safest route.');
      break;
    case 'eo':
      lines.push('EO is mainly for anonymous feedback or requests.');
      break;
    case 'executives':
      lines.push('For exec/director info, the Executives page is the source of truth.');
      break;
    case 'resources':
      lines.push('For resources, UTKCC mostly points students toward study support and official channels.');
      break;
    case 'newsletter':
      lines.push('The newsletter is for catching up on UTKCC news in one place.');
      break;
    case 'contact':
      lines.push('For contact, it helps to choose the channel by purpose.');
      break;
    default:
      lines.push('Based on the UTKCC site info, here is what I found.');
  }

  detailLines.forEach((line) => lines.push(`\n- ${line}`));

  if (intent === 'membership') {
    lines.push('\nIf you are new, I would look at events first, then membership/recruitment depending on whether you want to attend or help run UTKCC.');
  } else if (intent === 'events') {
    lines.push('\nThe right event depends on whether you want academic help, career networking, or social/community time.');
  } else if (intent === 'resources') {
    lines.push('\nFor studying, start with Study Package or Anti-calendar resources.');
  }

  return lines.join('\n');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body?.message ?? '').trim();
    const lang = (body?.lang === 'en' ? 'en' : 'ko') as Lang;
    const history = cleanHistory(body?.history as HistoryMsg[]);
    const historyIntent = inferHistoryIntent(history);

    if (!message) {
      return NextResponse.json(
        {
          answer: lang === 'ko' ? '메시지를 입력해 주세요.' : 'Please type a message.',
          sources: [],
        },
        { status: 400 }
      );
    }
    if (/^help$/i.test(message.trim())) {
      const effectiveQueryForHelp = buildEffectiveQuery('help', history);
      const kbHelpMatches = retrieveKB(effectiveQueryForHelp, lang, 3);
      const topHelpUrl = kbHelpMatches?.[0]?.url ? String(kbHelpMatches[0].url) : undefined;
      const topHelpTags = (kbHelpMatches?.[0]?.tags ?? []) as string[];

      const intent = inferIntent({
        message: 'help',
        effectiveQuery: effectiveQueryForHelp,
        topMatchUrl: topHelpUrl,
        topMatchTags: topHelpTags,
      });

      const prompts = pickPrompts(intent, lang, 8);
      const answer =
        lang === 'ko'
          ? `💡 도움이 될 수 있는 예시 질문이에요:\n${prompts.map((p) => `- ${p}`).join('\n')}`
          : `💡 Here are some helpful example questions:\n${prompts.map((p) => `- ${p}`).join('\n')}`;

      return NextResponse.json({
        answer,
        sources: [],
        suggestions: buildSuggestions(intent, lang),
      });
    }

    const isGreetingKo = /^(안녕|안녕하세요|ㅎㅇ|하이|반가워)(\s|\?|!|\.)*$/i.test(message);
    const isGreetingEn = /^(hi|hello|hey)(\s|\?|!|\.)*$/i.test(message);

    if ((lang === 'ko' && isGreetingKo) || (lang === 'en' && isGreetingEn)) {
      const answer =
        lang === 'ko'
          ? `안녕하세요! 저는 UTKCC 웹사이트 도우미 Kacy에요 😁\n\nUTKCC 사이트에서 이벤트/가입/스폰서십/EO 같은 정보를 빠르게 찾을 수 있게 도와줄게요.\n\n(도움이 필요하면 help 라고 입력해 주세요.)`
          : `Hey, I’m your assistant Kacy 😁\n\nI can help you find anything related to the UTKCC website, such as events, membership, sponsorship, and EO (anonymous feedback).\n\n(If you need help, type help.)`;

      return NextResponse.json({
        answer,
        sources: [],
        suggestions: buildSuggestions('general', lang),
      });
    }

    const common = handleCommonQuestions(message, lang);
    if (common) {
      const commonIntent = intentFromText(message);
      return NextResponse.json({
        answer: common,
        sources: [],
        suggestions: buildSuggestions(commonIntent, lang),
      });
    }

    const effectiveQuery = buildEffectiveQuery(message, history);

    const kbMatches = retrieveKB(effectiveQuery, lang, 7);
    const topMatchTags = (kbMatches?.[0]?.tags ?? []) as string[];

    const matches: Match[] = kbMatches
      .map((e: any) => ({
        title: lang === 'ko' ? String(e.title_ko ?? '') : String(e.title_en ?? ''),
        url: normalizeSourceUrl(String(e.url ?? '')) ?? '',
        snippet: lang === 'ko' ? String(e.content_ko ?? '') : String(e.content_en ?? ''),
        tags: Array.isArray(e.tags) ? e.tags.map(String) : [],
      }))
      .map((m) => ({ ...m, url: m.url || '' }));

    const answer = buildAnswer({
      message,
      effectiveQuery,
      lang,
      matches,
      topMatchTags,
      historyIntent,
    });

    const intent = inferIntent({
      message,
      effectiveQuery,
      topMatchUrl: matches[0]?.url,
      topMatchTags,
    });
    const effectiveIntent = intent === 'general' ? historyIntent : intent;

    const sources: Source[] = dedupeSources([
      ...matches
        .filter((m) => typeof m.url === 'string' && m.url.length > 0)
        .slice(0, 3)
        .map((m) => ({ title: m.title, url: m.url })),
      ...getRelevantExternalLinks(effectiveIntent),
    ]).slice(0, 4);

    const suggestions = buildSuggestions(effectiveIntent, lang);
    const aiResponse = await buildAiResponse({
      message,
      lang,
      history,
      matches,
      sources,
      suggestions,
    });

    if (aiResponse) {
      return NextResponse.json(aiResponse);
    }

    return NextResponse.json({
      answer,
      sources,
      suggestions,
    });
  } catch (err) {
    return NextResponse.json({ answer: 'Server error. Please try again.', sources: [] }, { status: 500 });
  }
}
