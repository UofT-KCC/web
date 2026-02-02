import { NextResponse } from 'next/server';
import { retrieveKB } from '@/lib/chat/retrieval';
import type { Lang } from '@/lib/chat/retrieval';

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

type Match = { title: string; url: string; snippet: string };

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
    ],
    en: [
      'Where can I find UTKCC resources?',
      'Where are seminar/event materials posted?',
      'Do you have any career-related resources?',
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
      'Contact는 어디 있어요?',
    ],
    en: [
      'Where can I see events?',
      'How do I join UTKCC?',
      'How do I inquire about sponsorship?',
      'Where do I submit EO (anonymous feedback)?',
      'Where is the Contact page?',
    ],
  },
};

function normalizeSourceUrl(url: string): string | null {
  const u = String(url ?? '').trim();
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/') && ALLOWED_INTERNAL_ROUTES.has(u)) return u;
  return null;
}

function buildEffectiveQuery(message: string, history?: HistoryMsg[]) {
  const msg = String(message ?? '').trim();
  const hist = Array.isArray(history) ? history : [];

  const lastUserAll = hist
    .filter((m) => m?.role === 'user' && typeof m.content === 'string')
    .map((m) => m.content.trim())
    .filter(Boolean);

  const lastUser =
    lastUserAll.length > 0 && lastUserAll[lastUserAll.length - 1] === msg
      ? lastUserAll.slice(0, -1).slice(-3)
      : lastUserAll.slice(-3);

  const looksLikeFollowup =
    msg.length <= 14 && /(그거|이거|저거|그건|이건|그걸|이걸|그거야|이거야|that|it|this)/i.test(msg);

  if (looksLikeFollowup && lastUser.length > 0) {
    const prev = lastUser[lastUser.length - 1];
    return `${prev}\n${msg}`;
  }

  const combined = [...lastUser, msg].join('\n');
  return combined.trim();
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
  if (/sponsor|sponsorship|후원|스폰서|파트너/.test(q) || url.includes('sponsor') || tagHas('sponsor')) return 'sponsorship';
  if (/event|이벤트|행사|세미나|rsvp|신청/.test(q) || url.includes('/events') || tagHas('event')) return 'events';
  if (/join|member|membership|가입|지원|회비|신입생/.test(q) || url.includes('/join') || tagHas('member')) return 'membership';
  if (/exec|executive|director|운영진|회장단|디렉터/.test(q) || url.includes('/executives') || tagHas('exec')) return 'executives';
  if (/resource|자료|리소스|자료실/.test(q) || url.includes('/resources') || tagHas('resource')) return 'resources';
  if (/newsletter|뉴스레터|구독/.test(q) || url.includes('/newsletter') || tagHas('newsletter')) return 'newsletter';
  if (/contact|문의|연락|메일|email|instagram|인스타/.test(q) || url.includes('/contact') || tagHas('contact')) return 'contact';

  return 'general';
}

function formatLinkLine(title: string, url: string) {
  return url ? `- ${title} (${url})` : `- ${title}`;
}

