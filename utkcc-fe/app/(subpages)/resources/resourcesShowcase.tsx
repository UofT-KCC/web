'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  studyPackageSeason,
  visiblePricing,
  regularPurchaseReminder,
  noteTemplateAddOn,
  individualCourseTiers,
  rotmanPackageTiers,
  rsmAssignmentHelper,
  PackageTier,
} from '@/data/study-package-data';

const courseMapOrderForm = 'https://forms.gle/Pfpnsi2QbAFQoBNN9';
const studyPackageInquiryLink =
  'https://docs.google.com/forms/d/e/1FAIpQLSflNDJzGPK2-ODnNtDWMNevMpBqjLEHBjbrqG1NkWqOCH9hjA/viewform';

type ResourceView = 'course-map' | 'study-package';

export default function ResourcesShowcase() {
  const [view, setView] = useState<ResourceView>('course-map');

  return (
    <section
      className="w-full max-w-[1040px] py-4 sm:-mt-6 lg:-mt-[79px]"
      aria-label="UTKCC 코스맵 및 족보"
    >
      <div className="flex justify-center sm:justify-start">
        <div
          role="tablist"
          aria-label="자료 선택"
          className="inline-flex rounded-full bg-slate-100 p-1 ring-1 ring-inset ring-slate-200/70"
        >
          <ViewToggleButton
            active={view === 'course-map'}
            onClick={() => setView('course-map')}
          >
            코스맵
          </ViewToggleButton>
          <ViewToggleButton
            active={view === 'study-package'}
            onClick={() => setView('study-package')}
          >
            족보
          </ViewToggleButton>
        </div>
      </div>

      <div
        key={view}
        className="mt-8 animate-[menu-panel-in_260ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:animate-none"
      >
        {view === 'course-map' ? <CourseMapPanel /> : <StudyPackagePanel />}
      </div>
    </section>
  );
}

function ViewToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ease-out ${
        active
          ? 'bg-white text-kcc-theme shadow-sm'
          : 'text-slate-400 hover:text-kcc-theme'
      }`}
    >
      {children}
    </button>
  );
}

function CourseMapPanel() {
  return (
    <div className="grid items-start gap-10 sm:grid-cols-[minmax(315px,1.08fr)_minmax(285px,.92fr)] sm:gap-12 lg:gap-16">
      <div className="relative min-h-[440px] sm:min-h-[500px]">
        <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-kcc-theme/[0.055] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 aspect-[0.79] w-[94%] max-w-[390px] -translate-x-1/2 -translate-y-1/2">
          <div className="course-map-sheet-stack course-map-sheet-1 absolute inset-0 overflow-hidden rounded-[3px] bg-white shadow-[0_25px_55px_-20px_rgba(3,40,100,.38)] ring-1 ring-black/10">
            <Image
              src="/assets/images/resources/course-map-cover.png"
              alt="UTKCC Course Map 표지"
              fill
              sizes="(min-width: 640px) 230px, 72vw"
              className="object-contain"
              priority
            />
          </div>
          <div className="course-map-sheet-stack course-map-sheet-2 absolute inset-0 overflow-hidden rounded-[3px] bg-white shadow-[0_25px_55px_-18px_rgba(3,40,100,.34)] ring-1 ring-black/10">
            <Image
              src="/assets/images/resources/course-map-rsm100.jpg"
              alt="RSM100 Course Map 미리보기"
              fill
              sizes="(min-width: 640px) 230px, 72vw"
              className="object-contain"
              priority
            />
          </div>
          <div className="course-map-sheet-stack course-map-sheet-3 absolute inset-0 overflow-hidden rounded-[3px] bg-white shadow-[0_25px_55px_-18px_rgba(3,40,100,.3)] ring-1 ring-black/10">
            <Image
              src="/assets/images/resources/course-map-eco101.jpg"
              alt="ECO101 Course Map 미리보기"
              fill
              sizes="(min-width: 640px) 230px, 72vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col py-2 sm:min-h-[470px] sm:py-5">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">UTKCC</p>
            <h2 className="mt-1 text-4xl font-bold leading-[0.88] tracking-[-0.055em] text-kcc-theme sm:text-5xl">
              Course<br />Map
            </h2>
          </div>
          <div className="shrink-0 rounded-2xl bg-kcc-theme/[0.07] px-5 py-4 text-center shadow-[0_14px_30px_-22px_rgba(5,60,140,.55)] ring-1 ring-inset ring-kcc-theme/15">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-kcc-theme/60">Price</p>
            <p className="mt-1 text-4xl font-bold leading-none tracking-[-0.06em] text-kcc-theme">$5</p>
          </div>
        </div>

        <p className="mt-7 max-w-sm break-keep text-[13px] leading-[1.75] text-slate-600">
          선배들의 실제 수강 경험을 바탕으로 과목 난이도, 평가 방식, 교수진과 시험
          정보를 한눈에 확인할 수 있어요.
        </p>

        <div className="mt-7 space-y-3">
          <Feature number="80+" label="과목 및 교수진 리뷰" />
          <Feature icon={<ReviewIcon />} label="학생들이 직접 전하는 수강 후기" />
          <Feature icon={<ExamIcon />} label="평가 방식과 시험 구성 인사이트" />
        </div>

        <div className="mt-auto pt-7">
          <Link
            href={courseMapOrderForm}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-between rounded-full bg-kcc-theme px-5 py-3 text-sm font-bold text-white shadow-sm shadow-kcc-theme/25 transition hover:-translate-y-0.5 hover:bg-kcc-theme-darker hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/20"
          >
            구매 문의하기
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRightIcon />
            </span>
          </Link>
          <p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
            구매 신청 Google Form으로 연결됩니다
          </p>
        </div>
      </div>
    </div>
  );
}

const studyPackageTierOptions = [
  { key: 'half', label: '한 학기 과목', tier: individualCourseTiers[0] },
  { key: 'year', label: '한 해 과목', tier: individualCourseTiers[1] },
  { key: 'first-year', label: '1학년 패키지', tier: rotmanPackageTiers[0] },
  { key: 'second-year', label: '2학년 패키지', tier: rotmanPackageTiers[1] },
  { key: 'combined', label: '1·2학년 통합', tier: rotmanPackageTiers[2] },
  { key: 'helper', label: '과제 도우미', tier: rsmAssignmentHelper },
];

// TODO: swap in the real cover art once the files are added at
// /public/assets/images/resources/study-package/<code>.png — see BookletCover below.
const studyPackageCoverCodes = ['AST101', 'CSC108', 'ECO101', 'MAT133'];

function StudyPackagePanel() {
  const [selectedKey, setSelectedKey] = useState(studyPackageTierOptions[0].key);
  const selected =
    studyPackageTierOptions.find(option => option.key === selectedKey) ??
    studyPackageTierOptions[0];
  const showAddOn = selectedKey === 'half' || selectedKey === 'year';

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(220px,0.78fr)_minmax(340px,1.22fr)] lg:gap-14">
      <StudyPackageCoverStack />

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">UTKCC</p>
        <h2 className="mt-1 text-3xl font-bold leading-[0.95] tracking-[-0.03em] text-kcc-theme sm:text-4xl">
          Study Package
        </h2>
        <p className="mt-3 max-w-md break-keep text-[13px] leading-[1.7] text-slate-600">
          필요한 범위만 골라 담는 시험 대비 자료예요. 아래에서 원하는 패키지를
          선택해 보세요.
        </p>

        <div
          role="tablist"
          aria-label="패키지 선택"
          className="mt-5 flex flex-wrap gap-2"
        >
          {studyPackageTierOptions.map(option => (
            <button
              key={option.key}
              type="button"
              role="tab"
              aria-selected={option.key === selectedKey}
              onClick={() => setSelectedKey(option.key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                option.key === selectedKey
                  ? 'bg-kcc-theme text-white shadow-sm shadow-kcc-theme/30'
                  : 'bg-slate-50 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-100 hover:text-kcc-theme'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div
          key={selectedKey}
          className="mt-5 animate-[menu-panel-in_220ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:animate-none"
        >
          <PackageCard tier={selected.tier} />
          {showAddOn && (
            <div className="mt-4">
              <AddOnBanner />
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link
            href={studyPackageInquiryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-between rounded-full bg-kcc-theme px-5 py-3 text-sm font-bold text-white shadow-sm shadow-kcc-theme/25 transition hover:-translate-y-0.5 hover:bg-kcc-theme-darker hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/20"
          >
            족보 구매 문의하기
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRightIcon />
            </span>
          </Link>
          <p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
            {regularPurchaseReminder}
          </p>
        </div>
      </div>
    </div>
  );
}

const STACK_PEEK_PX = 18;
const STACK_AUTO_ADVANCE_MS = 4500;

function StudyPackageCoverStack() {
  const [order, setOrder] = useState(
    studyPackageCoverCodes.map((_, i) => i),
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cycleToBack = () => {
    setOrder(prev => [...prev.slice(1), prev[0]]);
  };

  const bringToFront = (depth: number) => {
    if (depth === 0) {
      cycleToBack();
      return;
    }
    setOrder(prev => {
      const next = [...prev];
      const [picked] = next.splice(depth, 1);
      next.unshift(picked);
      return next;
    });
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    timerRef.current = setInterval(cycleToBack, STACK_AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const restartAutoAdvance = () => {
    if (!timerRef.current) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(cycleToBack, STACK_AUTO_ADVANCE_MS);
  };

  const cardCount = studyPackageCoverCodes.length;

  return (
    <div className="mx-auto w-full max-w-[240px]">
      <div
        className="relative w-full"
        style={{
          paddingBottom: `calc(100% / 0.7 + ${(cardCount - 1) * STACK_PEEK_PX}px)`,
        }}
      >
        {order.map((coverIndex, depth) => (
          <button
            key={studyPackageCoverCodes[coverIndex]}
            type="button"
            onClick={() => {
              bringToFront(depth);
              restartAutoAdvance();
            }}
            aria-label={
              depth === 0
                ? `${studyPackageCoverCodes[coverIndex]} 표지, 다음 표지 보기`
                : `${studyPackageCoverCodes[coverIndex]} 표지를 앞으로 가져오기`
            }
            className="absolute inset-x-0 top-0 aspect-[0.7] origin-top overflow-hidden rounded-[14px] text-left shadow-[0_20px_45px_-22px_rgba(3,40,100,.4)] ring-1 ring-black/10 transition-[transform,box-shadow,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-kcc-theme"
            style={{
              transform: `translate3d(0, ${depth * STACK_PEEK_PX}px, 0) scale(${1 - depth * 0.02})`,
              zIndex: cardCount - depth,
              opacity: depth === 0 ? 1 : 1 - depth * 0.1,
            }}
          >
            <BookletCover code={studyPackageCoverCodes[coverIndex]} />
            {depth === 0 && (
              <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-1 text-[9px] font-bold tracking-wide text-white backdrop-blur-sm">
                다음 보기
                <ArrowUpRightIcon className="h-2.5 w-2.5 rotate-90" />
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {studyPackageCoverCodes.map((code, i) => (
          <button
            key={code}
            type="button"
            aria-label={`${code} 표지 보기`}
            onClick={() => {
              bringToFront(order.indexOf(i));
              restartAutoAdvance();
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              order[0] === i ? 'w-5 bg-kcc-theme' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-[11px] font-semibold tracking-[0.08em] text-slate-400">
        {studyPackageSeason} · UTKCC STUDY PACKAGE
      </p>
    </div>
  );
}

function BookletCover({ code }: { code: string }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-kcc-theme to-kcc-theme-darker px-5 py-6 text-center text-white">
      <div className="pointer-events-none absolute inset-[9px] rounded-[4px] border border-white/25" />

      <span className="relative inline-flex items-center rounded-full border border-white/50 px-3.5 py-1 text-[9px] font-bold tracking-[0.15em]">
        {studyPackageSeason}
      </span>

      <div className="relative flex flex-col items-center gap-2.5">
        <p className="text-xl font-extrabold tracking-tight">UTKCC</p>
        <p className="text-sm font-extrabold tracking-tight">STUDY PACKAGE</p>
        <span className="h-px w-8 bg-white/50" />
        <p className="text-[8px] font-semibold tracking-[0.1em] text-white/75">
          총 정리 · 시험 대비 핵심 자료
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-2">
        <span className="inline-flex items-center justify-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold tracking-wide">
          {code}
        </span>
        <p className="max-w-[85%] text-[6.5px] font-medium leading-tight tracking-[0.02em] text-white/50">
          University of Toronto Korean Commerce Community
        </p>
      </div>
    </div>
  );
}

function PackageCard({ tier }: { tier: PackageTier }) {
  return (
    <div className="rounded-[22px] border border-slate-200/70 bg-white p-6 shadow-[0_18px_46px_-30px_rgba(5,60,140,0.45)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          {tier.badge && (
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-kcc-theme/60">{tier.badge}</p>
          )}
          <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">{tier.title}</h3>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {visiblePricing(tier.pricing).map(price => (
            <div key={price.label} className="rounded-xl bg-kcc-theme/[0.06] px-3.5 py-2.5 text-center ring-1 ring-inset ring-kcc-theme/10">
              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-kcc-theme/55">{price.label}</p>
              <p className="text-base font-bold text-kcc-theme">{price.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {tier.courses.map(course => (
          <span key={course} className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-inset ring-slate-200/80">
            {course}
          </span>
        ))}
      </div>

      {tier.footnote && (
        <p className="mt-5 border-t border-slate-100 pt-4 text-[11px] leading-relaxed text-slate-400">{tier.footnote}</p>
      )}
    </div>
  );
}

function AddOnBanner() {
  return (
    <div className="flex flex-col gap-3 rounded-[18px] border border-slate-200/70 bg-white p-4 shadow-[0_10px_28px_-22px_rgba(5,60,140,0.4)] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-kcc-theme/55">
          Optional add-on
        </p>
        <p className="mt-0.5 text-[13px] font-bold text-slate-800">
          {noteTemplateAddOn.title}
        </p>
        <p className="mt-0.5 max-w-sm text-[11px] leading-relaxed text-slate-500">
          {noteTemplateAddOn.description}
        </p>
      </div>

      <div className="flex shrink-0 gap-2">
        {visiblePricing(noteTemplateAddOn.pricing).map(price => (
          <div
            key={price.label}
            className="rounded-lg bg-kcc-theme/[0.06] px-3 py-1.5 text-center ring-1 ring-inset ring-kcc-theme/10"
          >
            <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-kcc-theme/50">
              {price.label}
            </p>
            <p className="text-sm font-bold text-kcc-theme">{price.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Feature({
  number,
  icon,
  label,
}: {
  number?: string;
  icon?: ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="flex w-8 shrink-0 items-center text-xs font-bold tabular-nums text-kcc-theme">
        {icon ?? number}
      </span>
      <span className="text-xs font-medium text-slate-600">{label}</span>
    </div>
  );
}

function ArrowUpRightIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`fill-none ${className}`} stroke="currentColor" strokeWidth="1.7">
      <path d="M5 15 15 5M7 5h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 8h10" />
      <path d="M7 12h6" />
      <path d="M8 18H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-4l-4 3v-3Z" />
    </svg>
  );
}

function ExamIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5h6" />
      <path d="M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1Z" />
      <path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <path d="m8 13 2 2 4-5" />
      <path d="M8 18h8" />
    </svg>
  );
}

