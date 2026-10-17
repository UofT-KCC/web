/**
 * @warning
 * 수정 O
 *
 * @description
 * Events 페이지 하단 "지난 행사 초대장"에 보이는, 행사마다 직접 만든 초대장 웹사이트 목록.
 *
 * 새 초대장은 맨 위에 추가하세요 (최신순으로 보여요).
 * 썸네일은 public/assets/images/events/invitations/ 에 16:10 비율로 넣어 주세요.
 */
export interface InvitationSite {
  id: string;
  // 기수, e.g. '20th'
  edition: string;
  title: string;
  // The invitation's own name or tagline, e.g. 'Fail Forward'
  theme: string;
  // YYYY-MM-DD. Leave out if unknown; the card then shows only the edition.
  date?: string;
  description: string;
  url: string;
  image: string;
  imageAlt: string;
}

export const invitationSites: InvitationSite[] = [
  {
    id: '20-freshman-seminar',
    edition: '20th',
    title: 'Freshman Seminar 2026',
    theme: 'Welcome Onboard',
    date: '2026-08-22',
    description:
      '서울에서 토론토로 향하는 비행기 기내 스크린 콘셉트의 초대장이에요. 탑승자 이름을 입력하면 행사 정보와 프로그램, 체크인 안내를 볼 수 있었어요.',
    url: 'https://20-freshman-seminar.vercel.app/',
    image: '/assets/images/events/invitations/20-freshman-seminar.jpg',
    imageAlt: '기내 스크린처럼 꾸며진 Freshman Seminar 2026 초대장 첫 화면',
  },
  {
    id: '19-wine-party',
    edition: '19th',
    title: 'Wine Party',
    theme: 'Re;Wined',
    description:
      '"Your career, aging to excellence." 선배들과 함께하는 포멀한 네트워킹 저녁을 위한 초대장으로, 참석자마다 개인 QR 초대장을 받을 수 있었어요.',
    // Links to the invitation itself rather than the site's start page,
    // which also holds the staff QR scanner.
    url: 'https://19-wine-party.vercel.app/invitation',
    image: '/assets/images/events/invitations/19-wine-party.jpg',
    imageAlt: '와인빛 배경 위 Re;Wined 필기체 타이틀이 있는 와인파티 초대장',
  },
  {
    id: '19-career-seminar',
    edition: '19th',
    title: 'Career Seminar',
    theme: 'Fail Forward',
    date: '2025-11-22',
    description:
      '선배들의 솔직한 실패담을 나누는 패널 토크, 분야별 브레이크아웃 룸, 익명 사연을 읽는 라디오 토크로 구성된 온라인 커리어 세미나 초대장이에요.',
    url: 'https://uoft-kcc.github.io/19-career-seminar/',
    image: '/assets/images/events/invitations/19-career-seminar.jpg',
    imageAlt: '손글씨로 UTKCC Career Seminar가 쓰인 커리어 세미나 초대장',
  },
];
