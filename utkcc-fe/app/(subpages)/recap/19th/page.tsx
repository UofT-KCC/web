'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RECAP_19TH_LINES, type Recap19thLine } from '@/data/recap19';

// Season -> TTC line color theme
const SEASON_COLORS: Record<string, string> = {
  spring: '#FFD500', // Line 1 Yellow
  summer: '#009A44', // Line 2 Green
  fall: '#0072CE', // Line 3 Blue
  winter: '#6F2DA8', // Line 4 Purple
};

const TTC_LINE_HINT: Record<string, string> = {
  spring: 'Line 1',
  summer: 'Line 2',
  fall: 'Line 3',
  winter: 'Line 4',
};

export default function Recap19thEntryPage() {
  const router = useRouter();

  const lines = useMemo(() => RECAP_19TH_LINES.slice(), []);

  const startRide = (line: Recap19thLine) => {
    const startPage = line.pageStart ?? 1;
    router.push(`/recap/19th/${line.key}?page=${startPage}`);
  };

  return (
    <main className="w-full px-4 lg:px-32 py-12">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-sm text-gray-500 underline underline-offset-4">
              ← Home
            </Link>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900">
              18/19th Recap TTC Timeline
            </h1>
            <p className="mt-2 text-sm text-slate-600">노선을 선택하면 “여행”이 시작됩니다.</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {lines.map((line) => {
            const themeColor = SEASON_COLORS[line.key] ?? '#0F172A';
            const stations = (line.stations ?? []).slice(0, 4);
            const n = Math.max(1, stations.length);

            const dotLeftPct = (i: number) => {
              if (n === 1) return 50;
              return (i / (n - 1)) * 100;
            };

            return (
              <motion.button
                key={line.key}
                type="button"
                onClick={() => startRide(line)}
                whileHover={{
                  scale: 1.01,
                  boxShadow: `0 22px 60px -35px ${themeColor}`,
                }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="relative text-left rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={
                  {
                    '--tw-ring-color': themeColor,
                  } as React.CSSProperties
                }
              >
                {/* subtle hover wash */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ backgroundColor: themeColor }}
                        aria-hidden="true"
                      />
                      <span className="text-xs font-medium text-slate-600">
                        {TTC_LINE_HINT[line.key] ?? 'Line'}
                      </span>
                    </div>

                    <h2 className="mt-2 text-lg font-semibold text-slate-900">{line.title}</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      4 Stations • Click to ride
                    </p>
                  </div>

                  <span
                    className="shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: `${themeColor}1A`,
                      color: themeColor,
                    }}
                  >
                    {line.label}
                  </span>
                </div>

                {/* TTC map-like graphic */}
                <div className="mt-6">
                  {/* shared element for Entry -> Viewer */}
                  <motion.div
                    layoutId={`ttc-line-${line.key}`}
                    className="relative h-3 rounded-full overflow-hidden"
                    style={{
                      backgroundColor: `${themeColor}26`,
                      filter: `drop-shadow(0 10px 20px ${themeColor}2E)`,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      initial={false}
                      whileHover={{ opacity: 1 }}
                      style={{
                        backgroundColor: themeColor,
                        opacity: 0.55,
                      }}
                    />
                  </motion.div>

                  {/* dots + labels */}
                  <div className="relative mt-4 h-10">
                    {stations.map((s, i) => (
                      <div
                        key={s.key}
                        className="absolute -translate-x-1/2"
                        style={{ left: `${dotLeftPct(i)}%`, top: 0 }}
                      >
                        <div
                          className="h-4 w-4 rounded-full border-2 bg-white"
                          style={{ borderColor: themeColor }}
                        />
                        <div className="mt-2 text-xs text-slate-600 whitespace-nowrap text-center">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <span
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: themeColor }}
                  >
                    Start →
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
