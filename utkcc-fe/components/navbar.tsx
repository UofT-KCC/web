'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import './navbar.css';
import { handleScroll } from '@/lib/utils';
import SmallLogoImage from '@/public/assets/images/logo-nav.png';
import { recruitmentLink, recruitmentOpen } from '@/data/change-annually-data';

export default function NavBar({
  visibleThreshold,
}: {
  visibleThreshold?: string;
}) {
  const [navActive, setNavActive] = useState(false);
  const pathname = usePathname();

  const subpagesList = [
    'about',
    'events',
    'executives',
    'sponsors',
    'resources',
    'newsletter',
  ];

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('utkcc-mobile-nav-toggle', {
        detail: { open: navActive },
      }),
    );
  }, [navActive]);

  // Lock page scroll while the mobile menu is open. Escape, or widening the
  // window to the desktop layout, closes it.
  useEffect(() => {
    if (!navActive) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNavActive(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    const desktop = window.matchMedia('(min-width: 1024px)');
    const handleDesktop = () => {
      if (desktop.matches) setNavActive(false);
    };
    desktop.addEventListener('change', handleDesktop);

    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      desktop.removeEventListener('change', handleDesktop);
    };
  }, [navActive]);

  useEffect(() => {
    setNavActive(false);
  }, [pathname]);

  // HANDLE NAVBAR VISIBILITY
  const navbarElementTarget = useRef<HTMLDivElement>(null); // navbar element
  const navbarHiderTarget = useRef<HTMLDivElement>(null); // if this target is visible, hide navbar
  useEffect(() => {
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

    const observer = new IntersectionObserver(handleIntersect);
    observer.observe(navbarHiderTarget.current as Element);

    return () => observer.disconnect();
  }, []);

  // Mobile menu links: home, the homepage sections, then the contact page.
  const mobileLinks = [
    { label: 'home', href: '/', scroll: false },
    ...subpagesList.map(name => ({
      label: name,
      href: `#${name}`,
      scroll: true,
    })),
    { label: 'contact', href: '/contact', scroll: false },
  ];

  const isCurrent = (label: string) =>
    label === 'home' ? pathname === '/' : pathname === `/${label}`;

  return (
    <>
      <nav
        ref={navbarElementTarget}
        className={`w-screen h-auto pt-safe-top top-0 fixed bg-[#FCFCFC] hover:!opacity-100 border-b border-solid font-normal duration-300 select-none z-10 ${
          navActive
            ? '!opacity-100 border-transparent lg:border-gray-200'
            : 'border-gray-200'
        }`}
      >
        {/* NAVBAR FOR DEFAULT (sm - md) VIEWPORT */}
        <div className="relative z-20 flex lg:hidden px-4 py-4 items-center touch-none">
          <Link className="flex w-fit h-full gap-2 items-center" href="/">
            <div className="w-8 h-8 relative">
              <Image
                src={SmallLogoImage}
                alt="logo"
                priority={true}
                className="object-scale-down"
              />
            </div>
          </Link>
          <div className="w-8 h-8 ml-auto">
            <NavBarMenuButton getter={navActive} setter={setNavActive} />
          </div>
        </div>

        {/* MOBILE MENU: always mounted so it can animate in and out. */}
        <div
          id="mobile-nav-menu"
          aria-hidden={!navActive}
          className={`mobile-nav-overlay ${navActive ? 'open' : ''}`}
        >
          <div aria-hidden="true" className="mobile-nav-glow" />

          <ul className="relative mt-6 flex flex-col">
            {mobileLinks.map(({ label, href, scroll }, i) => (
              <li
                key={label}
                className="mobile-nav-item"
                style={{ '--i': i } as React.CSSProperties}
              >
                <Link
                  href={href}
                  className={`block w-fit py-2.5 text-[28px] font-bold capitalize tracking-tight transition-colors ${
                    isCurrent(label)
                      ? 'text-kcc-theme'
                      : 'text-slate-900 active:text-kcc-theme'
                  }`}
                  onClick={e => {
                    // Unlock before scrolling so the page can move to the section.
                    document.documentElement.style.overflow = '';
                    setNavActive(false);
                    if (scroll) handleScroll(e);
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="mobile-nav-item relative mt-auto pt-10"
            style={{ '--i': mobileLinks.length } as React.CSSProperties}
          >
            {recruitmentOpen ? (
              <Link
                href={recruitmentLink}
                target="_blank"
                className="flex w-full justify-center rounded-xl bg-kcc-theme py-3.5 text-base font-semibold text-white transition-colors active:bg-kcc-theme-darker"
              >
                Join UTKCC
              </Link>
            ) : (
              <span
                aria-disabled="true"
                title="준비 중이에요"
                className="flex w-full cursor-not-allowed justify-center rounded-xl bg-kcc-theme py-3.5 text-base font-semibold text-white opacity-40"
              >
                Join UTKCC
              </span>
            )}
            <p className="mt-6 text-center text-[13px] font-semibold leading-snug tracking-[0.03em] text-slate-400">
              University of Toronto
              <br />
              Korean Commerce Community
            </p>
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
            {recruitmentOpen ? (
              <Link
                href={recruitmentLink}
                target="_blank"
                className="py-2 px-5 rounded-lg capitalize text-white bg-kcc-theme text-opacity-90 hover:text-opacity-100 hover:bg-kcc-theme-darker"
              >
                join
              </Link>
            ) : (
              <span
                aria-disabled="true"
                title="준비 중이에요"
                className="py-2 px-5 rounded-lg capitalize text-white bg-kcc-theme cursor-not-allowed select-none opacity-50"
              >
                join
              </span>
            )}
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
    <button
      id="menu-button"
      type="button"
      aria-label={navActive ? '메뉴 닫기' : '메뉴 열기'}
      aria-expanded={navActive}
      aria-controls="mobile-nav-menu"
      className={`navbar-button ${navActive ? 'active' : ''}`}
      onClick={() => {
        setNavActive(!navActive);
      }}
    >
      <span />
      <span />
    </button>
  );
}
