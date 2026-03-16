'use client';

import { useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

type Props = {
  fileUrl: string;
  page: number;        
  totalPages: number;
  onPrev?: () => void;
  onNext?: () => void;
  onTotalPages?: (n: number) => void;
};

export default function RecapPdfViewer({
  fileUrl,
  page,
  totalPages,
  onPrev,
  onNext,
  onTotalPages,
}: Props) {
  const [numPages, setNumPages] = useState<number>(Math.max(1, totalPages || 1));

  const safePage = useMemo(() => {
    const max = Math.max(1, numPages || totalPages || 1);
    return Math.min(Math.max(1, page), max);
  }, [page, numPages, totalPages]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Document
        file={fileUrl}
        loading={<div className="text-sm text-gray-500 py-10">PDF 불러오는 중...</div>}
        error={
          <div className="text-sm text-red-600 py-10">
            PDF 로드 실패 (경로/worker 확인 필요)
            <div className="mt-2 text-xs text-gray-500">{fileUrl}</div>
          </div>
        }
        onLoadSuccess={({ numPages: n }) => {
          setNumPages(n);
          onTotalPages?.(n);
        }}
      >
        <Page pageNumber={safePage} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>

      {(onPrev || onNext) && (
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-700">
          <button
            type="button"
            onClick={onPrev}
            className="px-3 py-1 rounded-md border border-slate-200 hover:bg-slate-50"
          >
            ◀ Prev
          </button>
          <span className="tabular-nums">
            {safePage} / {Math.max(numPages, totalPages, 1)}
          </span>
          <button
            type="button"
            onClick={onNext}
            className="px-3 py-1 rounded-md border border-slate-200 hover:bg-slate-50"
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
