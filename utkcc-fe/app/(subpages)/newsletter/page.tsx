'use client';
import { useState } from 'react';
import Link from 'next/link';
import PageIntro from '@/components/pageIntro';
import { subscribeNewsletterLink } from '@/data/change-annually-data';
import dynamic from 'next/dynamic';

// SSR에서는 pdfjs가 window 객체를 필요로 하니, dynamic import로 처리
const PdfViewer = dynamic(() => import('@/components/pdfViewer'), {
  ssr: false,
});

export default function Newsletter() {
  const TOTAL_PAGES = 22;
  const fileUrl = '/assets/pdf/aug-2025-newsletter.pdf';

  const [currentPage, setCurrentPage] = useState(1);

  const goPrev = () => {
    setCurrentPage(prev => (prev <= 1 ? TOTAL_PAGES : prev - 1));
  };

  const goNext = () => {
    setCurrentPage(prev => (prev >= TOTAL_PAGES ? 1 : prev + 1));
  };

  return (
    <PageIntro
      pageName="newsletter"
      pageSlogan={
        <>
          매달 우리의 새로운 소식을
          <br /> 당신의 메일함으로
        </>
      }
      pageExp={
        <div className="space-y-5 text-base leading-relaxed text-gray-700 max-w-2xl">
          <p>
            바쁜 학업 생활 속에서 놓치고 있던 정보들과 소식들이 있나요? 시험,
            커리어, 교내외 활동까지, 한 번에 정리해서 받아보세요.
          </p>
          <p>
            어디선가 들어본 것 같은데 잘 모르겠던 주제들, 혹은 궁금했지만 찾기
            어려웠던 정보들을 KCC 뉴스레터에 담아 쉽고 재밌게 전해 드립니다.
          </p>
          <p>
            이메일 구독으로 KCC 월간 뉴스레터를 가장 빠르게 받아보고, 중요한
            정보들을 놓치지 마세요.
          </p>
          <div className="flex justify-start pt-2">
            <Link
              className="inline-flex items-center rounded-full bg-kcc-theme px-7 py-3 text-sm font-medium text-white text-opacity-90 shadow-sm shadow-kcc-theme/40 transition hover:-translate-y-0.5 hover:bg-kcc-theme-darker hover:text-opacity-100 hover:shadow-md"
              target="_blank"
              rel="noopener noreferrer"
              href={subscribeNewsletterLink}
            >
              뉴스레터 구독하기
            </Link>
          </div>
        </div>
      }
    >
      <section className="flex-start md:-mt-7 w-full space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-kcc-theme/70">
              Latest issue
            </p>
            <h2 className="mt-1 text-lg font-semibold text-kcc-theme">
              2025년 8월 뉴스레터
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span>
                {currentPage} / {TOTAL_PAGES}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex h-12 w-12 text-xl items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50 hover:text-gray-800"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-12 w-12 text-xl items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50 hover:text-gray-800"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end text-xs text-gray-500">
          <Link
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-gray-700"
          >
            전체 PDF로 보기
          </Link>
        </div>

        <div className="w-full aspect-[1/1.414] rounded-3xl border border-slate-200 bg-white shadow-md shadow-slate-200/70 overflow-auto">
          <PdfViewer fileUrl={fileUrl} page={currentPage} />
        </div>
      </section>
    </PageIntro>
  );
}
