import { UTKCC_KB } from '@/data/kb'; 
import type { KBEntry } from '@/data/kb';

export type Lang = 'ko' | 'en';

// 관련 검색어
const SYNONYMS: Record<string, string[]> = {
  eo: ['eo', 'executive office', '익명', '피드백', '건의', '요청', '회장단', '디렉터'],
  event: ['event', 'events', '이벤트', '행사', '세미나', 'rsvp', '신청', 'party', '파티', '친구', 'social'],
  freshmanSeminar: [
    'freshman seminar',
    'freshman seminar 2026',
    'freshman',
    'new student',
    'first year',
    'seminar',
    '신입생 세미나',
    '신입생',
    '새내기',
    '세미나',
    '서울',
    'seoul',
    '토론토',
    'toronto',
    '연세대',
    '연세대학교',
    'yonsei',
    '백양관',
    'baekyang',
    'afterparty',
    '애프터파티',
    '현명포차',
    'hyunmyeong',
    'check-in',
    'checkin',
    '체크인',
    'qr',
    '큐알',
    'boarding pass',
    '보딩패스',
    'scanner',
    '스캐너',
    'airplane',
    '비행기',
  ],
  sponsor: ['sponsor', 'sponsorship', '스폰서', '후원', '파트너', '파트너십', 'discount', 'benefit', '할인', '혜택', '제휴'],
  member: ['member', 'membership', 'join', '가입', '지원', '신입생', '회비', 'first year', 'freshman', 'new student', '처음'],
  exec: ['exec', 'executive', 'director', '운영진', '회장단', '임원진', '디렉터', 'intern', '인턴'],
  contact: ['contact', '문의', '연락', '메일', 'email', '인스타', 'instagram'],
  newsletter: ['newsletter', 'news letter', '뉴스레터', '구독', '메일링', '메일링리스트'],
  social: ['social', 'social media', 'sns', 'instagram', '인스타', '소셜', '소셜미디어'],
  resource: ['resource', 'resources', '자료', '리소스', '자료실', '족보', '스터디', 'study', 'exam', 'midterm', 'final', 'course', '수업', '시험', '중간', '기말'],
  career: ['career', 'professional', 'coffee chat', 'networking', 'alumni', 'case competition', '커리어', '네트워킹', '커피챗', '선배'],
};

function expandQuery(query: string) {
  const q = query.toLowerCase();
  const expanded = new Set<string>();

  for (const [key, words] of Object.entries(SYNONYMS)) {
    if (words.some((w) => q.includes(w))) {
      words.forEach((w) => expanded.add(w));
      expanded.add(key);
    }
  }

  return Array.from(expanded);
}

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function tokenize(text: string) {
  return normalize(text)
    .split(/[^a-z0-9\uAC00-\uD7A3]+/i)
    .filter((token) => token.length >= 2);
}

function scoreEntry(entry: KBEntry, query: string, lang: Lang) {
  const qTokens = new Set(tokenize(query));
  const expanded = expandQuery(query);

  const title = lang === 'ko' ? entry.title_ko : entry.title_en;
  const content = lang === 'ko' ? entry.content_ko : entry.content_en;
  const tags = entry.tags ?? [];

  const haystack = normalize(`${title} ${content} ${tags.join(' ')}`);

  let score = 0;

  for (const t of Array.from(qTokens)) {
    if (haystack.includes(t)) score += 2;
  }

  for (const w of expanded) {
    if (w.length <= 1) continue;
    if (haystack.includes(w)) score += 4;
  }

  const qNorm = normalize(query);
  if (qNorm.length >= 2 && haystack.includes(qNorm)) score += 6;

  for (const tag of tags) {
    const tagNorm = normalize(tag);
    if (expanded.includes(tagNorm) || qTokens.has(tagNorm)) {
      score += 5;
    }
  }

  return score;
}

export function retrieveKB(query: string, lang: Lang, topK = 7, minScore?: number) {
  const min = typeof minScore === 'number' ? minScore : lang === 'ko' ? 8 : 6;
  const scored = UTKCC_KB.map((entry) => ({
    entry,
    score: scoreEntry(entry, query, lang),
  }))
    .filter((x) => x.score >= min)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topK).map((x) => x.entry);
}
