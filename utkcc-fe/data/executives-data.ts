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
  'programming'
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
/* ----------------------Presidents---------------------- */
  {
    dept: 'presidents',
    position: 'president',
    name: '임윤아',
    imageSrc: '/assets/images/exec-headshots/임윤아.webp',
    program: 'RC - Management',
    intro: [' '],
  },
  {
    dept: 'presidents',
    position: 'vice-president',
    name: '이은서',
    imageSrc: '/assets/images/exec-headshots/이은서.webp',
    program: 'Economics & Statistics',
    intro: [' '],
  },
/* -----------------------Academics---------------------- */
  {
    dept: 'academics',
    position: 'director',
    name: '욕마야',
    imageSrc: '/assets/images/exec-headshots/욕마야.webp',
    program: 'Sociology & IRHR',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'director',
    name: '김민서',
    imageSrc: '/assets/images/exec-headshots/김민서.webp',
    program: 'RC - Finance & Economics',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'ee',
    name: '김소람',
    imageSrc: '/assets/images/exec-headshots/김소람.webp',
    program: 'RC - Accounting',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'ee',
    name: '임승미',
    imageSrc: '/assets/images/exec-headshots/임승미.webp',
    program: 'RC - Finance & Economics',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'ee',
    name: '최진민',
    imageSrc: '/assets/images/exec-headshots/최진민.webp',
    program: 'RC - Finance & Economics',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'intern',
    name: '구본석',
    imageSrc: '/assets/images/exec-headshots/구본석.webp',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'intern',
    name: '김도연',
    imageSrc: '/assets/images/exec-headshots/김도연.webp',
    program: 'IRHR',
    intro: [],
  },
  {
    dept: 'academics',
    position: 'intern',
    name: '이가은',
    imageSrc: '/assets/images/exec-headshots/이가은.webp',
    program: 'Rotman Commerce',
    intro: [],
  },
/* ----------------------Marketing----------------------- */
  {
    dept: 'marketing - video',
    position: 'director',
    name: '오하린',
    imageSrc: '/assets/images/exec-headshots/오하린.webp',
    program: 'RC - Management',
    intro: [],
  },
  {
    dept: 'marketing - video',
    position: 'ee',
    name: '김유진',
    imageSrc: '/assets/images/exec-headshots/김유진.webp',
    program: 'Economics & Statistics',
    intro: [],
  },
  {
    dept: 'marketing - video',
    position: 'ee',
    name: '허지안',
    imageSrc: '/assets/images/exec-headshots/허지안.webp',
    program: 'Architecture',
    intro: [],
  },
  {
    dept: 'marketing - video',
    position: 'intern',
    name: '신하서',
    imageSrc: '/assets/images/exec-headshots/신하서.webp',
    program: 'Architecture',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'director',
    name: '조은비',
    imageSrc: '/assets/images/exec-headshots/조은비.webp',
    program: 'Statistics & Economics',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'ee',
    name: '강초원',
    imageSrc: '/assets/images/exec-headshots/강초원.webp',
    program: 'Political Science',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'ee',
    name: '조예은',
    imageSrc: '/assets/images/exec-headshots/조예은.webp',
    program: 'Math & Environmental Science',
    intro: [],
  },
  {
    dept: 'marketing - poster',
    position: 'intern',
    name: '윤여경',
    imageSrc: '/assets/images/exec-headshots/윤여경.webp',
    program: 'Kinesiology and PE',
    intro: [],
  },
/* ----------------------Media--------------------------- */
  {
    dept: 'media',
    position: 'director',
    name: '유찬혁',
    imageSrc: '/assets/images/exec-headshots/유찬혁.webp',
    program: 'Political Science',
    intro: [],
  },
  {
    dept: 'media',
    position: 'ee',
    name: '이은수',
    imageSrc: '/assets/images/exec-headshots/이은수.webp',
    program: 'Biology & Health and Disease',
    intro: [],
  },
  {
    dept: 'media',
    position: 'intern',
    name: '최이안',
    imageSrc: '/assets/images/exec-headshots/최이안.webp',
    program: 'Rotman Commerce',
    intro: [],
  },
/* ----------------------Social-------------------------- */
  {
    dept: 'social',
    position: 'director',
    name: '신예서',
    imageSrc: '/assets/images/exec-headshots/신예서.webp',
    program: 'Economics & Statistics',
    intro: [],
  },
  {
    dept: 'social',
    position: 'ee',
    name: '강지석',
    imageSrc: '/assets/images/exec-headshots/강지석.webp',
    program: 'Kinesiology',
    intro: [],
  },
  {
    dept: 'social',
    position: 'ee',
    name: '송지원',
    imageSrc: '/assets/images/exec-headshots/송지원.webp',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'social',
    position: 'ee',
    name: '이기서',
    imageSrc: '/assets/images/exec-headshots/이기서.webp',
    program: 'Economics',
    intro: [],
  },
  {
    dept: 'social',
    position: 'ee',
    name: '전소연',
    imageSrc: '/assets/images/exec-headshots/전소연.webp',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'social',
    position: 'intern',
    name: '김서희',
    imageSrc: '/assets/images/exec-headshots/김서희.webp',
    program: 'Economics',
    intro: [],
  },
  {
    dept: 'social',
    position: 'intern',
    name: '박지수',
    imageSrc: '/assets/images/exec-headshots/박지수.webp',
    program: 'Architectural Studies',
    intro: [],
  },
/* ----------------------Finance------------------------- */
  {
    dept: 'finance',
    position: 'director',
    name: '홍윤재',
    imageSrc: '/assets/images/exec-headshots/홍윤재.webp',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'finance',
    position: 'ee',
    name: '안지영',
    imageSrc: '/assets/images/exec-headshots/안지영.webp',
    program: 'Rotman Commerce',
    intro: [],
  },
  {
    dept: 'finance',
    position: 'intern',
    name: '김명세',
    imageSrc: '/assets/images/exec-headshots/김명세.webp',
    program: 'Rotman Commerce',
    intro: [],
  },
/* ----------------------ER--------------------------- */
  {
    dept: 'external relations',
    position: 'director',
    name: '강민서',
    imageSrc: '/assets/images/exec-headshots/강민서.webp',
    program: 'Economics & IRHR',
    intro: [],
  },
  {
    dept: 'external relations',
    position: 'ee',
    name: '최정윤',
    imageSrc: '/assets/images/exec-headshots/최정윤.webp',
    program: 'Political Science',
    intro: [],
  },
  {
    dept: 'external relations',
    position: 'ee',
    name: '최예린',
    imageSrc: '/assets/images/exec-headshots/최예린.webp',
    program: 'Life Science',
    intro: [],
  },
  {
    dept: 'external relations',
    position: 'intern',
    name: '신정민',
    imageSrc: '/assets/images/exec-headshots/신정민.webp',
    program: 'Math & Physical Sciences',
    intro: [],
  },
  {
    dept: 'external relations',
    position: 'intern',
    name: '최현서',
    imageSrc: '/assets/images/exec-headshots/최현서.webp',
    program: 'Rotman Commerce',
    intro: [],
  },
/* ----------------------Programming----------------------- */
  {
    dept: 'programming',
    position: 'director',
    name: '류재혁',
    imageSrc: '/assets/images/exec-headshots/류재혁.webp',
    program: 'CompSci & Stat.',
    intro: [],
  }
];
