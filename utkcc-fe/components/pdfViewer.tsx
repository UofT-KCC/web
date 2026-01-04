'use client';

import { useEffect, useRef, useState } from 'react';
import { getDocument, PDFWorker, GlobalWorkerOptions } from 'pdfjs-dist';
// import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url';

// const workerSrc = '/pdf.worker.min.js';
const workerSrc = require('@/public/pdf.worker.min.js').default;

export default function PdfSlider({ fileUrl }: { fileUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null); // 렌더 작업 참조

  const [pdfInstance, setPdfInstance] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const renderPage = async (pageNum: number) => {
    if (!pdfInstance || !canvasRef.current || !containerRef.current) return;

    // 이전 렌더 작업 취소 (있으면)
    if (renderTaskRef.current) {
      await renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    const page = await pdfInstance.getPage(pageNum);

    const containerWidth = containerRef.current.clientWidth;
    const viewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    const canvas = canvasRef.current;
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;

    canvas.style.width = '100%';
    canvas.style.height = 'auto';

    const context = canvas.getContext('2d')!;

    const renderTask = page.render({
      canvasContext: context,
      viewport: scaledViewport,
    });
    renderTaskRef.current = renderTask;

    try {
      await renderTask.promise;
    } catch {}

    renderTaskRef.current = null; // 렌더 완료 후 참조 제거
  };

  useEffect(() => {
    const loadPdf = async () => {
      const worker = new PDFWorker({
        name: 'pdfjs-worker' as unknown as null,
        workerSrc,
      } as any);
      GlobalWorkerOptions.workerPort = worker.port;

      const pdf = await getDocument({ url: fileUrl, worker }).promise;
      setPdfInstance(pdf);
      setNumPages(pdf.numPages);

      renderPage(1);
    };

    loadPdf();
  }, [fileUrl]);

  useEffect(() => {
    if (pdfInstance) {
      renderPage(currentPage);
    }
  }, [currentPage, pdfInstance]);

  const goPrev = () => {
    setCurrentPage(p => (p > 1 ? p - 1 : p));
  };

  const goNext = () => {
    setCurrentPage(p => (p < numPages ? p + 1 : p));
  };

  return (
    <div ref={containerRef} style={{ width: '100%', textAlign: 'center' }}>
      <canvas ref={canvasRef} style={{ border: '1px solid #ccc' }} />
      <div style={{ marginTop: 10 }}>
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          style={{ marginRight: 10 }}
        >
          ◀ Prev
        </button>
        <span>
          {currentPage} / {numPages}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage === numPages}
          style={{ marginLeft: 10 }}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
