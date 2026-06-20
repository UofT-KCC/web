'use client';

import { KCC_START_YEAR, KCC_TH_NOW } from '@/data/change-annually-data';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function AboutModalButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="group mx-auto mt-5 flex w-fit items-center gap-1.5 rounded-full bg-gray-200 px-5 py-2 text-xs font-bold text-black shadow-sm ring-1 ring-black/5 transition-all duration-300 ease-out hover:bg-white hover:text-kcc-theme hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:ring-kcc-theme/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/30 active:scale-[0.98] lg:mx-0 lg:gap-2 lg:px-7 lg:py-2.5 lg:text-sm"
      >
        <span>Learn More</span>
        <span className="text-sm leading-none transition-transform duration-300 ease-out group-hover:translate-x-0.5 lg:text-base">
          →
        </span>
      </button>
      {showModal && <AboutModal setShowModal={setShowModal} />}
    </>
  );
}

function AboutModal({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setShowModal(false), 220);
  }, [setShowModal]);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, [closeModal]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/35 px-4 py-8 backdrop-blur-md transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="About UTKCC"
      onClick={closeModal}
    >
      <div
        className={`relative flex max-h-[84vh] w-full max-w-[1120px] flex-col overflow-hidden rounded-xl bg-white shadow-[0_28px_80px_rgba(0,0,0,0.22)] ring-1 ring-black/10 transition-all duration-300 ease-out ${
          isVisible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-3 scale-[0.985] opacity-0'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4 lg:px-8 lg:py-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-kcc-theme/70">
              About
            </div>
            <div className="mt-1 text-xl font-bold text-kcc-theme lg:text-2xl">
              What Is UTKCC?
            </div>
          </div>
          <button
            type="button"
            aria-label="Close about modal"
            onClick={closeModal}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl leading-none text-kcc-gray transition-all duration-200 hover:bg-kcc-theme hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/30 active:scale-[0.98]"
          >
            ×
          </button>
        </div>

        <div className="overflow-auto px-5 py-5 lg:px-8 lg:py-7">
          <div className="hidden text-kcc-gray lg:flex text-md flex-col gap-5 leading-8">
          <p>
            토론토 대학교의 UTKCC는 {KCC_START_YEAR}년에 Commerce 및 Economics
            전공 학생들을 중심으로 설립되어, 현재 {KCC_TH_NOW}기를 맞이한 학교
            공식 한인 학생회입니다. 창립 이래 꾸준히 활동을 이어오며, 이제는
            상경계뿐 아니라 다양한 전공과 배경을 가진 학생들이 함께 모여 서로의
            아이디어와 역량을 나누는 폭넓은 커뮤니티로 발전했습니다.
          </p>
          <p>
            UTKCC는{' '}
            <span className="text-kcc-theme underline underline-offset-4">
              #Be Part of a Professional Community
            </span>
            ,{' '}
            <span className="text-kcc-theme underline underline-offset-4">
              #Work Hard, Play Hard
            </span>{' '}
            라는 모토 아래 학업, 진로, 그리고 친목 등 여러 분야에 걸친 이벤트를
            기획하고 진행합니다. 신입생 환영회, 세미나, 할로윈 파티 등 다양한
            소셜 이벤트를 통해 학생들이 서로 교류하고, 학교 생활에 활력을 더할
            수 있는 기회를 제공합니다.
          </p>
          <p>
            또한 지난 {KCC_TH_NOW}년 동안 KCC를 거쳐 국내외 다양한 분야로 진출한
            선배님들로 구성된 네트워크 KCCA를 중심으로, 학우들이 관심 있는
            산업의 선배들과 직접 교류할 수 있는 커피챗, 커리어 세미나, 와인 파티
            등 실질적이고 의미 있는 프로그램을 운영하고 있습니다.
          </p>
          <p>
            KCC는 이처럼 선배들의 경험과 조언을 토대로 특정 분야에 한정되지
            않고, 다양한 영역에서 미래를 이끌어갈 리더를 양성하는 데 힘쓰고
            있습니다. 앞으로도 UTKCC는 학업과 커리어, 그리고 인간적인 교류가
            조화된 커뮤니티로서 여러분의 대학 생활을 한층 더 풍요롭고 의미 있게
            만들어가겠습니다.
          </p>
          </div>
          <div className="text-kcc-gray text-sm lg:hidden flex flex-col gap-4 leading-6">
          <p className="leading-5 ">
            토론토대학교의 UTKCC는 {KCC_START_YEAR}년에 상경계 학생들을 중심으로
            설립되어, 현재 {KCC_TH_NOW}기를 맞이한 학교 공식 한인 학생회입니다.
            현재는 상경계를 넘어 다양한 전공의 학생들이 함께하며, 변화하는
            사회에 걸맞은 폭넓은 네트워킹과 지식 공유의 장을 만들어가고
            있습니다.
          </p>
          <p className="leading-5">
            UTKCC는{' '}
            <span className="text-kcc-theme underline underline-offset-4">
              #Be Part of a Professional Community,
            </span>{' '}
            <span className="text-kcc-theme underline underline-offset-4">
              #Work Hard, Play Hard
            </span>{' '}
            라는 모토 아래 학업, 진로, 친목 등 다방면의 이벤트를 통해 서로에게
            도움이 되는 커뮤니티를 지향합니다. 신입생 웰컴 이벤트, 세미나,
            할로윈 파티 등 다양한 소셜 행사로 즐겁고 의미 있는 대학 생활을 함께
            만들어갑니다. 또한, 지난 {KCC_TH_NOW}년간 KCC를 거쳐 사회 각계로
            진출한 선배들이 함께하는 네트워크 KCCA를 통해 커피챗, 커리어 세미나,
            네트워킹 이벤트 등 실질적인 진로 지원 기회를 제공합니다. KCC는
            앞으로도 학우들의 성장을 돕고, 서로에게 영감을 주는 커뮤니티로
            나아가고자 합니다.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
