// 수정 O: 매년 새로 발행되는 족보(스터디 패키지) 가격/과목 정보를 보관하는 장소입니다.
// 시즌이 바뀔 때마다 이 파일만 업데이트하면 됩니다.

export interface PriceTier {
  label: string;
  price: string;
}

export interface PackageTier {
  id: string;
  badge?: string;
  title: string;
  courses: string[];
  pricing: PriceTier[];
  footnote?: string;
}

/** 족보 시즌 */
export const studyPackageSeason = '2026-2027';

/** 얼리버드 / 정가 기간 (end은 해당 날짜 23:59:59까지 포함) */
export const studyPackagePeriods = {
  earlyBird: {
    label: 'Early Bird',
    range: 'Sep 14 - 25',
    start: '2026-09-14',
    end: '2026-09-25',
  },
  regular: {
    label: 'Regular',
    range: 'Sep 26 - Nov 1',
    start: '2026-09-26',
    end: '2026-11-01',
  },
};

/** 지금이 얼리버드 기간인지 여부 (기간이 지나면 자동으로 정가로 전환됩니다) */
export function isEarlyBirdActive(now: Date = new Date()): boolean {
  const earlyBirdEnd = new Date(`${studyPackagePeriods.earlyBird.end}T23:59:59`);
  return now.getTime() <= earlyBirdEnd.getTime();
}

/** 얼리버드가 끝났으면 얼리버드 가격은 숨기고 나머지 가격만 보여줍니다 */
export function visiblePricing(pricing: PriceTier[]): PriceTier[] {
  if (isEarlyBirdActive()) return pricing;
  return pricing.filter(price => price.label !== 'Early Bird');
}

/** 정가 기간 구매 시 안내 문구 */
export const regularPurchaseReminder =
  'Regular Period 주문 후에는 DM으로 연락 부탁드립니다.';

/** 노트 템플릿 추가 옵션 */
export const noteTemplateAddOn = {
  title: 'UTKCC Note Template',
  description:
    '구글 닥스 전용 노트 템플릿과 사용 설명서가 함께 제공돼요. 필기를 더 깔끔하고 체계적으로 정리할 수 있어요.',
  pricing: [
    { label: 'Early Bird', price: '+$2' },
    { label: 'Regular', price: '+$3' },
  ] as PriceTier[],
};

/** 과목별 개별 패키지 (Half Course / Year Course) */
export const individualCourseTiers: PackageTier[] = [
  {
    id: 'half-course',
    badge: 'Half Course',
    title: '한 학기 과목',
    courses: [
      'ECO101',
      'ECO102',
      'SOC100',
      'AST101',
      'STA130',
      'MAT223',
      'CSC108',
      'POL101',
      'PSY100',
      'RSM333',
      'RSM225',
    ],
    pricing: [
      { label: 'Early Bird', price: '$7' },
      { label: 'Regular', price: '$10' },
    ],
  },
  {
    id: 'year-course',
    badge: 'Year Course',
    title: '한 해 과목',
    courses: ['MAT133', 'MAT137 (MAT148+MAT149)', 'ECO204', 'ECO220'],
    pricing: [
      { label: 'Early Bird', price: '$10' },
      { label: 'Regular', price: '$15' },
    ],
    footnote:
      'MAT137은 이번 학년도부터 MAT148 + MAT149로 개편되어 운영됩니다.',
  },
];

/** 학년별 로트만 커머스 패키지 */
export const rotmanPackageTiers: PackageTier[] = [
  {
    id: 'first-year',
    badge: 'First Year',
    title: 'Rotman Commerce Package',
    courses: [
      'ECO101',
      'ECO102',
      'RSM250',
      'RSM100',
      'MAT133',
      'RSM230',
      'RSM219',
    ],
    pricing: [
      { label: 'Early Bird', price: '$55' },
      { label: 'Regular', price: '$65' },
      { label: 'Membership', price: '$40' },
    ],
    footnote: '패키지 구매 시 코스맵도 함께 받아보실 수 있어요.',
  },
  {
    id: 'second-year',
    badge: 'Second Year',
    title: 'Rotman Commerce Package',
    courses: [
      'ECO204',
      'ECO220',
      'RSM222',
      'RSM260',
      'RSM270',
      'RSM332',
      'RSM333',
      'RSM225',
    ],
    pricing: [
      { label: 'Early Bird', price: '$65' },
      { label: 'Regular', price: '$75' },
      { label: 'Membership', price: '$50' },
    ],
    footnote: '패키지 구매 시 코스맵도 함께 받아보실 수 있어요.',
  },
  {
    id: 'first-and-second-year',
    badge: 'First & Second Year',
    title: 'Rotman Commerce Package',
    courses: [
      'ECO101',
      'ECO102',
      'RSM250',
      'RSM100',
      'MAT133',
      'RSM230',
      'RSM219',
      'ECO204',
      'ECO220',
      'RSM222',
      'RSM260',
      'RSM270',
      'RSM332',
      'RSM333',
      'RSM225',
    ],
    pricing: [
      { label: 'Early Bird', price: '$90' },
      { label: 'Regular', price: '$110' },
      { label: 'Membership', price: '$75' },
    ],
    footnote: '패키지 구매 시 코스맵도 함께 받아보실 수 있어요.',
  },
];

/** 1학년 RSM 과제 도우미 + 컨닝지 */
export const rsmAssignmentHelper: PackageTier = {
  id: 'rsm-assignment-helper',
  badge: 'First Year Resource',
  title: 'RSM Assignment Helper + Cheat Sheet',
  courses: ['RSM219', 'RSM230', 'RSM250'],
  pricing: [
    { label: 'Early Bird', price: '$10' },
    { label: 'Regular', price: '$15' },
  ],
};
