'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import groupPhoto from '@/public/assets/images/about/about-hero-group.jpg';
import towerCutout from '@/public/assets/images/about/about-hero-tower.png';

// Full-screen cover hero. It breaks out of the subpage layout's side margins
// and top padding (pt-24 / lg:pt-32) so the photo runs edge to edge, from
// behind the fixed navbar to the bottom of the screen. The photo and title
// share one "scene" layer that opens from a centre slit and zooms out.
//
// Large screens: the title wraps around University College's central tower,
// "UTK" in the sky on its left and "CC" on its right, both tucked slightly
// behind it. A transparent cutout of the tower sits above the letters to hide
// the tucked edges. Everything is positioned in the photo's
// own pixel coordinates (mapped through object-cover / object-top), so the
// tower always lands in the gap whatever the screen shape.
//
// Phones: the portrait crop puts the tower dead centre, so the title sits at
// the bottom over a soft gradient instead.

// Source photo size, measured on the photo. If the photo changes, re-measure
// these and regenerate the tower cutout.
const PHOTO = { width: 2000, height: 1333 };
// The tower's edges where the letters cross it (the title anchors to these).
const TOWER = { left: 997, right: 1195 };
// A transparent PNG of just the tower, cut pixel by pixel from the photo
// (stone vs sky by colour, soft 1px edges). It sits over the letters so they
// disappear exactly along the real stone edge. This is its box in the photo.
const CUTOUT = { x: 975, y: 0, width: 240, height: 380 };
// Title layout in photo pixels.
const TITLE = { top: 171, label: 33, gap: 7, word: 158, tuck: 15 };

type Layout = {
  scale: number;
  towerLeft: number;
  towerRight: number;
  cutout: { left: number; top: number; width: number; height: number };
};

function measure(width: number, height: number): Layout {
  const scale = Math.max(width / PHOTO.width, height / PHOTO.height);
  const offsetX = (width - PHOTO.width * scale) / 2; // object-position x: 50%
  // Photo pixels to screen pixels (object-position y: top, so no y offset).
  const x = (px: number) => offsetX + px * scale;
  return {
    scale,
    towerLeft: x(TOWER.left),
    towerRight: x(TOWER.right),
    cutout: {
      left: x(CUTOUT.x),
      top: CUTOUT.y * scale,
      width: CUTOUT.width * scale,
      height: CUTOUT.height * scale,
    },
  };
}

export default function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const update = () =>
      setLayout(measure(hero.clientWidth, hero.clientHeight));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToStory = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('about-story');
    if (!target) return;
    event.preventDefault();
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };

  const px = (photoPixels: number) =>
    layout ? `${photoPixels * layout.scale}px` : undefined;

  return (
    <div
      ref={heroRef}
      className="about-hero relative -mt-24 ml-[calc(50%-50dvw)] h-[100svh] w-[100dvw] overflow-hidden bg-slate-200 lg:-mt-32"
    >
      <div className="about-hero-scene absolute inset-0 origin-top">
        <Image
          src={groupPhoto}
          alt="University College 앞에서 찍은 UTKCC 단체 사진"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-top"
        />

        {/* Large screens: the title wraps around the tower. */}
        {layout && (
          <div className="hidden lg:block">
            <div
              className="absolute text-left"
              style={{
                right: `calc(100% - ${layout.towerLeft + TITLE.tuck * layout.scale}px)`,
                top: px(TITLE.top),
              }}
            >
              <p
                className="about-hero-line font-bold leading-none text-[#0b2147]"
                style={{ fontSize: px(TITLE.label), animationDelay: '0.7s' }}
              >
                About
              </p>
              <h1
                className="about-hero-line font-bold leading-none tracking-tight text-kcc-theme"
                style={{
                  fontSize: px(TITLE.word),
                  marginTop: px(TITLE.gap),
                  animationDelay: '0.85s',
                }}
              >
                UTK<span className="sr-only">CC</span>
              </h1>
            </div>
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                left: `${layout.towerRight - TITLE.tuck * layout.scale}px`,
                top: px(TITLE.top + TITLE.label + TITLE.gap),
              }}
            >
              <p
                className="about-hero-line font-bold leading-none tracking-tight text-kcc-theme"
                style={{ fontSize: px(TITLE.word), animationDelay: '0.95s' }}
              >
                CC
              </p>
            </div>

            {/* The tower cutout, on top so the letters tuck behind it. */}
            <Image
              src={towerCutout}
              alt=""
              aria-hidden="true"
              unoptimized
              className="pointer-events-none absolute max-w-none select-none"
              style={layout.cutout}
            />
          </div>
        )}

        {/* Phones and tablets: bottom-aligned over a soft gradient. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(3,24,60,0.78)] via-[rgba(3,24,60,0.3)] to-transparent lg:hidden"
        />
        <div className="absolute inset-x-6 bottom-20 text-center lg:hidden">
          <p
            className="about-hero-line text-lg font-bold text-white/80"
            style={{ animationDelay: '0.7s' }}
          >
            About
          </p>
          <h1
            className="about-hero-line mt-1 text-[64px] font-bold leading-none tracking-tight text-white"
            style={{ animationDelay: '0.85s' }}
          >
            UTKCC
          </h1>
        </div>
      </div>

      <a
        href="#about-story"
        onClick={scrollToStory}
        aria-label="아래로 스크롤"
        className="about-hero-caption absolute bottom-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="about-hero-cue h-6 w-6 fill-none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 8 5 5 5-5" />
        </svg>
      </a>
    </div>
  );
}
