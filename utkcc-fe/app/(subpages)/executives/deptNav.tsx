'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Sticky, centred pill of department links under the navbar. Clicking one
 * scrolls to that department; while scrolling, the department in view is
 * highlighted and kept visible in the pill (which scrolls sideways on phones).
 */
export default function DeptNav({
  depts,
}: {
  depts: { id: string; label: string }[];
}) {
  const [activeId, setActiveId] = useState(depts[0]?.id);
  const chipRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  // While a click's smooth scroll is running, the sections it passes must not
  // take the highlight, or the pill flickers through each of them.
  const scrollLock = useRef(false);

  useEffect(() => {
    const sections = depts
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // A section counts as "in view" while it crosses a thin band about a
    // third of the way down the screen.
    const observer = new IntersectionObserver(
      entries => {
        if (scrollLock.current) return;
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [depts]);

  useEffect(() => {
    const chip = activeId ? chipRefs.current[activeId] : null;
    const row = chip?.parentElement?.parentElement;
    if (!chip || !row || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({
      left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2,
      behavior: 'smooth',
    });
  }, [activeId]);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    setActiveId(id);
    history.replaceState(null, '', `#${id}`);

    // Hold the highlight on the clicked department until scrolling has been
    // still for a moment (works whether or not the browser fires scrollend).
    scrollLock.current = true;
    let settle = window.setTimeout(release, 200);
    function release() {
      scrollLock.current = false;
      window.removeEventListener('scroll', onScroll);
      // Settle on whichever section actually sits in the band now.
      const band = window.innerHeight * 0.35;
      const inView = depts
        .map(dept => document.getElementById(dept.id))
        .filter((el): el is HTMLElement => el !== null)
        .filter(el => el.getBoundingClientRect().top <= band)
        .pop();
      setActiveId(inView?.id ?? depts[0]?.id);
    }
    function onScroll() {
      window.clearTimeout(settle);
      settle = window.setTimeout(release, 150);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <nav
      aria-label="Departments"
      className="pointer-events-none sticky top-[calc(64px+env(safe-area-inset-top))] z-[5] -mx-4 mt-8 flex justify-center bg-gradient-to-b from-white via-white/80 to-white/0 px-4 py-3 lg:top-[68px] lg:mx-0 lg:mt-12 lg:px-0"
    >
      <div className="menu-scrollbar-hidden pointer-events-auto relative max-w-full overflow-x-auto rounded-full bg-white/90 p-1 shadow-[0_10px_30px_-18px_rgba(5,60,140,0.45)] ring-1 ring-slate-200/80 backdrop-blur-md">
        <div className="flex w-max items-center gap-0.5 text-xs font-semibold lg:text-[13px]">
          {depts.map(({ id, label }) => (
            <a
              key={id}
              ref={el => {
                chipRefs.current[id] = el;
              }}
              href={`#${id}`}
              onClick={event => handleClick(event, id)}
              aria-current={id === activeId ? 'true' : undefined}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 capitalize transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(5,60,140,0.3)] ${
                id === activeId
                  ? 'bg-kcc-theme text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-kcc-theme'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
