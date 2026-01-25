'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/components/pdfViewer'), { ssr: false });

type LineKey = 'spring' | 'summer' | 'fall' | 'winter';

const RECAP_19TH: Record<
  LineKey,
  { totalPages: number; fileUrl: string; title: string }
> = {
  spring: { totalPages: 24, fileUrl: '/assets/pdf/project.pdf', title: '19th Recap — Spring' },
  summer: { totalPages: 24, fileUrl: '/assets/pdf/project.pdf', title: '19th Recap — Summer' },
  fall: { totalPages: 24, fileUrl: '/assets/pdf/project.pdf', title: '19th Recap — Fall' },
  winter: { totalPages: 24, fileUrl: '/assets/pdf/project.pdf', title: '19th Recap — Winter' },
};

export default function Recap19thViewer() {
  const params = useParams();
  const rawLine = params?.line;
  const line = (Array.isArray(rawLine) ? rawLine[0] : rawLine) as string;

  const config = useMemo(() => {
    if (line === 'spring' || line === 'summer' || line === 'fall' || line === 'winter') {
      return RECAP_19TH[line];
    }
    return null;
  }, [line]);

  if (!config) {
    return (
      <main className="px-4 lg:px-32 py-16">
        <h1 className="text-xl font-semibold">Invalid line</h1>
        <p className="mt-2 text-gray-600">/recap/19th 로 돌아가서 line을 다시 선택하세요.</p>
        <Link className="mt-6 inline-block underline underline-offset-4" href="/recap/19th">
          ← Back to Entry
        </Link>
      </main>
    );
  }

  const TOTAL_PAGES = config.totalPages;
  const fileUrl = config.fileUrl;

  const [currentPage, setCurrentPage] = useState(1);

  const goPrev = () => setCurrentPage((p) => (p <= 1 ? TOTAL_PAGES : p - 1));
  const goNext = () => setCurrentPage((p) => (p >= TOTAL_PAGES ? 1 : p + 1));

  return (
    <main className="px-4 lg:px-32 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link className="text-sm text-gray-500 underline underline-offset-4" href="/recap/19th">
            ← Back
          </Link>
          <h1 className="mt-2 text-xl font-semibold text-kcc-theme">{config.title}</h1>
          <p className="mt-1 text-xs text-gray-500">
            {currentPage} / {TOTAL_PAGES}
          </p>
        </div>

        {/* 위 화살표 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50"
          >
            ›
          </button>
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

      <div className="mt-4 w-full aspect-[1/1.414] rounded-3xl border border-slate-200 bg-white shadow-md shadow-slate-200/70 overflow-hidden">
        {/* 아래(Prev/Next 텍스트) 화살표 + PDF */}
        <PdfViewer
          fileUrl={fileUrl}
          page={currentPage}
          totalPages={TOTAL_PAGES}
          onPrev={goPrev}
          onNext={goNext}
          showControls={true}
        />
      </div>
    </main>
  );
}
