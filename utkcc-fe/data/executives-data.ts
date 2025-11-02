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
    intro: [],
  },
  {
    dept: 'presidents',
    position: 'vice president',
    name: '강민서',
    imageSrc: '/assets/images/exec-headshots/강민서.jpg',
    program: 'Economics & IRHR',
    intro: [],
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
