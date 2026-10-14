'use client';

import { useEffect, useRef } from 'react';

type EventsGalleryClipProps = {
  src: string;
  poster: string;
  aspectRatio: string;
  label?: string;
};

// A muted, looping clip that only plays while it is actually visible
// (IntersectionObserver also accounts for the gallery's overflow clipping).
export default function EventsGalleryClip({
  src,
  poster,
  aspectRatio,
  label,
}: EventsGalleryClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let inView = false;
    const sync = () => {
      if (inView && document.visibilityState === 'visible') {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    // Browsers refuse to start video in background tabs, so retry on return.
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-100 shadow-sm">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        aria-hidden={label ? undefined : true}
        className="block h-auto w-full object-cover"
        style={{ aspectRatio }}
      />
      <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
      <svg
        aria-hidden="true"
        viewBox="0 0 10 10"
        className="pointer-events-none absolute right-2.5 top-2.5 h-2 w-2 fill-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
      >
        <path d="M2 1.2v7.6a.5.5 0 0 0 .76.43l6.1-3.8a.5.5 0 0 0 0-.86L2.76.77A.5.5 0 0 0 2 1.2Z" />
      </svg>
    </div>
  );
}
