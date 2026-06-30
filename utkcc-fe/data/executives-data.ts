/**
 * @warning
 * 수정 O
 *
 * @description
 * 부서 리스트.
 * 최소 한명의 임원은 넣어주세요!
 */
export const deptList: string[] = [
  'presidents',
  'academics',
  'corporate relations',
  'finance',
  'information technology',
  'marketing - poster',
  'marketing - video',
  'media',
  'social',
];

export const deptDescriptions: {
  [dept: string]: {
    paragraphs: string[];
    bullets?: string[];
  };
} = {
  presidents: {
    paragraphs: [
      'UTKCC는 연도별 기수제로 운영되며, 현재 회장단과 다양한 전문 부서가 함께 커뮤니티를 이끌어가고 있습니다.',
      '학업, 커리어, 네트워킹, 소셜 이벤트까지 각자의 역할 안에서 UTKCC의 경험을 만들어가는 20기 임원진을 부서별로 만나보세요.',
    ],
  },
  academics: {
    paragraphs: [
      'Academics 부서는 학생들의 학업 성장과 커리어 개발을 지원합니다. 여름방학에는 코스맵, 타임테이블 세션, 족보 제작으로 신입생의 대학 적응을 돕고, 학기 중에는 커리어 세미나와 ECO101·ECO102 튜토리얼을 운영합니다. 또한 커피챗과 와인파티 네트워킹 세션을 통해 진로 탐색과 학생 간 교류의 기회를 제공합니다.',
    ],
    bullets: [
      '와인파티, 커피챗 등 여러 네트워킹 세션 진행',
      '족보 및 안티캘린더 제작',
      '튜토리얼 진행',
    ],
  },
  'corporate relations': {
    paragraphs: [
      'Corporate Relations 부서는 다양한 기업 및 외부 파트너와의 협업을 통해 UTKCC 멤버들에게 더 많은 기회와 혜택을 제공하는 부서입니다. 스폰서십, 파트너십, 네트워킹, 외부 협력 행사 등을 기획하며 UTKCC의 대외적인 이미지를 만들어가는 역할을 하고 있습니다.',
    ],
    bullets: [
      '교내외 단체들과의 협업 및 친밀한 관계 유지',
      'KCCA 선배님들과의 소통',
      '신입생 세미나, SKY 세미나 유치',
      'UTKCC 멤버십 관리',
    ],
  },
  finance: {
    paragraphs: [
      'UTKCC Finance 부서는 동아리의 예산과 비용을 관리하며, 모든 이벤트가 원활하게 운영될 수 있도록 지원하는 부서입니다. 꼼꼼한 기록과 효율적인 예산 운영을 통해 UTKCC 활동의 든든한 기반을 만들어가는 부서입니다.',
    ],
    bullets: [
      'KCC의 1년 활동 버젯팅',
      '펀딩',
      '재정 관리',
      '각종 이벤트 개최 지원',
    ],
  },
  'information technology': {
    paragraphs: [
      'UTKCC IT 부서는 웹사이트 운영, 이벤트 페이지 제작, 디지털 시스템 관리 등 동아리의 온라인 경험을 책임지는 부서입니다. 단순히 코딩만 하는 부서가 아니라, 아이디어를 실제 서비스와 디자인으로 구현하며 UTKCC의 활동을 더 편리하고 매력적으로 만들어가고 있습니다.',
    ],
    bullets: [
      'KCC 웹사이트 개발',
      '주기적 업데이트, 버그 픽스',
      '단체 내부 업무 자동화',
    ],
  },
  'marketing - poster': {
    paragraphs: [
      '마케팅 포스터팀은 KCC의 행사와 콘텐츠를 디자인하며, KCC의 시각적 브랜딩을 담당하는 부서입니다. 포스터와 인스타그램 콘텐츠 제작을 통해 KCC의 이미지와 아이덴티티를 만들어가고 있습니다.',
    ],
    bullets: [
      '동아리/이벤트 홍보 게시물 제작',
      '전반적인 이미지 브랜딩 (브랜드북 제작/sns 계정 관리/이벤트 홍보)',
    ],
  },
  'marketing - video': {
    paragraphs: [
      '마케팅 비디오 부서는 UTKCC 유튜브 & 인스타그램 릴스 컨텐츠 제작과 소셜미디어 채널 운영을 통해 KCC의 홍보를 담당하는 부서입니다.',
    ],
    bullets: [
      'KCC 스폰서십 릴스 / 쇼츠',
      '이벤트 홍보 영상',
      'KCC Student VLOG',
      'Interviews & Info Sessions',
    ],
  },
  media: {
    paragraphs: [
      '미디어부서는 KCC의 이야기를 콘텐츠로 만들어 공유하는 것을 담당하고 있습니다. 뉴스레터를 통해 KCC의 활동을 알리고, 도움이 되는 정보를 다양하게 전달합니다.',
    ],
    bullets: [
      '대학 생활, 학업 및 취업 관련 팁, 다양한 분들의 인터뷰, UTKCC 이벤트 소식 등 여러 유익한 정보 리서치 및 뉴스레터 제작',
      '매달 이메일로 뉴스레터 발행',
    ],
  },
  social: {
    paragraphs: [
      '소셜 부서는 다양한 이벤트를 기획하고 운영하며 UTKCC가 외부와 활발하게 교류할 수 있도록 연결하는 역할을 담당합니다. 또한 임원들이 자연스럽게 친해질 수 있는 다양한 활동을 통해 KCC만의 가족같은 분위기를 만들어 갑니다.',
    ],
    bullets: [
      'KCC의 소셜 이벤트 기획, 감독 및 진행 (대동제, 할로윈 이벤트, 번개 등)',
      '신입생 풀 모집, 구축',
      'KCC 내부 단합, 친밀감 형성',
    ],
  },
};

