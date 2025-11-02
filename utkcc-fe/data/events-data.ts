import { EventModalButtonProps } from '@/app/(subpages)/events/eventModal';

/**
 * @warning
 * 수정 O
 *
 * @description
 * events - learn more 를 클릭하면 나오는 페이지의 이벤트 소개.
 *
 * 이미지 파일은 되도록 수정하지 마세요!
 */
export const eventData: EventModalButtonProps[] = [
  {
    info: {
      type: 'academic',
      slogan: ['학생의 본분을', '잊지 않기 위하여'],
      explanation: `대학 공부가 처음이라 버겁게 느껴진다면, UTKCC와 함께 시작해요.
UTKCC는 신입생들이 보다 쉽게 대학 생활에 적응하고 자신만의 공부 방법을 찾을 수 있도록 다양한 아카데믹 이벤트를 운영하고 있습니다.
신입생 세미나와 커리어 세미나를 통해 학업과 진로를 동시에 설계하고, 각 분야별 커피챗에서는 선배들의 생생한 경험담을 들을 수 있습니다.
또한 주요 100레벨 과목을 중심으로 한 코스 튜토리얼에서는, 직접 해당 코스를 수강했던 선배들에게만 들을 수 있는 팁과 문제풀이 방식을 배워가며 한 걸음씩 성장할 수 있습니다.`,
    },
    bgImage: '/assets/images/events/academic-events.jpeg',
  },
  {
    info: {
      type: 'professional',
      slogan: ['대학 그 너머', '커리어를 위하여'],
      explanation: `UTKCC는 회원들이 대학 생활을 넘어 미래의 커리어를 구체적으로 설계할 수 있도록 다양한 Professional 이벤트를 운영하고 있습니다.
현직자들과 직접 소통하는 커피챗,
선배들과의 폭넓은 Alumni 네트워킹 세션,
KCCA 커뮤니티와 협력한 산업 네트워킹 프로그램,
그리고 실무 역량을 강화할 수 있는 Case Competition까지.
UTKCC와 함께라면, 대학 이후의 진로를 미리 탐색하고,
실제 커리어 현장을 경험할 수 있는 값진 기회를 얻게 됩니다.`,
    },
    bgImage: '/assets/images/events/professional-events.jpg',
  },
  {
    info: {
      type: 'social',
      slogan: ['대학 생활의 묘미를', '잊지 않기 위하여'],
      explanation: `즐거운 대학 생활을 보내고 싶으신가요?
UTKCC에 속한 다양한 배경의 학생들과 교류하며 진정한 대학의 즐거움을 느껴보세요!
UTKCC는 학업뿐 아니라 교류와 네트워킹을 통해 구성원 간의 유대감을 쌓을 수 있도록 다양한 소셜 이벤트를 주최합니다.
신입생 세미나와 캠퍼스 투어를 시작으로, 할로윈 파티, MT, 연말 행사(Year Ending Party) 등 다채로운 이벤트들이 준비되어 있습니다.
전공과 학년을 넘어 새로운 친구를 만나고, 선후배와의 관계를 넓혀갈 수 있는 특별한 기회를 UTKCC에서 경험해보세요.`,
    },
    bgImage: '/assets/images/events/social-events-2.jpg',
  },
];
