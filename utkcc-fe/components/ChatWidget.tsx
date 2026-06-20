'use client';

import React, { useState, useEffect } from 'react';
import ChatWindow from '@/components/ChatWindow';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        name?: string;
      };
    }
  }
}

type Lang = 'ko' | 'en';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('ko');
  const [overFooter, setOverFooter] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    try {
      const savedOpen = localStorage.getItem('kacy:open');
      const savedLang = localStorage.getItem('kacy:lang') as Lang | null;
      if (savedOpen !== null) setOpen(savedOpen === 'true');
      if (savedLang === 'ko' || savedLang === 'en') setLang(savedLang);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('kacy:open', String(open));
      localStorage.setItem('kacy:lang', lang);
    } catch {}
  }, [open, lang]);

  useEffect(() => {
    const footer = document.getElementById('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverFooter(entry.isIntersecting),
      { threshold: 0.05 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMobileNavToggle = (event: Event) => {
      const customEvent = event as CustomEvent<{ open: boolean }>;
      setMobileNavOpen(Boolean(customEvent.detail?.open));
    };

    window.addEventListener('utkcc-mobile-nav-toggle', handleMobileNavToggle);

    return () => {
      window.removeEventListener(
        'utkcc-mobile-nav-toggle',
        handleMobileNavToggle,
      );
    };
  }, []);

  if (mobileNavOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close chat' : 'Open chat'}
        onClick={() => setOpen((v) => !v)}
        style={{
          ...styles.fab,
          ...(overFooter ? styles.fabOnFooter : {}),
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.filter = 'brightness(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.filter = 'none';
        }}
      >
        {open ? '×' : (
          <div suppressHydrationWarning style={{ height: 22 }}>
            <ion-icon
              name="chatbubble-ellipses-outline"
              style={{ fontSize: 22, transform: 'translateY(-1px)' }}
            />
          </div>
        )}
      </button>

      <ChatWindow
        open={open}
        lang={lang}
        onClose={() => setOpen(false)}
        onLangChange={setLang}
      />
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  fab: {
    position: 'fixed',
    right: 30,
    bottom: 29,
    width: 50,
    height: 50,
    borderRadius: 999,
    border: '1px solid rgba(4, 60, 140, 0.35)',
    background: '#043C8C',
    color: 'white',
    fontSize: 22,
    cursor: 'pointer',
    zIndex: 9999,
    boxShadow: '0 12px 30px rgba(4, 60, 140, 0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 140ms ease, box-shadow 140ms ease, filter 140ms ease',
  },
  fabOnFooter: {
    border: '1px solid rgba(255, 255, 255, 0.35)',
    background: '#0A4EA8',
    color: 'white',
    boxShadow: '0 8px 18px rgba(0, 0, 0, 0.12)',
  },
};
