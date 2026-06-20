'use client';
import { useEffect, useState } from 'react';

interface PresidentIntroProps {
  position: string;
  name: string;
  intro: string[];
}

export default function PresidentModalButton(props: PresidentIntroProps) {
  const [showIntro, setShowIntro] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowIntro(true)}
        className="group mt-3 flex w-fit items-center gap-1 text-[10px] font-bold text-kcc-theme transition-colors duration-200 hover:text-kcc-theme-darker focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/30 lg:mt-4 lg:text-xs"
      >
        <span>소개글 보기</span>
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </button>
      {showIntro && <PresidentModal setShowModal={setShowIntro} {...props} />}
    </>
  );
}

interface PresidentModalProps extends PresidentIntroProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function PresidentModal({
  position,
  name,
  intro,
  setShowModal,
}: PresidentModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowModal(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [setShowModal]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/35 px-4 py-8 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} introduction`}
      onClick={() => setShowModal(false)}
    >
      <div
        className="relative flex max-h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-[0_24px_70px_rgba(0,0,0,0.2)] ring-1 ring-black/10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4 lg:px-8 lg:py-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-kcc-theme/70">
              <span className="capitalize">{position}</span> of UTKCC
            </div>
            <div className="mt-1 text-xl font-bold text-black">{name}</div>
          </div>
          <button
            type="button"
            aria-label="Close executive introduction"
            onClick={() => setShowModal(false)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl leading-none text-kcc-gray transition-colors duration-200 hover:bg-kcc-theme hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/30"
          >
            ×
          </button>
        </div>
        <div className="flex flex-col gap-4 overflow-auto px-5 py-5 text-sm leading-7 text-kcc-gray lg:px-8 lg:py-7">
          {intro.map((paragraph, i) => (
            <p key={i} className="break-keep">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
