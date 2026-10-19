/**
 * @warning
 * 수정 O
 *
 * @description
 * 스폰서 및 제휴업체 정보.
 * 최대한 정확한 정보를 입력해주세요.
 */
export const sponsorCategories = {
  dining: '식사',
  cafe: '카페 & 디저트',
  bar: '바 & 포차',
} as const;

export type SponsorCategory = keyof typeof sponsorCategories;

export const sponsorData: {
  name: string;
  exp: string;
  category: SponsorCategory;
  imageSrc: string;
  websiteUrl: string;
  locationUrl: string;
  /** 티켓 뒷면에 크게 표시되는 혜택 (예: '10%'). 비워두면 '혜택 정보 준비 중'으로 표시됩니다. */
  discount?: string;
  /** 혜택 조건 (예: '현금 또는 카드 결제 시') */
  benefitNote?: string;
  /** 매장 주소 */
  address?: string;
}[] = [
  // 20th sponsors
  {
    name: 'Kanari',
    exp: 'Contemporary Asian Bar',
    category: 'bar',
    imageSrc: '/assets/images/sponsors/kanari.jpg',
    websiteUrl: 'https://www.instagram.com/kanari.toronto/',
    locationUrl: 'https://maps.app.goo.gl/JW9fVsgP96V41shR8',
    discount: '10%',
    benefitNote: '현금 또는 카드 결제 시',
    address: '491 Church St.',
  },
  {
    name: '우주분식',
    exp: 'Woojoo Bunsik - Korean Street Food',
    category: 'dining',
    imageSrc: '/assets/images/sponsors/woojoobunsik.jpg',
    websiteUrl: 'https://www.instagram.com/woojoobunsik/',
    locationUrl: 'https://maps.app.goo.gl/zfC32PSYcHYJEr299',
    discount: '10%',
    benefitNote: '현금 또는 카드 결제 시',
    address: '417 Bloor St W.',
  },
  {
    name: '18feet',
    exp: 'Espresso Bar & The Cheong',
    category: 'cafe',
    imageSrc: '/assets/images/sponsors/18feet.jpg',
    websiteUrl: 'https://www.instagram.com/18feet.ca/',
    locationUrl: 'https://maps.app.goo.gl/qqNAaoreAKZv3BKb6',
    discount: '10%',
    benefitNote: '현금 또는 카드 결제 시',
    address: '86 Gerrard St E. #100',
  },
  {
    name: '이화',
    exp: 'Ehwa - Korean Restaurant',
    category: 'dining',
    imageSrc: '/assets/images/sponsors/ehwa.jpg',
    websiteUrl: 'https://www.instagram.com/ehwa_restaurant/',
    locationUrl: 'https://maps.app.goo.gl/PwZyqXrDMqFrjX4x7',
    discount: '10%',
    benefitNote: '현금 또는 카드 결제 시',
    address: '16 Isabella St.',
  },
  {
    name: 'Offset',
    exp: 'Bar & Café',
    category: 'bar',
    imageSrc: '/assets/images/sponsors/offset.jpg',
    websiteUrl: 'https://www.instagram.com/offset_bar530/',
    locationUrl: 'https://maps.app.goo.gl/rFRudEsW6uZwNR9o6',
    discount: '10%',
    benefitNote: '현금 또는 카드 결제 시',
    address: '530 Yonge St.',
  },
  {
    name: 'Zagmachi',
    exp: 'Café',
    category: 'cafe',
    imageSrc: '/assets/images/sponsors/zagmachi.jpg',
    websiteUrl: 'https://www.instagram.com/cafe_zagmachi/',
    locationUrl: 'https://maps.app.goo.gl/GbsikXbzktiC2ro59',
    discount: '10%',
    benefitNote: '현금 또는 카드 결제 시',
    address: '3 Isabella St.',
  },
  {
    name: 'Pocha 1989',
    exp: 'Korean Pocha',
    category: 'bar',
    imageSrc: '/assets/images/sponsors/pocha1989.jpg',
    websiteUrl: 'https://www.instagram.com/pocha1989_toronto/',
    locationUrl: 'https://maps.app.goo.gl/Svs3WfQBFGnceCQX7',
    discount: '10%',
    benefitNote: '현금 또는 카드 결제 시',
    address: '542 Church St.',
  },
  {
    name: '종로',
    exp: 'Jongro - Korean BBQ & Buffet',
    category: 'dining',
    imageSrc: '/assets/images/sponsors/jongro.jpg',
    websiteUrl: 'https://www.instagram.com/jong.ro/',
    locationUrl: 'https://maps.app.goo.gl/d6dpqShSNgevwhDo7',
    discount: '10%',
    benefitNote: '현금 또는 카드 결제 시',
    address: '754 Yonge St.',
  },
  {
    name: '한국관',
    exp: 'Traditional Korean Cuisine - BBQ & Stews',
    category: 'dining',
    imageSrc: '/assets/images/sponsors/korean-village.jpg',
    websiteUrl: 'https://www.instagram.com/koreanvillageto/',
    locationUrl: 'https://maps.app.goo.gl/1C99MTUt2UkaRwh46',
    discount: '10%',
    benefitNote: '현금 결제 시',
    address: '628 Bloor St W.',
  },
  {
    name: '우석포차',
    exp: 'Korean Street Bar - Late-Night Bites',
    category: 'bar',
    imageSrc: '/assets/images/sponsors/wooseok.jpg',
    websiteUrl: 'https://www.instagram.com/woosuk_pocha_downtown/',
    locationUrl: 'https://maps.app.goo.gl/NGgRJeiHB3ZfTRuR8',
    discount: '15%',
    benefitNote: '현금 또는 카드 결제 시',
    address: '25 Wellesley St E.',
  },
];
