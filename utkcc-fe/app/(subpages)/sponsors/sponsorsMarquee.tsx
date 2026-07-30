'use client';

import { useEffect, useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';

const AUTO_SCROLL_SPEED = 0.045;
const RESUME_DELAY_MS = 900;

export default function SponsorsMarquee({ children }: { children: ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTimestampRef = useRef<number>();
  const resumeTimeoutRef = useRef<number>();
  const scrollPositionRef = useRef(0);
  const isUserScrollingRef = useRef(false);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const tick = (timestamp: number) => {
      if (lastTimestampRef.current === undefined) {
        lastTimestampRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      if (!isUserScrollingRef.current) {
        scrollPositionRef.current += elapsed * AUTO_SCROLL_SPEED;

        const resetPoint = scroller.scrollWidth / 2;
        if (resetPoint > 0 && scrollPositionRef.current >= resetPoint) {
          scrollPositionRef.current -= resetPoint;
        }

        scroller.scrollLeft = scrollPositionRef.current;
      }

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== undefined) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      if (resumeTimeoutRef.current !== undefined) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const pauseForUserScroll = () => {
    const scroller = scrollerRef.current;

    isUserScrollingRef.current = true;

    if (resumeTimeoutRef.current !== undefined) {
      window.clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      if (scroller) {
        scrollPositionRef.current = scroller.scrollLeft;
      }
      isUserScrollingRef.current = false;
      lastTimestampRef.current = undefined;
    }, RESUME_DELAY_MS);
  };

  const pauseForPointerDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.buttons > 0) {
      pauseForUserScroll();
    }
  };

  return (
    <div
      ref={scrollerRef}
      className="sponsor-marquee -mx-1 -my-2 overflow-x-auto overflow-y-hidden px-1 py-2"
      onPointerDown={pauseForUserScroll}
      onPointerMove={pauseForPointerDrag}
      onTouchStart={pauseForUserScroll}
      onTouchMove={pauseForUserScroll}
      onWheel={pauseForUserScroll}
      onKeyDown={pauseForUserScroll}
      tabIndex={0}
    >
      <div className="sponsor-marquee-track flex w-max">{children}</div>
    </div>
  );
}
