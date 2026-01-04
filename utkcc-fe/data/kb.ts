export type KBEntry = {
  id: string;
  title_ko: string;
  title_en: string;
  content_ko: string;
  content_en: string;
  url: string;
  tags: string[];
};

export const UTKCC_KB: KBEntry[] = [
  // ===== EVENTS =====
  {
    id: 'events-overview',
    title_ko: '이벤트 확인 방법',
    title_en: 'How to find events',
    content_ko:
      'UTKCC의 모든 공식 이벤트는 웹사이트의 Events 페이지에서 확인할 수 있어요. 각 이벤트마다 일정, 장소, 설명, RSVP 여부가 안내돼요.',
    content_en:
      'All official UTKCC events are listed on the Events page with date, location, description, and RSVP details.',
    url: '/events',
    tags: ['events', 'event', 'schedule', '행사', '이벤트', '일정'],
  },
  {
    id: 'events-rsvp',
    title_ko: '이벤트 RSVP(신청) 방법',
    title_en: 'How to RSVP for events',
    content_ko:
      '일부 이벤트는 RSVP(사전 신청)가 필요해요. Events 페이지 또는 인스타그램 공지에 있는 신청 링크를 통해 RSVP할 수 있어요.',
    content_en:
      'Some events require RSVP. You can sign up through the link on the Events page or Instagram announcement.',
    url: '/events',
    tags: ['rsvp', 'apply', '신청', '등록', 'events'],
  },
  {
    id: 'events-announcement',
    title_ko: '이벤트 공지 어디서 보나요?',
    title_en: 'Where are event announcements posted?',
    content_ko:
      '이벤트 공지는 웹사이트 Events 페이지와 UTKCC 공식 인스타그램을 통해 가장 먼저 안내돼요.',
    content_en:
      'Event announcements are primarily shared on the Events page and UTKCC’s official Instagram.',
    url: '/events',
    tags: ['announcement', '공지', 'instagram', 'events'],
  },

  // ===== MEMBERSHIP =====
  {
    id: 'membership-join',
    title_ko: '가입 및 참여 안내',
    title_en: 'Joining UTKCC',
    content_ko:
      'UTKCC 가입 및 참여 방법은 Join 페이지에서 안내하고 있어요. 신입생과 재학생 모두 참여할 수 있어요.',
    content_en:
      'Information about joining UTKCC is available on the Join page. Both first-years and upper-years can join.',
    url: '/join',
    tags: ['membership', 'join', '가입', '지원'],
  },
  {
    id: 'membership-fee',
    title_ko: '회비 안내',
    title_en: 'Membership fee',
    content_ko:
      '회비 여부 및 금액은 매 학기 정책에 따라 달라질 수 있어요. 정확한 정보는 Join 페이지 또는 공지를 참고해 주세요.',
    content_en:
      'Membership fees may vary by semester. Please refer to the Join page or official announcements.',
    url: '/join',
    tags: ['fee', '회비', 'membership'],
  },

  // ===== EO =====
  {
    id: 'eo-anonymous',
    title_ko: 'EO 익명 피드백',
    title_en: 'EO anonymous feedback',
    content_ko:
      'EO는 UTKCC 회장단과 디렉터에게 익명으로 피드백이나 요청을 전달할 수 있는 공간이에요.',
    content_en:
      'EO is a space where you can send anonymous feedback or requests to the UTKCC execs and directors.',
    url: '/eo',
    tags: ['eo', 'feedback', 'anonymous', '익명', '건의'],
  },
  {
    id: 'eo-usage',
    title_ko: 'EO는 언제 사용하나요?',
    title_en: 'When should I use EO?',
    content_ko:
      '건의사항, 불편사항, 개선 요청 등 공개적으로 말하기 어려운 내용이 있을 때 EO를 사용하면 좋아요.',
    content_en:
      'Use EO when you want to share suggestions, concerns, or improvement requests anonymously.',
    url: '/eo',
    tags: ['eo', 'usage', 'feedback'],
  },

  // ===== SPONSORSHIP =====
  {
    id: 'sponsorship-overview',
    title_ko: '스폰서십(후원) 문의',
    title_en: 'Sponsorship inquiries',
    content_ko:
      'UTKCC 스폰서십 및 파트너십 문의는 Contact 페이지를 통해 공식적으로 진행돼요.',
    content_en:
      'All UTKCC sponsorship and partnership inquiries should be made through the Contact page.',
    url: '/contact',
    tags: ['sponsorship', '후원', 'partner', 'contact'],
  },
  {
    id: 'sponsorship-info',
    title_ko: '스폰서십 안내 자료',
    title_en: 'Sponsorship information',
    content_ko:
      '스폰서십 관련 자료나 덱(deck)은 요청 시 제공돼요. Contact 페이지를 통해 문의해 주세요.',
    content_en:
      'Sponsorship decks and materials are provided upon request via the Contact page.',
    url: '/contact',
    tags: ['sponsorship', 'deck', '자료'],
  },

  // ===== EXECUTIVES =====
  {
    id: 'executives-list',
    title_ko: '회장단 및 디렉터 소개',
    title_en: 'Executives and directors',
    content_ko:
      'UTKCC 회장단 및 디렉터 라인업은 Executives 페이지에서 확인할 수 있어요.',
    content_en:
      'The list of UTKCC executives and directors is available on the Executives page.',
    url: '/executives',
    tags: ['executives', 'directors', '회장단'],
  },

  // ===== CONTACT =====
  {
    id: 'contact-overview',
    title_ko: 'Contact 페이지 안내',
    title_en: 'Contact page',
    content_ko:
      'UTKCC에 공식적으로 문의하려면 Contact 페이지를 이용해 주세요. 이메일 및 기타 연락 방법이 안내돼 있어요.',
    content_en:
      'For official inquiries, please use the Contact page where email and other contact methods are listed.',
    url: '/contact',
    tags: ['contact', 'email', '문의'],
  },

  // ===== GENERAL =====
  {
    id: 'utkcc-about',
    title_ko: 'UTKCC란 무엇인가요?',
    title_en: 'What is UTKCC?',
    content_ko:
      'UTKCC는 University of Toronto Korean Commerce Community로, 커머스·커리어 중심의 한인 학생 커뮤니티예요.',
    content_en:
      'UTKCC stands for the University of Toronto Korean Commerce Community, a student organization focused on commerce and careers.',
    url: '/about',
    tags: ['utkcc', 'about', '소개'],
  },
];