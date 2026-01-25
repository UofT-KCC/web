'use client';

type Props = {
  fileUrl: string;
  page: number;        // 1-indexed
  totalPages: number;  // 외부에서 관리 (24 같은 값)
  onPrev: () => void;
  onNext: () => void;
  showControls?: boolean;
};

/**
 * pdfjs/react-pdf 없이 "브라우저 내장 PDF 뷰어"로 렌더링.
 * page 이동은 URL hash(#page=)로 처리.
 */
export default function PdfViewer({
  fileUrl,
  page,
  totalPages,
  onPrev,
  onNext,
  showControls = true,
}: Props) {
  // Chrome/Safari 모두 대체로 동작: /file.pdf#page=3
  const viewerUrl = `${fileUrl}#page=${page}`;

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="w-full flex-1">
        {/* object가 가장 안정적. 안 되면 embed로 fallback */}
        <object
          key={viewerUrl} // page 바뀔 때 강제 리로드
          data={viewerUrl}
          type="application/pdf"
          className="w-full h-full"
        >
          <embed src={viewerUrl} type="application/pdf" className="w-full h-full" />
        </object>
      </div>

      {showControls && (
        <div className="mt-4 flex items-center justify-center gap-4 text-lg font-semibold">
          <button type="button" onClick={onPrev}>
            ◀ Prev
          </button>
          <span className="tabular-nums">
            {page} / {totalPages}
          </span>
          <button type="button" onClick={onNext}>
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
