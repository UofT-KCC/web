'use client';

import Image from 'next/image';
import logoBody from '@/public/assets/images/intro/logo-body.png';
import logoInner from '@/public/assets/images/intro/logo-inner.png';
import logoOuter from '@/public/assets/images/intro/logo-outer.png';
import './entry.css';

const LOGO_SIZES = '(min-width: 1024px) 224px, (min-width: 640px) 192px, 160px';

/**
 * 홈페이지 첫 화면 (LCP).
 *
 * Plays once: the logo builds itself from its three pieces (split from
 * big-logo.png, so stacked they are the original logo), then the UTKCC
 * title and full club name come into focus, then the scroll cue appears.
 */
export default function Entry() {
  const scrollToAbout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('about');
    if (!target) return;
    event.preventDefault();
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <>
      <div className="h-[100lvh]" />
      <section
        id="entry"
        className="absolute left-0 top-0 flex h-[100dvh] w-screen select-none flex-col items-center justify-center overflow-hidden px-6 text-center"
      >
        <div aria-hidden="true" className="intro-backdrop">
          <div className="intro-blob intro-blob-a" />
          <div className="intro-blob intro-blob-b" />
          <div className="intro-fade-out" />
        </div>

        <div className="relative h-40 w-40 sm:h-48 sm:w-48 lg:h-56 lg:w-56">
          <Image
            src={logoBody}
            alt="UTKCC 로고"
            fill
            priority
            sizes={LOGO_SIZES}
            className="intro-logo-body object-contain"
          />
          <Image
            src={logoOuter}
            alt=""
            fill
            priority
            sizes={LOGO_SIZES}
            className="intro-logo-outer object-contain"
          />
          <Image
            src={logoInner}
            alt=""
            fill
            priority
            sizes={LOGO_SIZES}
            className="intro-logo-inner object-contain"
          />
        </div>

        <h1
          className="intro-line relative mt-6 text-6xl font-bold leading-none tracking-tight text-kcc-theme sm:mt-7 sm:text-7xl lg:text-8xl"
          style={{ animationDelay: '1.6s' }}
        >
          UTKCC
        </h1>

        <p
          className="intro-line relative mt-3 text-sm font-semibold leading-relaxed tracking-[0.04em] text-slate-500 sm:mt-4 sm:text-[15px] lg:text-base"
          style={{ animationDelay: '1.85s' }}
        >
          <span className="block sm:inline">University of Toronto </span>
          <span className="block sm:inline">Korean Commerce Community</span>
        </p>

        <a
          href="#about"
          onClick={scrollToAbout}
          className="intro-cue absolute bottom-[7dvh] flex flex-col items-center gap-1 text-sm font-semibold text-slate-400 transition-colors hover:text-kcc-theme focus:outline-none focus-visible:text-kcc-theme"
        >
          아래로 스크롤하세요
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="intro-cue-arrow h-5 w-5 fill-none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 8 5 5 5-5" />
          </svg>
        </a>
      </section>
    </>
  );
}
