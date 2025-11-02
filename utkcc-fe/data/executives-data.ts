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
  'marketing - video',
  'marketing - poster',
  'media',
  'social',
  'finance',
  'external relations',
  'programming',
];

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
  // PRESIDENT
  // =======================
  {
    dept: 'presidents',
    position: 'president',
    name: '김민서',
    imageSrc: '/assets/images/exec-headshots/김민서.jpg',
    program: 'RC - Finance & Economics',
    intro: [
      `UTKCC 회장으로서, 저는 구성원 모두가 자신만의 색을 마음껏 표현하고 서로의 성장을 응원할 수 있는 문화를 만드는 데 힘쓰고 있습니다.
서로 다른 배경과 경험을 가진 사람들이 한자리에 모여 진심 어린 대화를 나누고, 함께 도전하며 배우는 공간이 바로 UTKCC라고 믿습니다.
앞으로도 팀원들과 함께 더 깊이 있는 네트워킹과 다양한 프로그램을 통해 UTKCC를 한층 더 풍성한 커뮤니티로 이끌어가겠습니다.
함께 만드는 순간들이 누군가의 소중한 전환점이 되기를 바라며, 언제나 열린 자세로 여러분과 소통하겠습니다.`,
    ],
  },
  {
    dept: 'presidents',
    position: 'vice president',
    name: '강민서',
    imageSrc: '/assets/images/exec-headshots/강민서.jpg',
    program: 'Economics & IRHR',
    intro: [
      `UTKCC 부회장으로서, 임원들이 함께 성장하고 소중한 인연을 쌓아갈 수 있도록 늘 고민하고 노력하고 있습니다.
국내외 다양한 네트워킹과 이벤트를 통해 우리 커뮤니티의 폭을 넓히고,
모두가 편하게 참여하며 서로에게서 배우고 소통할 수 있는 자리들을 더 많이 만들어가고 싶습니다.
작은 의견에도 귀 기울이며, UTKCC 안에서 각자의 이야기가 빛날 수 있는 환경을 만드는 게 제 목표입니다.
앞으로도 UTKCC가 프로페셔널하고 의미 있는 커뮤니티로 발전할 수 있도록 최선을 다하겠습니다.`,
    ],
  },
  // =======================
  // ACADEMICS
  // =======================
  {
    dept: 'academics',
    position: 'co-director',
    name: '김소람',
    imageSrc: '/assets/images/exec-headshots/김소람.jpg',
    program: 'RC - Accounting',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'co-director',
    name: '최진민',
    imageSrc: '/assets/images/exec-headshots/최진민.webp',
    program: 'RC - Finance & Economics',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'committee',
    name: '이영모',
    imageSrc: '/assets/images/exec-headshots/이영모.jpg',
    program: 'RC - Accounting',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'committee',
    name: '구본석',
    imageSrc: '/assets/images/exec-headshots/구본석.jpg',
    program: 'RC - Management',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'committee',
    name: '이가은',
    imageSrc: '/assets/images/exec-headshots/이가은.jpg',
    program: 'RC - Finance and Economics',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'committee',
    name: '최현서',
    imageSrc: '/assets/images/exec-headshots/최현서.webp',
    program: 'RC - Accounting',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'intern',
    name: '홍예윤',
    imageSrc: '/assets/images/exec-headshots/홍예윤.jpg',
    program: 'Chemistry & Economics',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'intern',
    name: '김시현',
    imageSrc: '/assets/images/exec-headshots/김시현.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'intern',
    name: '주혜정',
    imageSrc: '/assets/images/exec-headshots/주혜정.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'intern',
    name: '김지민',
    imageSrc: '/assets/images/exec-headshots/김지민.jpg',
    program: 'Rotman Commerce',
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
    name: '김진서',
    imageSrc: '/assets/images/exec-headshots/김진서.jpg',
    program: 'RC - Finance & Economics',
    intro: [],
  },
  {
    dept: 'marketing - video',
    position: 'intern',
    name: '김예솔',
    imageSrc: '/assets/images/exec-headshots/김예솔.jpg',
    program: 'Social Sciences',
    intro: [],
  },
  {
    dept: 'marketing - video',
    position: 'intern',
    name: '정윤진',
    imageSrc: '/assets/images/exec-headshots/정윤진.jpg',
    program: 'Social Sciences',
    intro: [],
  },
  // =======================
  // MARKETING - POSTER
  // =======================
  {
    dept: 'marketing - poster',
    position: 'director',
    name: '조예은',
    imageSrc: '/assets/images/exec-headshots/조예은.jpg',
    program: 'Math & Environmental Studies',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'committee',
    name: '김도연',
    imageSrc: '/assets/images/exec-headshots/김도연.jpg', //TODO: update
    program: 'IRHR',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'intern',
    name: '강다연',
    imageSrc: '/assets/images/exec-headshots/강다연.jpg',
    program: 'Visual Studies',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'intern',
    name: '박민경',
    imageSrc: '/assets/images/exec-headshots/박민경.jpg',
    program: 'Social Sciences',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'intern',
    name: '홍수아',
    imageSrc: '/assets/images/exec-headshots/홍수아.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  // =======================
  // MEDIA
  // =======================
  {
    dept: 'media',
    position: 'director',
    name: '강초원',
    imageSrc: '/assets/images/exec-headshots/강초원.jpg',
    program: 'Political Science',
    intro: [],
  },
  {
    dept: 'media',
    position: 'committee',
    name: '이연지',
    imageSrc: '/assets/images/exec-headshots/이연지.jpg',
    program: 'Life Sciences',
    intro: [],
  },
  {
    dept: 'media',
    position: 'intern',
    name: '문서윤',
    imageSrc: '/assets/images/exec-headshots/문서윤.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'media',
    position: 'intern',
    name: '조유경',
    imageSrc: '/assets/images/exec-headshots/조유경.jpg',
    program: 'Life Sciences',
    intro: [],
  },
  {
    dept: 'media',
    position: 'intern',
    name: '황서후',
    imageSrc: '/assets/images/exec-headshots/황서후.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'media',
    position: 'intern',
    name: '신지호',
    imageSrc: '/assets/images/exec-headshots/신지호.jpg',
    program: 'Mathematical & Physical Sciences',
    intro: [],
  },
  // =======================
  // FINANCE
  // =======================
  {
    dept: 'finance',
    position: 'director',
    name: '임승미',
    imageSrc: '/assets/images/exec-headshots/임승미.webp',
    program: 'RC - Finance & Economics',
    intro: [],
  },
  {
    dept: 'finance',
    position: 'committee',
    name: '임준서',
    imageSrc: '/assets/images/exec-headshots/임준서.jpg',
    program: 'RC - Finance & Economics',
    intro: [],
  },
  {
    dept: 'finance',
    position: 'intern',
    name: '김차현',
    imageSrc: '/assets/images/exec-headshots/김차현.jpg',
    program: 'RC - Finance & Economics',
    intro: [],
  },
  {
    dept: 'finance',
    position: 'intern',
    name: '양지민',
    imageSrc: '/assets/images/exec-headshots/양지민.jpg',
    program: 'Economics & IRHR',
    intro: [],
  },
  // =======================
  // SOCIAL
  // =======================
  {
    dept: 'social',
    position: 'director',
    name: '송지원',
    imageSrc: '/assets/images/exec-headshots/송지원.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'social',
    position: 'committee',
    name: '박지수',
    imageSrc: '/assets/images/exec-headshots/박지수.webp',
    program: 'Architecture',
    intro: [],
  },
  {
    dept: 'social',
    position: 'committee',
    name: '김서희',
    imageSrc: '/assets/images/exec-headshots/김서희.jpg',
    program: 'Economics',
    intro: [],
  },
  {
    dept: 'social',
    position: 'committee',
    name: '윤여경',
    imageSrc: '/assets/images/exec-headshots/윤여경.webp',
    program: 'Kinesiology and Physical Education',
    intro: [],
  },
  {
    dept: 'social',
    position: 'intern',
    name: '양태인',
    imageSrc: '/assets/images/exec-headshots/양태인.jpg',
    program: 'Social Sciences',
    intro: [],
  },
  {
    dept: 'social',
    position: 'intern',
    name: '이대건',
    imageSrc: '/assets/images/exec-headshots/이대건.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'social',
    position: 'intern',
    name: '김민준',
    imageSrc: '/assets/images/exec-headshots/김민준.jpg',
    program: 'Kinesiology',
    intro: [],
  },
  {
    dept: 'social',
    position: 'intern',
    name: '신하림',
    imageSrc: '/assets/images/exec-headshots/신하림.jpg',
    program: 'Linguistics',
    intro: [],
  },
  {
    dept: 'social',
    position: 'intern',
    name: '이찬영',
    imageSrc: '/assets/images/exec-headshots/이찬영.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  // =======================
  // EXTERNAL RELATIONS
  // =======================
  {
    dept: 'external relations',
    position: 'director',
    name: '최정윤',
    imageSrc: '/assets/images/exec-headshots/최정윤.jpg',
    program: 'Political Science & Environmental Studies',
    intro: [],
  },
  {
    dept: 'external relations',
    position: 'committee',
    name: '신정민',
    imageSrc: '/assets/images/exec-headshots/신정민.jpg',
    program: 'Statistics & Mathematics',
    intro: [],
  },
  {
    dept: 'external relations',
    position: 'committee',
    name: '유현준',
    imageSrc: '/assets/images/exec-headshots/유현준.jpg',
    program: 'RC - Finance & Economics',
    intro: [],
  },
  {
    dept: 'external relations',
    position: 'intern',
    name: '진하윤',
    imageSrc: '/assets/images/exec-headshots/진하윤.jpg',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'external relations',
    position: 'intern',
    name: '김민소',
    imageSrc: '/assets/images/exec-headshots/김민소.jpg',
    program: 'Life Sciences',
    intro: [],
  },
  {
    dept: 'external relations',
    position: 'intern',
    name: '김준현',
    imageSrc: '/assets/images/exec-headshots/김준현.jpg',
    program: 'Economics & Political Science',
    intro: [],
  },
  // =======================
  // PROGRAMMING
  // =======================
  {
    dept: 'programming',
    position: 'director',
    name: '류재혁',
    imageSrc: '/assets/images/exec-headshots/류재혁.jpg',
    program: 'Computer Science & Statistics',
    intro: [],
  },
  {
    dept: 'programming',
    position: 'committee',
    name: '김나연',
    imageSrc: '/assets/images/exec-headshots/김나연.jpg',
    program: 'Computer Science & Statistics',
    intro: [],
  },
  {
    dept: 'programming',
    position: 'intern',
    name: '류지훈',
    imageSrc: '/assets/images/exec-headshots/류지훈.jpg',
    program: 'Mathematical and Physical Sciences',
    intro: [],
  },
];
