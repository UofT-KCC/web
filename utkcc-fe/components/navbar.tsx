'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import './navbar.css';
import { handleScroll } from '@/lib/utils';
import SmallLogoImage from '@/public/assets/images/logo-nav.png';
import { recruitmentLink } from '@/data/change-annually-data';

export default function NavBar({
  visibleThreshold,
}: {
  visibleThreshold?: string;
}) {
  const [navActive, setNavActive] = useState(false);
  const [showSeminarBanner, setShowSeminarBanner] = useState(true);
  const [seminarDaysLeft, setSeminarDaysLeft] = useState<number | null>(null);

  const subpagesList = [
    'about',
    'events',
    'executives',
    'sponsors',
    'resources',
    'newsletter',
  ];

  useEffect(() => {
    const isDismissed =
      window.localStorage.getItem('utkcc-freshman-seminar-banner') ===
      'dismissed';
    setShowSeminarBanner(!isDismissed);

    const updateCountdown = () => {
      const seminarDate = new Date('2026-07-11T18:00:00+09:00').getTime();
      const now = Date.now();
      const daysLeft = Math.max(
        0,
        Math.ceil((seminarDate - now) / (1000 * 60 * 60 * 24)),
      );

      setSeminarDaysLeft(daysLeft);
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 60 * 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('utkcc-mobile-nav-toggle', {
        detail: { open: navActive },
      }),
    );
  }, [navActive]);

  // HANDLE NAVBAR VISIBILITY
  const navbarElementTarget = useRef<HTMLDivElement>(null); // navbar element
  const navbarHiderTarget = useRef<HTMLDivElement>(null); // if this target is visible, hide navbar
  useEffect(() => {
    let observer: IntersectionObserver;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const isIntersecting = entry.isIntersecting;

        // Scrolling down/up
        if (navbarElementTarget.current) {
          navbarElementTarget.current.style.opacity = isIntersecting
            ? '0'
            : '1';
        }
      });
    };

    observer = new IntersectionObserver(handleIntersect);
    observer.observe(navbarHiderTarget.current as Element);
  });

  const dismissSeminarBanner = () => {
    window.localStorage.setItem(
      'utkcc-freshman-seminar-banner',
      'dismissed',
    );
    setShowSeminarBanner(false);
  };

  return (
    <>
      <nav
        ref={navbarElementTarget}
        className={`w-screen ${
          navActive ? 'h-[100dvh] lg:h-auto' : 'h-auto'
        } pt-safe-top top-0 fixed bg-[#FCFCFC] hover:!opacity-100 border-b border-solid border-gray-200 font-normal duration-300 select-none z-10 touch-none`}
      >
        {showSeminarBanner && (
          <div className="flex w-full items-center gap-2 border-b border-kcc-theme/10 bg-kcc-theme px-4 py-2 text-white shadow-[0_8px_28px_rgba(5,60,140,0.16)] lg:px-8">
            <Link
              href="https://20-freshman-seminar.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 flex-1 items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.02em] lg:text-sm"
            >
              <span className="hidden rounded-full bg-white/12 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/80 ring-1 ring-white/15 sm:inline">
                Freshman Seminar 2026
              </span>
              <span className="truncate">
                신입생 세미나 2026 초대장이 공개되었습니다
              </span>
              {seminarDaysLeft !== null && (
                <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-kcc-theme shadow-sm lg:text-xs">
                  D-{seminarDaysLeft}
                </span>
              )}
              <span className="hidden shrink-0 rounded-full bg-white/10 px-3 py-1 text-[10px] text-white/90 ring-1 ring-white/15 transition hover:bg-white hover:text-kcc-theme sm:inline lg:text-xs">
                초대장 보기
              </span>
            </Link>
            <button
              type="button"
              aria-label="Dismiss freshman seminar announcement"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg leading-none text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              onClick={dismissSeminarBanner}
            >
              ×
            </button>
          </div>
        )}
        {/* NAVBAR FOR DEFAULT (sm - md) VIEWPORT */}
        <div
          className={`flex h-full lg:hidden px-4 py-4 ${
            navActive ? 'flex-col' : ''
          }`}
        >
          <Link
            className={`${
              navActive ? 'hidden' : 'flex'
            } w-fit h-full gap-2 items-center`}
            href="/"
          >
            <div className="w-8 h-8 relative">
              <Image
                src={SmallLogoImage}
                alt="logo"
                priority={true}
                className="object-scale-down"
              />
            </div>
          </Link>
          <div className="lg:hidden w-8 h-8 ml-auto self-center">
            <NavBarMenuButton getter={navActive} setter={setNavActive} />
          </div>
          <div
            className={`${
              navActive ? 'flex' : 'hidden lg:flex'
            } flex-col lg:flex-row w-fit overflow-y-clip h-min flex-wrap py-10 lg:my-auto px-16 lg:pl-5 gap-8 lg:place-content-around lg:place-items-center 
            text-xl lg:text-sm text-gray-600 lg:font-bold lg:text-kcc-theme`}
          >
          <Link
            href="/contact"
            className="capitalize w-fit"
            onClick={() => {
              setNavActive(false);
            }}
          >
            contact
          </Link>
            {subpagesList.map((subpageName, i) => (
              <Link
                key={i}
                href={`#${subpageName}`}
                className="capitalize w-fit"
                onClick={e => {
                  setNavActive(false);
                  handleScroll(e);
                }}
              >
                {subpageName}
              </Link>
            ))}
            <Link
              href="#footer"
              className="capitalize w-fit"
              onClick={e => {
                setNavActive(false);
                handleScroll(e);
              }}
            >
              contact
            </Link>
            <Link
              href={recruitmentLink}
              className="py-2 px-5 rounded-lg text-white bg-kcc-theme w-fit"
            >
              Join
            </Link>
          </div>
        </div>
        {/* NAVBAR FOR LARGE (lg - xl) VIEWPORT, no menu button. join button added. */}
        <div className={`hidden lg:flex px-4 py-4`}>
          <Link className={`flex w-fit h-full gap-2 items-center`} href="/">
            <div className="w-8 h-8 relative">
              <Image
                src={SmallLogoImage}
                alt="logo"
                priority={true}
                className="object-scale-down hover:opacity-70"
              />
            </div>
          </Link>
          <div
            className={`flex flex-row basis-full my-auto pl-5 gap-8 place-content-around place-items-center 
            text-sm font-bold text-kcc-theme`}
          >
            <Link href="/" className="capitalize hover:opacity-70">
              home
            </Link>
            {subpagesList.map((subpageName, i) => (
              <Link
                key={i}
                href={`/${subpageName}`}
                className="capitalize hover:opacity-70"
              >
                {subpageName}
              </Link>
            ))}
            <Link
              href="/contact"
              className="capitalize hover:opacity-70"
            >
              contact
            </Link>
            <Link
              href={recruitmentLink}
              target="_blank"
              className="py-2 px-5 rounded-lg capitalize text-white bg-kcc-theme text-opacity-90 hover:text-opacity-100 hover:bg-kcc-theme-darker"
            >
              join
            </Link>
          </div>
        </div>
      </nav>
      <div
        ref={navbarHiderTarget}
        className={`absolute w-1 bg-transparent opacity-0 -z-10`}
        style={
          visibleThreshold
            ? {
                height: visibleThreshold,
              }
            : { display: 'none' }
        }
      ></div>
    </>
  );
}

interface navBarProps {
  getter: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavBarMenuButton({ getter, setter }: navBarProps) {
  const [navActive, setNavActive] = [getter, setter];

  return (
    <div
      id="menu-button"
      className={`w-8 h-8 flex flex-col justify-center items-center cursor-pointer navbar-button ${
        navActive ? 'active' : ''
      }`}
      onClick={() => {
        setNavActive(!navActive);
      }}
    />
  );
}
