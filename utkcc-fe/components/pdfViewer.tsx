'use client';

import { useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

const workerSrc = '/pdf.worker.min.js';

type Props = {
  fileUrl: string;
  page: number;
  onTotalPages?: (n: number) => void;
};

export default function PdfViewer({ fileUrl, page, onTotalPages }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);
  const pdfInstanceRef = useRef<any>(null);

  const renderPage = async (pageNum: number) => {
    const pdfInstance = pdfInstanceRef.current;
    if (!pdfInstance || !canvasRef.current || !containerRef.current) return;

    if (renderTaskRef.current) {
      try {
        await renderTaskRef.current.cancel();
      } catch {}
      renderTaskRef.current = null;
    }

    const pdfPage = await pdfInstance.getPage(pageNum);

    const containerWidth = containerRef.current.clientWidth || 1;
    const viewport = pdfPage.getViewport({ scale: 1 });
    const scale = containerWidth / viewport.width;
    const scaledViewport = pdfPage.getViewport({ scale });

    const canvas = canvasRef.current;
    canvas.width = Math.floor(scaledViewport.width);
    canvas.height = Math.floor(scaledViewport.height);

    canvas.style.width = '100%';
    canvas.style.height = 'auto';

    const context = canvas.getContext('2d');
    if (!context) return;

    const renderTask = pdfPage.render({
      canvasContext: context,
      viewport: scaledViewport,
    });

    renderTaskRef.current = renderTask;

    try {
      await renderTask.promise;
    } catch {}

    renderTaskRef.current = null;
  };

  useEffect(() => {
    let cancelled = false;

    const loadPdf = async () => {
      GlobalWorkerOptions.workerSrc = workerSrc;

      const pdf = await getDocument(fileUrl).promise;
      if (cancelled) return;

      pdfInstanceRef.current = pdf;
      onTotalPages?.(pdf.numPages);

      const safe = Math.min(Math.max(1, page), pdf.numPages);
      renderPage(safe);
    };

    loadPdf();

    return () => {
      cancelled = true;
    };
  }, [fileUrl]);

  useEffect(() => {
    const pdf = pdfInstanceRef.current;
    if (!pdf) return;

    const safe = Math.min(Math.max(1, page), pdf.numPages || 1);
    renderPage(safe);
  }, [page]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}
