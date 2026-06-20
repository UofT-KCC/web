'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import groupImage from '/public/assets/images/utkcc.jpeg';

export default function AboutImage() {
  const [isLightboxMounted, setIsLightboxMounted] = useState(false);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openLightbox = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setIsLightboxMounted(true);
    requestAnimationFrame(() => setIsLightboxVisible(true));
  };

  const closeLightbox = useCallback(() => {
    setIsLightboxVisible(false);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(
      () => setIsLightboxMounted(false),
      220
    );
  }, []);

  useEffect(() => {
    if (!isLightboxMounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeLightbox, isLightboxMounted]);

  return (
    <>
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 shadow-sm lg:hidden">
        <Image
          alt="UTKCC group photo"
          className="object-cover object-[50%_58%]"
          fill
          sizes="100vw"
          src={groupImage}
        />
        <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/5" />
      </div>

      <button
        type="button"
        aria-label="Open UTKCC group photo"
        onClick={openLightbox}
        className="group relative hidden w-full max-w-[920px] aspect-[4/3] lg:block lg:max-h-[520px] overflow-hidden rounded-lg bg-gray-100 text-left cursor-pointer shadow-sm transition-all duration-300 ease-out hover:shadow-[0_18px_45px_rgba(0,0,0,0.16)] focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/30"
      >
        <Image
          alt="UTKCC group photo"
          className="object-cover object-[50%_58%] transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          fill
          sizes="(min-width: 1024px) 48vw, 100vw"
          src={groupImage}
        />
        <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.06]" />
        <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/5 transition-all duration-300 group-hover:ring-kcc-theme/20" />
      </button>

      {isLightboxMounted && (
        <div
          className={`fixed inset-0 z-[10000] flex items-center justify-center bg-white/75 px-4 py-16 backdrop-blur-2xl transition-opacity duration-300 ease-out ${
            isLightboxVisible ? 'opacity-100' : 'opacity-0'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded UTKCC group photo"
          onClick={closeLightbox}
        >
          <button
            type="button"
            aria-label="Back to about page"
            onClick={closeLightbox}
            className={`absolute left-4 top-4 lg:left-8 lg:top-8 flex h-10 items-center gap-2 rounded-full bg-white/80 px-4 text-sm font-bold text-kcc-theme shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/10 backdrop-blur-md transition-all duration-300 ease-out hover:bg-kcc-theme hover:text-white hover:shadow-[0_14px_36px_rgba(5,60,140,0.22)] focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/30 active:scale-[0.98] ${
              isLightboxVisible
                ? 'translate-y-0 opacity-100'
                : '-translate-y-2 opacity-0'
            }`}
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back
          </button>
          <div
            className={`rounded-lg shadow-[0_28px_70px_rgba(0,0,0,0.22)] ring-1 ring-black/10 transition-all duration-300 ease-out ${
              isLightboxVisible
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-3 scale-[0.985] opacity-0'
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              alt="Expanded UTKCC group photo"
              className="h-auto max-h-[82vh] w-auto max-w-[92vw] rounded-lg"
              sizes="92vw"
              src={groupImage}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
