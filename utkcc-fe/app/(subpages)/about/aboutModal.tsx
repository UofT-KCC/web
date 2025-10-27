'use client';

import { KCC_START_YEAR, KCC_TH_NOW } from '@/data/change-annually-data';
import { useState } from 'react';

export default function AboutModalButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="rounded-xl bg-gray-300 text-black text-sm px-6 py-2 w-fit mt-4 mx-auto cursor-pointer hover:bg-gray-200"
      >
        Learn More
      </div>
      {showModal && <AboutModal setShowModal={setShowModal} />}
    </>
  );
}

function AboutModal({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <dialog className="fixed top-0 left-0 z-[100] w-screen h-screen p-0 bg-black bg-opacity-50 justify-center items-center flex mx-auto my-auto touch-none">
      <div
        onClick={() => setShowModal(false)}
        className="z-0 absolute bg-transparent w-full h-full top-0 left-0"
      />
      <div className="z-10 m-4 lg:my-8 lg:mx-28 p-4 lg:p-16 rounded-lg w-full h-fit bg-white flex flex-col gap-3 lg:gap-6 max-h-[80vh]">
        <div className="text-xl font-bold text-kcc-theme">About UTKCC</div>
        <div className="text-kcc-gray sm:hidden lg:flex text-md flex-col gap-3 overflow-auto">
          <p>
            토론토 대학교의 UTKCC는 {KCC_START_YEAR}년에 Commerce 및 Economics
            전공 학생들을 중심으로 설립되어, 현재 {KCC_TH_NOW}기를 맞이한 학교
            공식 한인 학생회입니다. 창립 이래 꾸준히 활동을 이어오며, 이제는
            상경계뿐 아니라 다양한 전공과 배경을 가진 학생들이 함께 모여 서로의
            아이디어와 역량을 나누는 폭넓은 커뮤니티로 발전했습니다.
          </p>
          <p>
            UTKCC는
            <span className="text-kcc-theme underline underline-offset-4">
              #Be Part of a Professional Community
            </span>
            ,
            <span className="text-kcc-theme underline underline-offset-4">
              #Work Hard, Play Hard
            </span>
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
        <div className="text-kcc-gray text-xs lg:hidden flex flex-col gap-3 overflow-auto">
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
        <div
          onClick={() => setShowModal(false)}
          className="w-fit self-end underline underline-offset-2 text-kcc-gray hover:opacity-70 text-xs lg:text-sm cursor-pointer"
        >
          돌아가기
        </div>
      </div>
    </dialog>
  );
}
