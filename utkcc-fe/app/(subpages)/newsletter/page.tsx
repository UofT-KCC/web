'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PageIntro from '@/components/pageIntro';
import { subscribeNewsletterLink } from '@/data/change-annually-data';
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/components/pdfViewer'), {
  ssr: false,
});

export default function Newsletter() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const safePage = Math.min(Math.max(1, page), totalPages);

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const onPrev = () => setPage((p) => Math.max(1, p - 1));
  const onNext = () => setPage((p) => Math.min(totalPages, p + 1));

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
        <>
          바쁜 학업생활 속 놓치고 있던 정보들과 소식들이 있나요?
          <span className="my-3 w-full block" />
          어디서 들어본 것 같은데, 잘 모르겠다 싶은 주제들, 혹은 궁금했는데 찾기
          어려웠던 정보들을 뉴스레터에 담아 쉽고 재밌게 전합니다.
          <span className="my-3 w-full block" />
          이메일 구독으로 KCC 월간 뉴스레터를 간편하게 받아보세요!
          <span className="text-center flex justify-center my-2">
            <Link
              className="text-center px-6 py-2 bg-kcc-theme hover:bg-kcc-theme-darker mt-4 text-white text-opacity-90 hover:text-opacity-100 text-sm w-fit rounded-xl"
              target="_blank"
              rel="noopener noreferrer"
              href={subscribeNewsletterLink}
            >
              뉴스레터 구독하기
            </Link>
          </span>
        </>
      }
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[85%] md:max-w-[75%] lg:max-w-[65%]">
          <div className="overflow-hidden rounded-lg">
            {/* ✅ 페이지 표시/버튼은 Newsletter 페이지에서 유지 */}
            <div className="flex items-center justify-between py-3 text-sm text-gray-700">
              <button
                type="button"
                onClick={onPrev}
                className="px-3 py-1 rounded-md border border-slate-200 hover:bg-slate-50"
              >
                ◀ Prev
              </button>
              <span className="tabular-nums">
                {safePage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={onNext}
                className="px-3 py-1 rounded-md border border-slate-200 hover:bg-slate-50"
              >
                Next ▶
              </button>
            </div>

            <PdfViewer
              fileUrl="/assets/pdf/aug-2025-newsletter.pdf"
              page={safePage}
              onTotalPages={setTotalPages}
            />
          </div>
        </div>
      </div>
    </PageIntro>
  );
}
