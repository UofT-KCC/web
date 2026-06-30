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
  {
    id: 'events-academic',
    title_ko: 'Academic 이벤트',
    title_en: 'Academic events',
    content_ko:
      'Academic 이벤트는 신입생 세미나, 커리어 세미나, 코스 튜토리얼, 버디버디처럼 학교 적응과 수업 이해를 돕는 프로그램이에요.',
    content_en:
      'Academic events include freshman seminars, career seminars, course tutorials, and buddy-style mentoring to help students adjust and study better.',
    url: '/events',
    tags: ['academic', 'study', 'tutorial', 'freshman', '신입생', '튜토리얼', '버디버디'],
  },
  {
    id: 'events-professional',
    title_ko: 'Professional 이벤트',
    title_en: 'Professional events',
    content_ko:
      'Professional 이벤트는 커피챗, Alumni 네트워킹, 산업 네트워킹, Case Competition처럼 커리어 탐색과 네트워킹에 초점이 있어요.',
    content_en:
      'Professional events focus on career exploration and networking, such as coffee chats, alumni networking, industry networking, and case competitions.',
    url: '/events',
    tags: ['professional', 'career', 'coffee chat', 'alumni', 'networking', '커리어', '네트워킹'],
  },
  {
    id: 'events-social',
    title_ko: 'Social 이벤트',
    title_en: 'Social events',
    content_ko:
      'Social 이벤트는 신입생 세미나, 캠퍼스 투어, 할로윈 파티, MT, 연말 행사처럼 친구를 만들고 커뮤니티에 자연스럽게 들어오는 데 도움을 줘요.',
    content_en:
      'Social events help students make friends and join the community through freshman events, campus tours, Halloween parties, MT-style trips, and year-end events.',
    url: '/events',
    tags: ['social', 'friends', 'party', 'community', '친구', '소셜', '파티', '엠티'],
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
  {
    id: 'membership-new-students',
    title_ko: '신입생 참여 안내',
    title_en: 'New student participation',
    content_ko:
      '신입생이라면 먼저 Events에서 관심 있는 프로그램을 확인하고, 멤버십/모집 링크를 통해 참여 또는 지원 여부를 결정하면 좋아요.',
    content_en:
      'If you are a new student, start by checking Events, then use the membership or recruitment links depending on whether you want to participate or apply.',
    url: '/join',
    tags: ['freshman', 'first year', 'new student', '신입생', '가입', '멤버십'],
  },
  {
    id: 'membership-recruitment',
    title_ko: '임원/인턴 지원',
    title_en: 'Executive and intern recruitment',
    content_ko:
      'UTKCC 운영에 직접 참여하고 싶다면 일반 멤버십보다 임원/인턴 모집 공지를 확인하는 것이 더 적합해요.',
    content_en:
      'If you want to help run UTKCC, check executive or intern recruitment rather than only the general membership path.',
    url: '/recruitment',
    tags: ['recruitment', 'intern', 'executive', '지원', '임원', '인턴'],
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
  {
    id: 'sponsors-benefits',
    title_ko: '멤버십 제휴 혜택',
    title_en: 'Membership partner benefits',
    content_ko:
      'UTKCC는 토론토 한인 식당 및 로컬 비즈니스와 제휴를 맺고, 멤버십 소지자에게 할인이나 경품 같은 혜택을 제공해요.',
    content_en:
      'UTKCC partners with Korean restaurants and local businesses in Toronto to offer member benefits such as discounts and giveaways.',
    url: '/sponsors',
    tags: ['sponsors', 'partners', 'discount', 'benefits', '제휴', '할인', '혜택'],
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
    tags: ['executives', 'directors', '회장단', '임원진', '운영진'],
  },

  // ===== RESOURCES =====
  {
    id: 'resources-social',
    title_ko: '소셜 미디어 자료',
    title_en: 'Social media resources',
    content_ko:
      'UTKCC 소셜 미디어 자료는 Resources 페이지에서 확인할 수 있어요.',
    content_en:
      'UTKCC social media resources are available on the Resources page.',
    url: '/resources',
    tags: ['resources', 'social', 'social media', 'sns', '소셜', '소셜미디어', '인스타'],
  },
  {
    id: 'resources-anti-calendar',
    title_ko: 'Anti-calendar',
    title_en: 'Anti-calendar',
    content_ko:
      'Anti-calendar는 과목별 후기와 추천 강의 정보를 모아 전공·교양 선택을 도와주는 UTKCC 리소스예요.',
    content_en:
      'Anti-calendar is a UTKCC resource with course reviews and recommendations to help students choose electives and program courses.',
    url: '/resources',
    tags: ['anti-calendar', 'course review', 'courses', '강의 후기', '과목', '수업'],
  },
  {
    id: 'resources-study-package',
    title_ko: 'Study Package',
    title_en: 'Study Package',
    content_ko:
      'Study Package는 선배들의 과제 팁, 연습문제, 강의 정리 등을 모아 시험 대비와 개념 복습에 활용할 수 있는 자료예요.',
    content_en:
      'Study Package collects assignment tips, practice questions, and lecture notes from upper-year students for exam prep and review.',
    url: '/resources',
    tags: ['study package', 'exam', 'midterm', 'final', 'eco101', 'sta130', '시험', '중간', '기말', '족보'],
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
  {
    id: 'contact-routing',
    title_ko: '문의 목적별 연락',
    title_en: 'Contact by purpose',
    content_ko:
      '일반 문의는 UTKCC 대표 이메일, 스폰서십 문의는 ER Director/스폰서십 이메일로 연락하는 방식이 가장 명확해요.',
    content_en:
      'For general questions, use the main UTKCC email. For sponsorships, use the ER Director or sponsorship inquiry contact.',
    url: '/contact',
    tags: ['contact', 'email', 'sponsor', '문의', '스폰서십', '연락'],
  },

  // ===== NEWSLETTER =====
  {
    id: 'newsletter-overview',
    title_ko: '뉴스레터 확인/구독',
    title_en: 'Newsletter access',
    content_ko:
      '뉴스레터는 Newsletter 페이지에서 확인할 수 있어요. 구독 링크가 있다면 해당 페이지에서 안내돼요.',
    content_en:
      'You can read the newsletter on the Newsletter page. Subscription details are listed there if available.',
    url: '/newsletter',
    tags: ['newsletter', '뉴스레터', '구독', 'mailing'],
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