function handleCommonQuestions(message: string, lang: Lang) {
  const m = String(message ?? '').trim();
  const lower = m.toLowerCase();

  // What is UTKCC?
  const asksUtkccKo = /(utkcc|유티케이씨씨|케이씨씨).*?(뭐야|뭔데|뭐에요|뭔가|무슨)/i.test(m) || /utkcc가\s*뭐/i.test(lower);
  const asksUtkccEn = /(what is|what’s)\s+utkcc\??/i.test(m) || /utkcc\s+meaning/i.test(lower);

  if ((lang === 'ko' && asksUtkccKo) || (lang === 'en' && asksUtkccEn)) {
    const aboutUrl = '/about';
    return lang === 'ko'
      ? `UTKCC는 UofT Korean Commerce Community(한인 커머스/커리어 커뮤니티)예요.\n\n무엇을 찾고 있어요?\n- 이번 학기 이벤트\n- 가입/지원\n- 스폰서십\n- EO(익명 피드백)\n\n관련 페이지: ${aboutUrl}`
      : `UTKCC stands for UofT Korean Commerce Community.\n\nWhat are you looking for?\n- Events\n- Membership / joining\n- Sponsorship\n- EO (anonymous feedback)\n\nRelated page: ${aboutUrl}`;
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
}) {
  const { message, effectiveQuery, lang, matches, topMatchTags } = opts;

  if (matches.length === 0) {
    return lang === 'ko'
      ? '제가 확실하게 확인할 수 있는 정보가 없어요.\n\n대신 이런 질문으로 다시 물어봐도 좋아요:\n- 이벤트는 어디서 확인해요?\n- 가입/지원은 어디서 해요?\n- 스폰서십 문의는 어디로 해요?\n- EO(익명 피드백)는 어디서 제출해요?\n\n정확한 내용이 필요하면 Contact 또는 공식 공지를 통해 확인해 주세요.'
      : "I can't confidently confirm that right now.\n\nTry asking one of these:\n- Where can I see events?\n- How do I join/apply?\n- How do I inquire about sponsorship?\n- Where do I submit EO (anonymous feedback)?\n\nFor the most accurate info, please check Contact or UTKCC’s official posts.";
  }

  const top = matches[0];
  const second = matches.length > 1 ? matches[1] : null;

  const validLinks = matches
    .filter((m) => typeof m.url === 'string' && m.url.length > 0)
    .slice(0, 4);

  const intent = inferIntent({
    message,
    effectiveQuery,
    topMatchUrl: top?.url,
    topMatchTags,
  });

  if (lang === 'ko') {
    const lines: string[] = [];

    lines.push(`관련된 안내를 찾았어요: ${top.title}`);
    if (top.snippet) lines.push(`\n${top.snippet}`);

    if (second?.snippet && second.title !== top.title) {
      lines.push(`\n추가로 참고하면 좋은 안내: ${second.title}`);
      lines.push(second.snippet);
    }



    return lines.join('\n');
  }

  const lines: string[] = [];
  lines.push(`Most relevant info: ${top.title}`);
  if (top.snippet) lines.push(`\n${top.snippet}`);


  lines.push(`\n(If you need help, type help.)`);

  if (validLinks.length) {
    lines.push(`\nRelated Links`);
    for (const l of validLinks) lines.push(formatLinkLine(l.title, l.url));
  }

  return lines.join('\n');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body?.message ?? '').trim();
    const lang = (body?.lang === 'en' ? 'en' : 'ko') as Lang;
    const history = (Array.isArray(body?.history) ? body.history : []) as HistoryMsg[];

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

      return NextResponse.json({ answer, sources: [] });
    }

    const isGreetingKo = /^(안녕|안녕하세요|ㅎㅇ|하이|반가워)(\s|\?|!|\.)*$/i.test(message);
    const isGreetingEn = /^(hi|hello|hey)(\s|\?|!|\.)*$/i.test(message);

    if ((lang === 'ko' && isGreetingKo) || (lang === 'en' && isGreetingEn)) {
      const answer =
        lang === 'ko'
          ? `안녕하세요! 저는 UTKCC 웹사이트 도우미 Kacy에요 😁\n\nUTKCC 사이트에서 이벤트/가입/스폰서십/EO 같은 정보를 빠르게 찾을 수 있게 도와줄게요.\n\n(도움이 필요하면 help 라고 입력해 주세요.)`
          : `Hey, I’m your assistant Kacy 😁\n\nI can help you find anything related to the UTKCC website, such as events, membership, sponsorship, and EO (anonymous feedback).\n\n(If you need help, type help.)`;

      return NextResponse.json({ answer, sources: [] });
    }

    const common = handleCommonQuestions(message, lang);
    if (common) {
      return NextResponse.json({ answer: common, sources: [] });
    }

    const effectiveQuery = buildEffectiveQuery(message, history);

    const kbMatches = retrieveKB(effectiveQuery, lang, 7);
    const topMatchTags = (kbMatches?.[0]?.tags ?? []) as string[];

    const matches: Match[] = kbMatches
      .map((e: any) => ({
        title: lang === 'ko' ? String(e.title_ko ?? '') : String(e.title_en ?? ''),
        url: normalizeSourceUrl(String(e.url ?? '')) ?? '',
        snippet: lang === 'ko' ? String(e.content_ko ?? '') : String(e.content_en ?? ''),
      }))
      .map((m) => ({ ...m, url: m.url || '' }));

    const answer = buildAnswer({
      message,
      effectiveQuery,
      lang,
      matches,
      topMatchTags,
    });

    const sources: Source[] = matches
      .filter((m) => typeof m.url === 'string' && m.url.length > 0)
      .slice(0, 3)
      .map((m) => ({ title: m.title, url: m.url }));

    return NextResponse.json({ answer, sources });
  } catch (err) {
    return NextResponse.json({ answer: 'Server error. Please try again.', sources: [] }, { status: 500 });
  }
}