/**
 * @warning
 * 수정 O
 *
 * @description
 * 실제 임원 정보. 형식에 맞춰서 써주세요!
 * intro 는 패러그래프로 분리해서 배열에 넣어주세요!
 */
export const execData: {
  dept: string;
  position: string;
  name: string;
  program: string;
  imageSrc: string;
  intro: string[];
}[] = [
  // =======================
  // PRESIDENTS
  // =======================
  {
    dept: 'presidents',
    position: 'president',
    name: '유현준',
    imageSrc: '/assets/images/exec-headshots/유현준.jpg',
    program: 'Rotman Commerce - Management',
    intro: [],
  },
  {
    dept: 'presidents',
    position: 'vice president',
    name: '이가은',
    imageSrc: '/assets/images/exec-headshots/이가은.jpg',
    program: 'Rotman Commerce - Finance & Economics',
    intro: [],
  },

  // =======================
  // ACADEMICS
  // =======================
  {
    dept: 'academics',
    position: 'director',
    name: '구본석',
    imageSrc: '/assets/images/exec-headshots/구본석.jpg',
    program: 'Rotman Commerce - Management',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'director',
    name: '주혜정',
    imageSrc: '/assets/images/exec-headshots/주혜정.jpg',
    program: 'Rotman Commerce - Finance & Economics',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'committee',
    name: '김지민',
    imageSrc: '/assets/images/exec-headshots/김지민.jpg',
    program: 'Rotman Commerce - Finance & Economics',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'committee',
    name: '홍예윤',
    imageSrc: '/assets/images/exec-headshots/홍예윤.jpg',
    program: 'Chemistry & Immunology',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'committee',
    name: '이대건',
    imageSrc: '/assets/images/exec-headshots/이대건.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'committee',
    name: '김강인',
    imageSrc: '/assets/images/exec-headshots/김강인.jpg',
    program: 'Economics',
    intro: [],
  },

  // =======================
  // MARKETING - POSTER
  // =======================
  {
    dept: 'marketing - poster',
    position: 'director',
    name: '박민경',
    imageSrc: '/assets/images/exec-headshots/박민경.jpg',
    program: 'Social Science',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'committee',
    name: '강다연',
    imageSrc: '/assets/images/exec-headshots/강다연.jpg',
    program: 'Economics',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'committee',
    name: '최호승',
    imageSrc: '/assets/images/exec-headshots/최호승.jpg',
    program: 'Kinesiology',
    intro: [],
  },

  // =======================
  // MARKETING - VIDEO
  // =======================
  {
    dept: 'marketing - video',
    position: 'director',
    name: '신하서',
    imageSrc: '/assets/images/exec-headshots/신하서.webp',
    program: 'Architecture',
    intro: [],
  },
  {
    dept: 'marketing - video',
    position: 'committee',
    name: '김예솔',
    imageSrc: '/assets/images/exec-headshots/김예솔.jpg',
    program: 'Economics',
    intro: [],
  },
  {
    dept: 'marketing - video',
    position: 'committee',
    name: '정윤진',
    imageSrc: '/assets/images/exec-headshots/정윤진.jpg',
    program: 'Economics & Statistics',
    intro: [],
  },
  {
    dept: 'marketing - video',
    position: 'committee',
    name: '주재은',
    imageSrc: '/assets/images/exec-headshots/주재은.jpg',
    program: 'Mathematics & Statistics',
    intro: [],
  },

  // =======================
  // MEDIA
  // =======================
  {
    dept: 'media',
    position: 'director',
    name: '이연지',
    imageSrc: '/assets/images/exec-headshots/이연지.jpg',
    program: 'Human Biology & Physiology',
    intro: [],
  },
  {
    dept: 'media',
    position: 'committee',
    name: '배진주',
    imageSrc: '/assets/images/exec-headshots/배진주.jpg',
    program: 'Rotman Commerce - Accounting',
    intro: [],
  },
  {
    dept: 'media',
    position: 'committee',
    name: '조희원',
    imageSrc: '/assets/images/exec-headshots/조희원.jpg',
    program: 'Mathematics & Economics',
    intro: [],
  },

  // =======================
  // SOCIAL
  // =======================
  {
    dept: 'social',
    position: 'director',
    name: '김서희',
    imageSrc: '/assets/images/exec-headshots/김서희.jpg',
    program: 'Economics',
    intro: [],
  },
  {
    dept: 'social',
    position: 'committee',
    name: '이찬영',
    imageSrc: '/assets/images/exec-headshots/이찬영.jpg',
    program: 'Rotman Commerce - Finance & Economics',
    intro: [],
  },
  {
    dept: 'social',
    position: 'committee',
    name: '김준현',
    imageSrc: '/assets/images/exec-headshots/김준현.jpg',
    program: 'Economics & Political Science',
    intro: [],
  },
  {
    dept: 'social',
    position: 'committee',
    name: '김시현',
    imageSrc: '/assets/images/exec-headshots/김시현.jpg',
    program: 'Rotman Commerce - Management',
    intro: [],
  },
  {
    dept: 'social',
    position: 'committee',
    name: '백선주',
    imageSrc: '/assets/images/exec-headshots/백선주.jpg',
    program: 'Architecture',
    intro: [],
  },

  // =======================
  // CORPORATE RELATIONS
  // =======================
  {
    dept: 'corporate relations',
    position: 'director',
    name: '임준서',
    imageSrc: '/assets/images/exec-headshots/임준서.jpg',
    program: 'Rotman Commerce - Finance & Economics',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'director',
    name: '진하윤',
    imageSrc: '/assets/images/exec-headshots/진하윤.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'committee',
    name: '신하림',
    imageSrc: '/assets/images/exec-headshots/신하림.jpg',
    program: 'Linguistics',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'committee',
    name: '김유민',
    imageSrc: '/assets/images/exec-headshots/김유민.jpg',
    program: 'Political Science, Statistics & Digital Humanities',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'committee',
    name: '권유현',
    imageSrc: '/assets/images/exec-headshots/권유현.jpg',
    program: 'Rotman Commerce - Management',
    intro: [],
  },
  {
    dept: 'corporate relations',
    position: 'committee',
    name: '조재영',
    imageSrc: '/assets/images/exec-headshots/조재영.jpg',
    program: 'Biological Chemistry',
    intro: [],
  },

  // =======================
  // FINANCE
  // =======================
  {
    dept: 'finance',
    position: 'director',
    name: '전재민',
    imageSrc: '/assets/images/exec-headshots/전재민.jpg',
    program: 'Rotman Commerce - Accounting',
    intro: [],
  },
  {
    dept: 'finance',
    position: 'committee',
    name: '양지민',
    imageSrc: '/assets/images/exec-headshots/양지민.jpg',
    program: 'Finance & Economics',
    intro: [],
  },
  {
    dept: 'finance',
    position: 'committee',
    name: '문서윤',
    imageSrc: '/assets/images/exec-headshots/문서윤.jpg',
    program: 'Rotman Commerce - Accounting',
    intro: [],
  },

  // =======================
  // INFORMATION TECHNOLOGY
  // =======================
  {
    dept: 'information technology',
    position: 'director',
    name: '류지훈',
    imageSrc: '/assets/images/exec-headshots/류지훈.jpg',
    program: 'Computer Science & Mathematics',
    intro: [],
  },
  {
    dept: 'information technology',
    position: 'committee',
    name: '신지호',
    imageSrc: '/assets/images/exec-headshots/신지호.jpg',
    program: 'Actuarial Science & Statistics',
    intro: [],
  },
];
