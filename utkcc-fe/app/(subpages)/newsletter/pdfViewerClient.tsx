'use client';

import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/components/pdfViewer'), {
  ssr: false,
});

export default function PdfViewerClient({ fileUrl }: { fileUrl: string }) {
  return <PdfViewer fileUrl={fileUrl} />;
}
