'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Marks <html data-navigating> as soon as an internal link to another page is
// clicked, so CSS can run the top progress bar and fade the outgoing page
// (see "Page transitions" in globals.css). The incoming page's entrance is
// handled by the route group templates.
export default function NavigationProgress() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.navigating !== 'true') return;

    root.dataset.navigating = 'done';
    const timer = setTimeout(() => delete root.dataset.navigating, 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    let fallback: ReturnType<typeof setTimeout> | undefined;

    const onClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = (event.target as Element | null)?.closest('a');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) {
        return;
      }

      const url = new URL(link.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname === window.location.pathname
      ) {
        return;
      }

      root.dataset.navigating = 'true';
      // Never leave the page dimmed if a navigation fails or is cancelled.
      clearTimeout(fallback);
      fallback = setTimeout(() => delete root.dataset.navigating, 8000);
    };

    // Capture phase: next/link calls preventDefault() in its own click handler,
    // which would otherwise run first.
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      clearTimeout(fallback);
    };
  }, []);

  return <div className="navigation-progress" aria-hidden="true" />;
}
