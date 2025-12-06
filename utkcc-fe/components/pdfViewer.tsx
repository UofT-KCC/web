'use client';

import { useEffect, useRef } from 'react';
import { getDocument, PDFWorker, GlobalWorkerOptions } from 'pdfjs-dist';
// import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url';

// const workerSrc = '/pdf.worker.min.js';
const workerSrc = require('@/public/pdf.worker.min.js').default;

export default function PdfSlider({
  fileUrl,
  page,
}: {
  fileUrl: string;
  page: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null); // 렌더 작업 참조

  const pdfInstanceRef = useRef<any>(null);

  const renderPage = async (pageNum: number) => {
    const pdfInstance = pdfInstanceRef.current;
    if (!pdfInstance || !canvasRef.current || !containerRef.current) return;

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
      pdfInstanceRef.current = pdf;

      renderPage(page);
    };

    loadPdf();
  }, [fileUrl, page]);

  useEffect(() => {
    renderPage(page);
  }, [page]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}
