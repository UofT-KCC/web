'use client';
import Image from 'next/image';
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
  const fileUrl = '/assets/pdf/newsletter.pdf';

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
        <div className="text-3xl font-bold leading-[1.08] tracking-tight text-black lg:text-6xl">
          우리의 새 소식을
          <span className="block whitespace-nowrap text-kcc-theme">메일함으로</span>
        </div>
      }
      pageExp={
        <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-kcc-gray lg:text-base lg:leading-relaxed">
          <p>
            바쁜 학업 생활 속에서 놓치고 있던 정보들과 소식들이 있나요? 시험, 커리어,
            교내외 활동까지, 한 번에 정리해서 받아보세요.
          </p>
          <p>
            어디선가 들어본 것 같은데 잘 모르겠던 주제들, 혹은 궁금했지만 찾기 어려웠던
            정보들을 KCC 뉴스레터에 담아 쉽고 재밌게 전해 드립니다.
          </p>
          <p>
            이메일 구독으로 KCC 월간 뉴스레터를 가장 빠르게 받아보고, 중요한 정보들을
            놓치지 마세요.
          </p>
          <div className="flex justify-start pt-2">
            <Link
              className="inline-flex w-fit items-center rounded-full bg-kcc-theme px-5 py-2 text-xs font-bold text-white shadow-sm shadow-kcc-theme/40 ring-1 ring-black/5 transition-all duration-300 ease-out hover:bg-white hover:text-kcc-theme hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:ring-kcc-theme/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/30 active:scale-[0.98] lg:px-7 lg:py-3 lg:text-sm"
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
      <section className="w-full space-y-6">
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

        <div className="w-full rounded-3xl border border-slate-200 bg-white shadow-md shadow-slate-200/70 overflow-auto">
          <PdfViewer fileUrl={fileUrl} page={currentPage} />
        </div>
      </section>
    </PageIntro>
  );
}
