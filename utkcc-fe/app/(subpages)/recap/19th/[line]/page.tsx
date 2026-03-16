'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { RECAP_19TH_LINES } from '@/data/recap19';
import { AnimatePresence, motion } from 'framer-motion';

const RecapPdfViewer = dynamic(() => import('@/components/recapPdfViewer'), {
  ssr: false,
});

const SEASON_COLORS: Record<string, string> = {
  spring: '#FFD500', // Line 1 Yellow
  summer: '#009A44', // Line 2 Green
  fall: '#0072CE', // Line 3 Blue
  winter: '#6F2DA8', // Line 4 Purple
};

export default function Recap19thViewer() {
  const params = useParams();
  const rawLine = params?.line;
  const line = (Array.isArray(rawLine) ? rawLine[0] : rawLine) ?? '';

  const router = useRouter();
  const searchParams = useSearchParams();

  const config = useMemo(() => {
    return RECAP_19TH_LINES.find((l) => l.key === line) ?? null;
  }, [line]);

  const fileUrl = config?.pdfPath ?? '';
  const MIN_PAGE = config?.pageStart ?? 1;
  const MAX_PAGE = config?.pageEnd ?? 1;
  const themeColor = SEASON_COLORS[line] ?? '#0F172A';

  const parsePageFromUrl = () => {
    const p = Number(searchParams.get('page'));
    if (!Number.isFinite(p)) return MIN_PAGE;
    if (p < MIN_PAGE || p > MAX_PAGE) return MIN_PAGE;
    return p;
  };

  const [currentPage, setCurrentPage] = useState<number>(parsePageFromUrl());

  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalMs, setIntervalMs] = useState(2500); // 2.5s default

  const navigateToPage = (p: number) => {
    const clamped = Math.min(Math.max(MIN_PAGE, p), MAX_PAGE);
    if (!config) return;
    router.replace(`/recap/19th/${config.key}?page=${clamped}`, { scroll: false });
  };

  useEffect(() => {
    if (!config) return;
    setIsPlaying(false);
    setCurrentPage(MIN_PAGE);
    router.replace(`/recap/19th/${config.key}?page=${MIN_PAGE}`, { scroll: false });
  }, [line]);

  useEffect(() => {
    if (!config) return;
    setCurrentPage(parsePageFromUrl());
  }, [searchParams]);

  // safe page
  const safePage = Math.min(Math.max(MIN_PAGE, currentPage), MAX_PAGE);

  const goPrev = () => {
    const next = safePage === MIN_PAGE ? MAX_PAGE : safePage - 1;
    navigateToPage(next);
  };
  const goNext = () => {
    const next = safePage === MAX_PAGE ? MIN_PAGE : safePage + 1;
    navigateToPage(next);
  };

  const jumpTo = (p: number) => navigateToPage(p);

  const stationsSorted = useMemo(() => {
    const arr = [...(config?.stations ?? [])];
    arr.sort((a, b) => a.page - b.page);
    return arr;
  }, [config?.stations]);

  const progressIndex = useMemo(() => {
    if (stationsSorted.length === 0) return 0;
    let idx = 0;
    for (let i = 0; i < stationsSorted.length; i++) {
      if (stationsSorted[i].page <= safePage) idx = i;
    }
    return idx;
  }, [stationsSorted, safePage]);

  const activeStationKey = stationsSorted[progressIndex]?.key ?? null;

  const pageKey = `${config?.key ?? 'unknown'}-${safePage}`;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        setIsPlaying((v) => !v);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [safePage, MIN_PAGE, MAX_PAGE, config?.key]);

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      goNext();
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [isPlaying, intervalMs, safePage, MIN_PAGE, MAX_PAGE, config?.key]);

  if (!config) {
    return (
      <main className="w-full px-4 lg:px-32 py-16">
        <h1 className="text-xl font-semibold">Invalid line</h1>
        <p className="mt-2 text-gray-600">/recap/19th 로 돌아가서 line을 다시 선택하세요.</p>
        <Link className="mt-6 inline-block underline underline-offset-4" href="/recap/19th">
          ← Back to Entry
        </Link>
      </main>
    );
  }

  return (
    <main className="w-full px-4 lg:px-32 py-6 lg:py-10">
      {/* PROGRESS LINE */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl">
          {(() => {
            const n = Math.max(1, stationsSorted.length);

            const dotLeftPct = (i: number) => ((i + 0.5) / n) * 100;

            const fillPct = ((progressIndex + 1) / n) * 100;

            return (
              <>
                <div className="relative h-3">
                  {/* base */}
                  <div
                    className="absolute inset-0 rounded-full opacity-25"
                    style={{ backgroundColor: themeColor }}
                  />
                  {/* fill */}
                  <div
                    className="absolute left-0 top-0 h-3 rounded-full transition-[width] duration-200 ease-out"
                    style={{ width: `${fillPct}%`, backgroundColor: themeColor }}
                  />
                </div>

                {/* dots */}
                <div className="relative mt-3 h-4">
                  {stationsSorted.map((s, i) => {
                    const isReached = i <= progressIndex;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => jumpTo(s.page)}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${dotLeftPct(i)}%`, top: '50%' }}
                        aria-label={`Jump to ${s.label}`}
                        title={s.label}
                      >
                        <span
                          className={[
                            'block h-3.5 w-3.5 rounded-full border transition-transform duration-150',
                            isReached ? 'scale-110' : 'scale-100',
                          ].join(' ')}
                          style={{
                            backgroundColor: isReached ? themeColor : 'white',
                            borderColor: themeColor,
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* Header controls */}
      <div className="mt-6 flex flex-col gap-4 md:mt-8 md:flex-row md:flex-wrap md:items-center md:justify-between">
        <div>
          <Link className="text-sm text-gray-500 underline underline-offset-4" href="/recap/19th">
            ← Back
          </Link>

          <div className="mt-2 flex items-center gap-3">
            <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: themeColor }} />
            <h1 className="text-xl font-semibold text-kcc-theme">{config.title}</h1>
          </div>

          <p className="mt-1 text-xs text-gray-500 tabular-nums">
            {safePage} / {MAX_PAGE}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50"
            aria-label="Previous page"
            title="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50"
            aria-label="Next page"
            title="Next"
          >
            ›
          </button>

          {/* Presentation Mode */}
          <button
            type="button"
            onClick={() => setIsPlaying((v) => !v)}
            className="ml-2 inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold shadow-sm hover:bg-slate-50"
            style={isPlaying ? { borderColor: themeColor, color: themeColor } : undefined}
            aria-pressed={isPlaying}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <label className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm">
            Speed
            <select
              className="bg-transparent text-sm outline-none"
              value={intervalMs}
              onChange={(e) => setIntervalMs(Number(e.target.value))}
            >
              <option value={1500}>1.5s</option>
              <option value={2000}>2.0s</option>
              <option value={2500}>2.5s</option>
              <option value={3000}>3.0s</option>
              <option value={4000}>4.0s</option>
            </select>
          </label>
        </div>
      </div>

      {/* (4) Mobile-friendly stations UI:
          - Mobile: dropdown
          - Desktop: buttons
      */}
      <div className="mt-5">
        {/* mobile dropdown */}
        <div className="md:hidden">
          <label className="block text-xs text-slate-500 mb-2">Jump to station</label>
          <select
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
            value={activeStationKey ?? ''}
            onChange={(e) => {
              const key = e.target.value;
              const s = stationsSorted.find((x) => x.key === key);
              if (s) jumpTo(s.page);
            }}
          >
            {stationsSorted.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* desktop chips */}
        <div className="hidden md:flex flex-wrap gap-2">
          {stationsSorted.map((s) => {
            const active = activeStationKey === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => jumpTo(s.page)}
                className={[
                  'rounded-full border px-3 py-1 text-xs transition-colors',
                  active ? 'text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                ].join(' ')}
                style={active ? { backgroundColor: themeColor, borderColor: themeColor } : undefined}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-end text-xs text-gray-500">
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-gray-700"
        >
          전체 PDF로 보기
        </a>
      </div>

      {/* PDF: landscape-friendly + fade transition */}
      <div className="mt-4 w-full max-w-5xl mx-auto aspect-[16/9] max-h-[65vh] rounded-3xl border border-slate-200 bg-white shadow-md shadow-slate-200/70 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageKey}
            className="w-full h-full"
            initial={{ opacity: 0.0 }}
            animate={{ opacity: 1.0 }}
            exit={{ opacity: 0.0 }}
            transition={{ duration: 0.18 }}
          >
            <RecapPdfViewer fileUrl={fileUrl} page={safePage} totalPages={MAX_PAGE} />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
