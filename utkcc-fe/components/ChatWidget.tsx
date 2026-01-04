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

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close chat' : 'Open chat'}
        onClick={() => setOpen((v) => !v)}
        style={styles.fab}
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
          <ion-icon
            name="chatbubble-ellipses-outline"
            style={{ fontSize: 22, transform: 'translateY(-1px)' }}
          />
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
};
