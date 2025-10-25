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
  // =======================
  // PRESIDENT
  // =======================
  {
    dept: 'president',
    position: 'president',
    name: 'Minseo Kim',
    imageSrc: '/assets/images/exec-headshots/Minseo_Kim.webp',
    program: 'RC - Finance & Econ',
    intro: []
  },
  {
    dept: 'president',
    position: 'vice president',
    name: 'Minseo Kang',
    imageSrc: '/assets/images/exec-headshots/Minseok_Kang.webp',
    program: 'Econ & IHRH',
    intro: []
  },
  // =======================
  // ACADEMICS
  // =======================
  {
    dept: 'academics',
    position: 'co-director',
    name: 'Soram Kim',
    imageSrc: '/assets/images/exec-headshots/Soram_Kim.webp',
    program: 'RC - Accounting',
    intro: []
  },
  {
    dept: 'academics',
    position: 'co-director',
    name: 'Jinmin Choi',
    imageSrc: '/assets/images/exec-headshots/Jinmin_Choi.webp',
    program: 'RC - Finance & Econ',
    intro: []
  },
  {
    dept: 'academics',
    position: 'committee',
    name: 'Young Mo Lee',
    imageSrc: '/assets/images/exec-headshots/Young_Mo_Lee.webp',
    program: 'RC - Accounting',
    intro: []
  },
  {
    dept: 'academics',
    position: 'committee',
    name: 'Ben Koo',
    imageSrc: '/assets/images/exec-headshots/Ben_Koo.webp',
    program: 'RC - Management',
    intro: []
  },
  {
    dept: 'academics',
    position: 'committee',
    name: 'Gaeun Lee',
    imageSrc: '/assets/images/exec-headshots/Gaeun_Lee.webp',
    program: 'Rotman Commerce',
    intro: []
  },
  {
    dept: 'academics',
    position: 'committee',
    name: 'Hyunseo Choi',
    imageSrc: '/assets/images/exec-headshots/Hyunseo_Choi.webp',
    program: 'Rotman Commerce',
    intro: []
  },
  {
    dept: 'academics',
    position: 'intern',
    name: 'Yeyun Hong',
    imageSrc: '/assets/images/exec-headshots/Yeyun_Hong.webp',
    program: 'MathPhysSci - Chem & Econ',
    intro: []
  },
  {
    dept: 'academics',
    position: 'intern',
    name: 'Sihyun Kim (Sunny)',
    imageSrc: '/assets/images/exec-headshots/Sihyun_Kim.webp',
    program: 'Rotman Commerce',
    intro: []
  },
  {
    dept: 'academics',
    position: 'intern',
    name: 'Hyejeong Ju',
    imageSrc: '/assets/images/exec-headshots/Hyejeong_Ju.webp',
    program: 'Rotman Commerce',
    intro: []
  },
  {
    dept: 'academics',
    position: 'intern',
    name: 'Jimin Kim',
    imageSrc: '/assets/images/exec-headshots/Jinmin_Kim.webp',
    program: 'Rotman Commerce',
    intro: []
  },
  // =======================
  // MARKETING - VIDEO
  // =======================
  {
    dept: 'marketing-video',
    position: 'director',
    name: 'Hasuh Shin',
    imageSrc: '/assets/images/exec-headshots/Hasuh_Shin.webp',
    program: 'Architecture',
    intro: []
  },
  {
    dept: 'marketing-video',
    position: 'committee',
    name: 'Jinseo Kim',
    imageSrc: '/assets/images/exec-headshots/Jinseo_Kim.webp',
    program: 'RC - Finance & Econ',
    intro: []
  },
  {
    dept: 'marketing-video',
    position: 'intern',
    name: 'Yesol Kim',
    imageSrc: '/assets/images/exec-headshots/Yesol_Kim.webp',
    program: 'Social Sciences',
    intro: []
  },
  {
    dept: 'marketing-video',
    position: 'intern',
    name: 'Chloe Jung',
    imageSrc: '/assets/images/exec-headshots/Chloe_Jung.webp',
    program: 'Social Sciences',
    intro: []
  },
  // =======================
  // MARKETING - POSTER
  // =======================
  {
    dept: 'marketing-poster',
    position: 'director',
    name: 'Yeeun Jo',
    imageSrc: '/assets/images/exec-headshots/Yeeun_Jo.webp',
    program: 'Math & Environmental Studies',
    intro: []
  },
  {
    dept: 'marketing-poster',
    position: 'committee',
    name: 'Doyeon Kim',
    imageSrc: '/assets/images/exec-headshots/Doyeon_Kim.webp',
    program: 'IRHR',
    intro: []
  },
  {
    dept: 'marketing-poster',
    position: 'intern',
    name: 'Claire Kang',
    imageSrc: '/assets/images/exec-headshots/Claire_Kang.webp',
    program: 'Visual Studies',
    intro: []
  },
  {
    dept: 'marketing-poster',
    position: 'intern',
    name: 'Minkyung Park',
    imageSrc: '/assets/images/exec-headshots/Minkyung_Park.webp',
    program: 'Social Sciences',
    intro: []
  },
  {
    dept: 'marketing-poster',
    position: 'intern',
    name: 'Sooa Hong',
    imageSrc: '/assets/images/exec-headshots/Sooa_Hong.webp',
    program: 'Rotman Commerce',
    intro: []
  },
  // =======================
  // MEDIA
  // =======================
  {
    dept: 'media',
    position: 'director',
    name: 'Chowon Kang',
    imageSrc: '/assets/images/exec-headshots/Chowon_Kang.webp',
    program: 'Political Science',
    intro: []
  },
  {
    dept: 'media',
    position: 'committee',
    name: 'Yeonji Lee',
    imageSrc: '/assets/images/exec-headshots/Yeonji_Lee.webp',
    program: 'Life Sciences',
    intro: []
  },
  {
    dept: 'media',
    position: 'intern',
    name: 'Eunice Moon',
    imageSrc: '/assets/images/exec-headshots/Eunice_Moon.webp',
    program: 'Rotman Commerce',
    intro: []
  },
  {
    dept: 'media',
    position: 'intern',
    name: 'Yugyeong (Ella) Cho',
    imageSrc: '/assets/images/exec-headshots/Yugyeong_Cho.webp',
    program: 'Life Sciences',
    intro: []
  },
  {
    dept: 'media',
    position: 'intern',
    name: 'Seohoo Hwang',
    imageSrc: '/assets/images/exec-headshots/Seohoo_Hwang.webp',
    program: 'Rotman Commerce',
    intro: []
  },
  {
    dept: 'media',
    position: 'intern',
    name: 'Jiho Shin',
    imageSrc: '/assets/images/exec-headshots/Jiho_Shin.webp',
    program: 'Physical & Mathematical Sciences',
    intro: []
  },
  // =======================
  // FINANCE
  // =======================
  {
    dept: 'finance',
    position: 'director',
    name: 'Seungmin Lim',
    imageSrc: '/assets/images/exec-headshots/Seungmin_Lim.webp',
    program: 'RC - Finance & Econ',
    intro: []
  },
  {
    dept: 'finance',
    position: 'committee',
    name: 'Elliot Lim',
    imageSrc: '/assets/images/exec-headshots/Elliot_Lim.webp',
    program: 'RC - Finance & Econ',
    intro: []
  },
  {
    dept: 'finance',
    position: 'intern',
    name: 'Chaehyun Kim',
    imageSrc: '/assets/images/exec-headshots/Chaehyun_Kim.webp',
    program: 'RC - Finance & Econ',
    intro: []
  },
  {
    dept: 'finance',
    position: 'intern',
    name: 'Jimin Yang',
    imageSrc: '/assets/images/exec-headshots/Jimin_Yang.webp',
    program: 'Economics and IR',
    intro: []
  },
  // =======================
  // SOCIAL
  // =======================
  {
    dept: 'social',
    position: 'director',
    name: 'Jiwon Song',
    imageSrc: '/assets/images/exec-headshots/Jiwon_Song.webp',
    program: 'Rotman Commerce',
    intro: []
  },
  {
    dept: 'social',
    position: 'committee',
    name: 'Jisu Park',
    imageSrc: '/assets/images/exec-headshots/Jisu_Park.webp',
    program: 'Architectural Studies',
    intro: []
  },
  {
    dept: 'social',
    position: 'committee',
    name: 'Seohui (Alice) Kim',
    imageSrc: '/assets/images/exec-headshots/Seohui_Kim.webp',
    program: 'Economics',
    intro: []
  },
  {
    dept: 'social',
    position: 'committee',
    name: 'Erica Yoon',
    imageSrc: '/assets/images/exec-headshots/Erica_Yoon.webp',
    program: 'Kinesiology and Physical Education',
    intro: []
  },
  {
    dept: 'social',
    position: 'intern',
    name: 'Julia Yang',
    imageSrc: '/assets/images/exec-headshots/Julia_Yang.webp',
    program: 'Social Sciences',
    intro: []
  },
  {
    dept: 'social',
    position: 'intern',
    name: 'DaeGeon Lee',
    imageSrc: '/assets/images/exec-headshots/DaeGeon_Lee.webp',
    program: 'Rotman Commerce',
    intro: []
  },
  {
    dept: 'social',
    position: 'intern',
    name: 'Minjun Kim',
    imageSrc: '/assets/images/exec-headshots/Minjun_Kim.webp',
    program: 'Kinesiology',
    intro: []
  },
  {
    dept: 'social',
    position: 'intern',
    name: 'Noorey Shin',
    imageSrc: '/assets/images/exec-headshots/Noorey_Shin.webp',
    program: 'Linguistics',
    intro: []
  },
  {
    dept: 'social',
    position: 'intern',
    name: 'Chan Young Lee',
    imageSrc: '/assets/images/exec-headshots/Chan-Young_Lee.webp',
    program: 'Rotman Commerce',
    intro: []
  },
  // =======================
  // EXTERNAL RELATIONS
  // =======================
  {
    dept: 'external relations',
    position: 'director',
    name: 'Jung Yoon Choi',
    imageSrc: '/assets/images/exec-headshots/Jung_Yoon_Choi.webp',
    program: 'Political Science & Environmental Studies',
    intro: []
  },
  {
    dept: 'external relations',
    position: 'committee',
    name: 'Jungmin Shin',
    imageSrc: '/assets/images/exec-headshots/Jungmin_Shin.webp',
    program: 'Statistics & Math',
    intro: []
  },
  {
    dept: 'external relations',
    position: 'committee',
    name: 'Hyunjun You',
    imageSrc: '/assets/images/exec-headshots/Hyunjun_You.webp',
    program: 'RC - Finance & Econ',
    intro: []
  },
  {
    dept: 'external relations',
    position: 'intern',
    name: 'Brian Jin',
    imageSrc: '/assets/images/exec-headshots/Brian_Jin.webp',
    program: 'Rotman Commerce',
    intro: []
  },
  {
    dept: 'external relations',
    position: 'intern',
    name: 'Min So Kim',
    imageSrc: '/assets/images/exec-headshots/Min_So_Kim.webp',
    program: 'Life Sciences',
    intro: []
  },
  {
    dept: 'external relations',
    position: 'intern',
    name: 'Joonhyun Kim',
    imageSrc: '/assets/images/exec-headshots/Joonhyun_Kim.webp',
    program: 'Economics & Political Science',
    intro: []
  },
  // =======================
  // PROGRAMMING
  // =======================
  {
    dept: 'programming',
    position: 'director',
    name: 'Jaehyuk Ryu',
    imageSrc: '/assets/images/exec-headshots/Jaehyuk_Ryu.webp',
    program: 'Computer Science & Statistics',
    intro: []
  },
  {
    dept: 'programming',
    position: 'committee',
    name: 'Caelan Kim',
    imageSrc: '/assets/images/exec-headshots/Caelan_Kim.webp',
    program: 'Computer Science & Statistics',
    intro: []
  },
  {
    dept: 'programming',
    position: 'intern',
    name: 'Jeehoon (Jamie) Ryu',
    imageSrc: '/assets/images/exec-headshots/Jeehoon_Ryu.webp',
    program: 'Math & Physical Sciences',
    intro: []
  }
];
