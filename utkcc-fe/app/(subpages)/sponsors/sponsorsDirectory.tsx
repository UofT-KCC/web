'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  sponsorCategories,
  sponsorData,
  SponsorCategory,
} from '@/data/sponsors-data';
import {
  ArrowUpRightIcon,
  FlipIcon,
  InstagramIcon,
  PinIcon,
} from './sponsorIcons';

type Sponsor = (typeof sponsorData)[number];
type Filter = SponsorCategory | 'all';

const categoryDots: Record<SponsorCategory, string> = {
  dining: 'bg-amber-400',
  cafe: 'bg-rose-400',
  bar: 'bg-indigo-400',
};

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: '전체' },
  ...(Object.keys(sponsorCategories) as SponsorCategory[]).map(key => ({
    key,
    label: sponsorCategories[key],
  })),
];

export default function SponsorsDirectory() {
  const [filter, setFilter] = useState<Filter>('all');
  const visible =
    filter === 'all'
      ? sponsorData
      : sponsorData.filter(sponsor => sponsor.category === filter);

  return (
    <section aria-label="제휴 매장 목록" className="mt-14 lg:mt-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="카테고리 필터"
        >
          {filters.map(({ key, label }) => {
            const count =
              key === 'all'
                ? sponsorData.length
                : sponsorData.filter(sponsor => sponsor.category === key)
                    .length;
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/20 ${
                  active
                    ? 'bg-kcc-theme text-white shadow-sm shadow-kcc-theme/30'
                    : 'bg-white text-slate-500 ring-1 ring-inset ring-slate-200 hover:text-kcc-theme hover:ring-kcc-theme/30'
                }`}
              >
                {key !== 'all' && (
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${categoryDots[key]}`}
                  />
                )}
                {label}
                <span
                  className={`tabular-nums ${active ? 'text-white/60' : 'text-slate-300'}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div key={filter} className="mt-6 grid gap-4 sm:gap-5 xl:grid-cols-2">
        {visible.map((sponsor, index) => (
          <SponsorDetailCard
            key={sponsor.name}
            sponsor={sponsor}
            delay={index * 60}
            priority={index < 4}
          />
        ))}
      </div>
    </section>
  );
}

// Rendered as a perforated coupon: the main section holds the partner's
// details, the stub on the right holds the links. The notches are cut with a
// CSS mask (.sponsor-ticket in globals.css), which also draws the outline
// around them; the shadow sits on each unmasked face (.sponsor-face).
function SponsorDetailCard({
  sponsor,
  delay,
  priority,
}: {
  sponsor: Sponsor;
  delay: number;
  priority: boolean;
}) {
  const {
    name,
    exp,
    category,
    imageSrc,
    websiteUrl,
    locationUrl,
    discount,
    benefitNote,
    address,
  } = sponsor;
  const isInstagram = websiteUrl.includes('instagram.com');
  const [flipped, setFlipped] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  // Keep keyboard focus and screen readers on the visible side only.
  useEffect(() => {
    if (frontRef.current) frontRef.current.inert = flipped;
    if (backRef.current) backRef.current.inert = !flipped;
  }, [flipped]);

  // Clicking anywhere on the ticket flips it, except on its links.
  const flipFromClick = (event: React.MouseEvent) => {
    if ((event.target as Element).closest('a, button')) return;
    setFlipped(value => !value);
  };

  return (
    <div
      className="sponsor-ticket-frame min-w-0 animate-[menu-panel-in_520ms_cubic-bezier(0.22,1,0.36,1)_backwards] motion-reduce:animate-none [@media(hover:hover)]:hover:-translate-y-0.5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="sponsor-flip" data-flipped={flipped}>
        {/* Front. Phones: the stub is a tear-off strip along the bottom.
            sm and up: the stub sits on the right. */}
        <div
          ref={frontRef}
          onClick={flipFromClick}
          className="sponsor-face group cursor-pointer"
        >
          <div className="sponsor-ticket flex h-full min-w-0 flex-col rounded-lg bg-white sm:flex-row">
            <div className="flex min-w-0 flex-1 items-center gap-4 p-3.5 sm:gap-5 sm:p-3">
              <div className="relative aspect-square w-[88px] shrink-0 overflow-hidden rounded-lg bg-[#f7f8fa] ring-1 ring-black/5 sm:w-28">
                <Image
                  src={imageSrc}
                  alt={`${name} 로고`}
                  fill
                  sizes="(min-width: 640px) 112px, 88px"
                  priority={priority}
                  className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-xs font-bold text-slate-400 sm:text-[11px]">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${categoryDots[category]}`}
                  />
                  {sponsorCategories[category]}
                </p>
                <h3 className="mt-1 text-lg font-bold leading-tight tracking-tight text-slate-950 sm:truncate sm:text-xl">
                  {name}
                </h3>
                <p className="mt-1 text-sm leading-snug text-slate-500 sm:mt-0.5 sm:line-clamp-1 sm:text-[13px]">
                  {exp}
                </p>
                <button
                  type="button"
                  onClick={() => setFlipped(true)}
                  aria-label={`${name} 멤버십 혜택 보기`}
                  className="mt-2 inline-flex items-center gap-1 rounded-full text-[11px] font-bold text-kcc-theme transition-colors hover:text-kcc-theme-darker focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(5,60,140,0.2)]"
                >
                  <FlipIcon />
                  혜택 보기
                </button>
              </div>
            </div>

            <div className="relative flex h-14 shrink-0 items-center justify-between px-4 sm:h-auto sm:w-[120px] sm:flex-col sm:justify-center sm:gap-2.5 sm:px-0">
              <span
                aria-hidden="true"
                className="absolute inset-x-3 top-0 border-t-[1.5px] border-dashed border-slate-200 sm:inset-x-auto sm:inset-y-3 sm:left-0 sm:border-l-[1.5px] sm:border-t-0"
              />
              <MemberLabel />
              <div className="flex gap-2 sm:gap-1.5">
                <TicketLink
                  href={websiteUrl}
                  label={`${name} ${isInstagram ? '인스타그램' : '웹사이트'} 열기`}
                  text={isInstagram ? 'Instagram' : '웹사이트'}
                >
                  {isInstagram ? (
                    <InstagramIcon className="h-4 w-4" />
                  ) : (
                    <ArrowUpRightIcon className="h-4 w-4" />
                  )}
                </TicketLink>
                <TicketLink
                  href={locationUrl}
                  label={`${name} 위치 보기`}
                  text="지도"
                >
                  <PinIcon className="h-4 w-4" />
                </TicketLink>
              </div>
            </div>
          </div>
        </div>

        {/* Back: the member benefit. */}
        <div
          ref={backRef}
          onClick={flipFromClick}
          className="sponsor-face sponsor-face-back cursor-pointer"
        >
          <div className="sponsor-ticket flex h-full flex-col rounded-lg bg-kcc-theme text-white sm:flex-row">
            <div className="flex min-w-0 flex-1 items-center gap-5 px-5 py-3.5 sm:gap-6 sm:px-6">
              {discount ? (
                <>
                  <p className="shrink-0 leading-none">
                    <span className="block text-5xl font-bold tracking-tight sm:text-6xl">
                      {discount}
                    </span>
                    <span className="mt-1 block text-sm font-bold tracking-[0.3em] text-white/70">
                      OFF
                    </span>
                  </p>
                  <div className="min-w-0 border-l border-white/20 pl-5 sm:pl-6">
                    <p className="text-[11px] font-bold tracking-[0.16em] text-white/60">
                      {name.toUpperCase()}
                    </p>
                    {benefitNote && (
                      <p className="mt-1 break-keep text-sm font-bold sm:text-[15px]">
                        {benefitNote}
                      </p>
                    )}
                    {address && (
                      <Link
                        href={locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 text-xs text-white/75 underline-offset-4 hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                      >
                        <PinIcon className="h-3.5 w-3.5" />
                        {address}
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <div className="min-w-0">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-white/60">
                    {name.toUpperCase()}
                  </p>
                  <p className="mt-1 text-lg font-bold sm:text-xl">
                    혜택 정보 준비 중
                  </p>
                  <p className="mt-1 break-keep text-xs text-white/70">
                    곧 업데이트될 예정이에요
                  </p>
                </div>
              )}
            </div>

            <div className="relative flex h-14 shrink-0 items-center justify-between px-4 sm:h-auto sm:w-[120px] sm:flex-col sm:justify-center sm:gap-3 sm:px-0">
              <span
                aria-hidden="true"
                className="absolute inset-x-3 top-0 border-t-[1.5px] border-dashed border-white/25 sm:inset-x-auto sm:inset-y-3 sm:left-0 sm:border-l-[1.5px] sm:border-t-0"
              />
              <MemberLabel inverted />
              <button
                type="button"
                onClick={() => setFlipped(false)}
                aria-label={`${name} 티켓 앞면으로 돌아가기`}
                className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/15 px-3.5 text-xs font-bold text-white transition hover:bg-white hover:text-kcc-theme focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              >
                <FlipIcon />
                돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MemberLabel({ inverted = false }: { inverted?: boolean }) {
  return (
    <p className="leading-none sm:text-center">
      <span
        className={`block text-[9px] font-bold tracking-[0.28em] ${
          inverted ? 'text-white/60' : 'text-slate-400'
        }`}
      >
        UTKCC
      </span>
      <span
        className={`mt-1 block text-[11px] font-bold tracking-[0.16em] ${
          inverted ? 'text-white' : 'text-kcc-theme'
        }`}
      >
        MEMBER
      </span>
    </p>
  );
}

// Labelled pill on phones, icon-only circle from sm up (the label stays as
// the accessible name and tooltip).
function TicketLink({
  href,
  label,
  text,
  children,
}: {
  href: string;
  label: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#eef2f8] px-3.5 text-xs font-bold text-kcc-theme transition hover:bg-kcc-theme hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(5,60,140,0.2)] sm:w-9 sm:px-0"
    >
      {children}
      <span className="sm:hidden">{text}</span>
    </Link>
  );
}
