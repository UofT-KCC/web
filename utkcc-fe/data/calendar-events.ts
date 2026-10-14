export const eventCategories = {
  academic: { label: 'Academic', color: '#1555a0', background: '#edf3fc', icon: 'school-outline' },
  social: { label: 'Social', color: '#a33b62', background: '#fbeef3', icon: 'people-outline' },
  campus: { label: 'Campus', color: '#815b24', background: '#faf4e8', icon: 'leaf-outline' },
};

export type EventCategory = keyof typeof eventCategories;

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  category: EventCategory;
  // Separate paragraphs with a blank line ("\n\n").
  description: string;
  // Short bullet points shown under the description in the event dialog.
  highlights?: string[];
  image?: string;
  imageAlt?: string;
  // CSS object-position for the cropped image (e.g. '50% 56%' to keep faces in frame).
  imagePosition?: string;
  imageCaption?: string;
  registrationUrl?: string;
  // Long-running notices appear below the calendar instead of filling every cell.
  notice?: boolean;
}

// October 2026 schedule supplied by UTKCC. Add event photos or posters here as
// they become available.
export const calendarEvents: CalendarEvent[] = [
  {
    id: 'executive-retreat', title: 'UTKCC MT', date: '2026-10-03', endDate: '2026-10-04', category: 'social',
    description: 'UTKCC 멤버들이 함께 떠나는 이틀간의 MT입니다. 바쁜 학기 중 잠시 캠퍼스를 벗어나, 같은 동아리 사람들과 제대로 친해질 수 있는 UTKCC의 대표 친목 행사예요.\n\n낮에는 탁 트인 공원에서 팀을 나눠 레크리에이션과 게임을 즐기고, 저녁에는 숙소에 모여 맛있는 음식과 보드게임, 이야기로 밤을 보냅니다. 처음 만난 사이라도 하루만 지나면 자연스럽게 가까워지는 시간이 될 거예요.\n\n세부 일정과 준비물은 임원 공지와 UTKCC 인스타그램(@utkcc_)을 통해 안내됩니다.',
    highlights: [
      '팀별 야외 레크리에이션과 게임',
      '다 함께 즐기는 저녁 식사와 보드게임',
      '이틀 동안 자연스럽게 가까워지는 시간',
      'UTKCC 바시티 재킷과 함께하는 단체 사진',
    ],
    image: '/assets/images/events/gallery/park-group.jpg',
    imageAlt: 'UTKCC MT 단체 사진 — 공원에서 바시티 재킷을 입은 멤버들',
  },
  {
    id: 'kpwa-mentorship', title: 'KPWA Mentorship Event', date: '2026-10-09', category: 'social',
    description: 'KPWA와 함께하는 멘토십 이벤트입니다. 다양한 분야에서 활동하고 있는 선배 직장인 멘토들과 만나, 진로와 커리어에 대해 깊이 있는 이야기를 나눌 수 있는 기회예요.\n\n학교 생활과 취업 준비, 첫 커리어를 시작하기까지의 과정처럼 혼자서는 답을 찾기 어려운 고민들을 멘토와 함께 이야기해 보세요. 단순한 정보 전달을 넘어, 앞으로도 이어질 수 있는 네트워크를 만드는 자리가 될 거예요.\n\n세부 프로그램과 참여 방법은 UTKCC 인스타그램(@utkcc_)을 통해 안내됩니다.',
    highlights: [
      '현직 멘토와의 진로·커리어 대화',
      '취업 준비 과정에 대한 현실적인 조언',
      '관심 분야 선배들과의 네트워킹',
    ],
    image: '/assets/images/events/kpwa-mentorship.jpg',
    imageAlt: 'KPWA 행사 포토월 앞에서 함께한 UTKCC 멤버들',
    imagePosition: '50% 56%',
  },
  {
    id: 'thanksgiving', title: 'Thanksgiving', date: '2026-10-12', category: 'campus',
    description: 'Thanksgiving 공휴일입니다. 이날은 U of T 수업이 없으며, 캠퍼스 시설 운영 시간도 평소와 다를 수 있어요.\n\n중간고사 시즌을 앞두고 잠시 쉬어 가며 가족, 친구들과 따뜻한 연휴 보내세요.',
  },
  {
    id: 'eco101-tutorial', title: 'ECO101 Tutorial', date: '2026-10-12', category: 'academic',
    description: 'ECO101을 수강하는 학생들을 위한 튜토리얼입니다. 처음 경제학을 배우는 학생들이 어려워하는 핵심 개념을 정리하고, 실제 시험 유형에 가까운 문제를 함께 풀어 보며 시험을 대비해요.\n\n수요와 공급, 탄력성, 시장 구조처럼 자주 헷갈리는 내용을 그래프와 함께 차근차근 짚어 보고, 혼자 공부하다 막혔던 부분은 그 자리에서 바로 질문할 수 있습니다.\n\n진행 범위와 참여 방법은 UTKCC 인스타그램(@utkcc_)을 통해 안내됩니다.',
    highlights: [
      '핵심 개념과 그래프 정리',
      '시험 유형에 맞춘 문제 풀이',
      '궁금한 부분을 바로 묻는 Q&A',
    ],
    image: '/assets/images/events/academic-events.jpeg',
    imageAlt: 'UTKCC academic category image', imageCaption: 'Academic category image · Event poster to follow',
  },
  {
    id: 'halloween', title: 'UTKCC x VOKLS Halloween', date: '2026-10-23', category: 'social',
    description: 'UTKCC와 VOKLS가 함께하는 할로윈 이벤트입니다. 두 커뮤니티가 한자리에 모여, 평소에 만나기 어려웠던 사람들과 새롭게 어울릴 수 있는 시즌 소셜이에요.\n\n할로윈 분위기에 맞는 게임과 이벤트가 준비되어 있고, 코스튬은 자유입니다. 개성 있는 의상으로 참여해도, 가볍게 놀러 와도 모두 환영해요.\n\n신청 방법은 UTKCC 인스타그램(@utkcc_)을 통해 안내됩니다.',
    highlights: [
      'UTKCC × VOKLS 합동 소셜',
      '할로윈 테마 게임과 이벤트',
      '코스튬 자유 — 가볍게 참여해도 OK',
    ],
    image: '/assets/images/events/social-events-2.jpg',
    imageAlt: 'UTKCC social category image', imageCaption: 'Social category image · Event poster to follow',
  },
  {
    id: 'reading-week', title: 'Reading Week', date: '2026-10-26', endDate: '2026-10-30', category: 'campus',
    description: 'U of T 가을 학기 Reading Week 기간입니다. 이 주에는 대부분의 수업이 진행되지 않아요.\n\n밀린 공부를 정리하고 남은 학기를 준비하기 좋은 시기예요. 학부와 과목에 따라 일정이 다를 수 있으니, 정확한 학사 일정은 소속 학부의 안내를 확인해 주세요.',
  },
];
