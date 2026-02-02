'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type Lang = 'ko' | 'en';

type ChatMsg = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ts: number;
};

type SourceLink = {
  title: string;
  url: string;
};

export type ChatWindowProps = {
  open: boolean;
  lang: Lang;
  onClose: () => void;
  onLangChange: (lang: Lang) => void;

  initialMessages?: ChatMsg[];

  suggestionsKo?: string[];
  suggestionsEn?: string[];

  sources?: SourceLink[];

  onRequestReply?: (args: { message: string; lang: Lang }) => Promise<{ answer: string; sources?: SourceLink[] }>;
};

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function hasHangul(text: string) {
  return /[\uAC00-\uD7A3]/.test(text);
}

function hasLatinLetters(text: string) {
  return /[A-Za-z]/.test(text);
}

function renderBoldInline(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    const [full, inner] = match;
    const start = match.index;

    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }

    parts.push(
      <strong key={`b-${start}`} style={{ fontWeight: 800 }}>
        {inner}
      </strong>
    );

    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function renderWithBoldAndNewlines(text: string) {
  const lines = String(text ?? '').split('\n');
  return lines.map((line, idx) => (
    <React.Fragment key={idx}>
      {renderBoldInline(line)}
      {idx < lines.length - 1 ? <br /> : null}
    </React.Fragment>
  ));
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`Request failed: ${res.status} ${msg}`);
  }

  return (await res.json()) as T;
}

export default function ChatWindow({
  open,
  lang,
  onClose,
  onLangChange,
  initialMessages,
  suggestionsKo,
  suggestionsEn,
  sources,
  onRequestReply,
}: ChatWindowProps) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [localSources, setLocalSources] = useState<SourceLink[] | undefined>(sources);

  const [messages, setMessages] = useState<ChatMsg[]>(() => {
    if (initialMessages?.length) return initialMessages;
    return [
      {
        id: uid(),
        role: 'assistant',
        content:
          '안녕하세요! UTKCC 도우미 Kacy에요! 궁금한 걸 물어보면 사이트에서 찾기 쉬운 링크랑 같이 안내해드릴게요 🙂',
        ts: Date.now(),
      },
    ];
  });

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const suggestions = useMemo(() => {
    const fallbackKo = [
      '이번 학기 이벤트는 어디서 확인해요?',
      'UTKCC 가입/참여는 어떻게 해요?',
      '후원(스폰서십) 문의는 어디로 하면 돼요?',
      '회장단/디렉터에게 익명으로 요청할 수 있나요?',
    ];
    const fallbackEn = [
      'Where can I see events this semester?',
      'How do I join UTKCC?',
      'How do I ask about sponsorship?',
      'Can I send anonymous feedback to the execs?',
    ];

    return lang === 'ko' ? suggestionsKo ?? fallbackKo : suggestionsEn ?? fallbackEn;
  }, [lang, suggestionsKo, suggestionsEn]);

  useEffect(() => {
    if (!open) return;

    const t = setTimeout(() => inputRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isTyping, open]);

  useEffect(() => {
    setLocalSources(sources);
  }, [sources]);

  function pushMessage(msg: Omit<ChatMsg, 'id' | 'ts'>) {
    setMessages((prev) => [...prev, { id: uid(), ts: Date.now(), ...msg }]);
  }

  async function placeholderReply(userText: string, chosenLang: Lang) {
    const effectiveLang: Lang = chosenLang ?? (hasHangul(userText) ? 'ko' : 'en');

    return {
      answer:
        effectiveLang === 'ko'
          ? `“${userText}”`
          : `“${userText}”`,
      sources: undefined,
    };
  }

  async function defaultRequestReply(args: { message: string; lang: Lang }) {
    try {
      return await postJson<{ answer: string; sources?: SourceLink[] }>('/api/chat', args);
    } catch {
      return await placeholderReply(args.message, args.lang);
    }
  }

  async function onSend(text?: string) {
    const t = (text ?? input).trim();
    if (!t || isTyping) return;


    let detectedLang: Lang = lang;
    if (hasHangul(t)) detectedLang = 'ko';
    else if (hasLatinLetters(t)) detectedLang = 'en';

    if (detectedLang !== lang) onLangChange(detectedLang);

    pushMessage({ role: 'user', content: t });
    setInput('');
    setLocalSources(undefined);

    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 200));

    const responder = onRequestReply ?? defaultRequestReply;

    try {
      const res = await responder({ message: t, lang: detectedLang });
      pushMessage({ role: 'assistant', content: res.answer });
      setLocalSources(res.sources);
    } catch {
      pushMessage({
        role: 'assistant',
        content:
          detectedLang === 'ko'
            ? '죄송해요. 지금은 응답을 가져오지 못했어요. 잠시 후 다시 시도해 주세요.'
            : 'Sorry. I couldn’t fetch a reply right now. Please try again in a moment.',
      });
    } finally {
      setIsTyping(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') onSend();
  }

  if (!open) return null;

  return (
    <div style={styles.panel} role="dialog" aria-label="UTKCC Chatbot">
      <style>{`
        @keyframes utkccChatIn {
          from { opacity: 0; transform: translateY(10px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div style={styles.header}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={styles.title}>UTKCC Chatbot</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={styles.langWrap}>
            <button
              type="button"
              onClick={() => onLangChange('ko')}
              style={{ ...styles.langBtn, ...(lang === 'ko' ? styles.langBtnActive : null) }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                if (lang !== 'ko') e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = lang === 'ko' ? '#FFFFFF' : 'rgba(255,255,255,0.14)';
              }}
            >
              한국어
            </button>
            <button
              type="button"
              onClick={() => onLangChange('en')}
              style={{ ...styles.langBtn, ...(lang === 'en' ? styles.langBtnActive : null) }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                if (lang !== 'en') e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = lang === 'en' ? '#FFFFFF' : 'rgba(255,255,255,0.14)';
              }}
            >
              English
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            style={styles.closeBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
            }}
          >
            ×
          </button>
        </div>
      </div>

      <div ref={listRef} style={styles.body}>
        {messages.length <= 1 && (
          <div style={styles.suggestions}>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSend(s)}
                style={styles.suggestionBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.background = 'rgba(4, 60, 140, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(4, 60, 140, 0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(4, 60, 140, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(4, 60, 140, 0.16)';
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{ ...styles.bubble, ...(m.role === 'user' ? styles.bubbleUser : styles.bubbleBot) }}
            >
              {m.role === 'assistant'
                ? renderWithBoldAndNewlines(m.content)
                : m.content.split('\n').map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
            </div>
          ))}

          {isTyping && (
            <div style={{ ...styles.bubble, ...styles.bubbleBot, opacity: 0.85 }}>
              {lang === 'ko' ? '답변 작성 중…' : 'Typing…'}
            </div>
          )}

          {!!localSources?.length && (
            <div style={styles.sourcesWrap}>
              <div style={styles.sourcesTitle}>{lang === 'ko' ? '관련 링크' : 'Relevant links'}</div>
              <div style={styles.sourcesList}>
                {localSources.map((s) => (
                  <a key={`${s.title}-${s.url}`} href={s.url} style={styles.sourceLink}>
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={styles.footer}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={lang === 'ko' ? '메시지를 입력하세요…' : 'Type a message…'}
          style={styles.input}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(4, 60, 140, 0.55)';
            e.currentTarget.style.boxShadow = '0 0 0 4px rgba(4, 60, 140, 0.12)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(11, 27, 58, 0.12)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <button
          type="button"
          onClick={() => onSend()}
          disabled={!input.trim() || isTyping}
          style={{ ...styles.send, ...(!input.trim() || isTyping ? styles.sendDisabled : null) }}
          onMouseEnter={(e) => {
            if (e.currentTarget.getAttribute('data-disabled') === 'true') return;
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.filter = 'brightness(1.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.filter = 'none';
          }}
          data-disabled={(!input.trim() || isTyping) ? 'true' : 'false'}
        >
          {lang === 'ko' ? '전송' : 'Send'}
        </button>
      </div>

      <div style={styles.disclaimer}>
        {lang === 'ko'
          ? '※ 안내는 참고용이에요. 정확한 정보는 공식 공지/Contact를 확인해주세요.'
          : '※ Info may be outdated. Please confirm via official posts / Contact.'}
      </div>
    </div>
  );
}

const UTKCC_BLUE = '#043C8C';
const styles: Record<string, React.CSSProperties> = {
  panel: {
    position: 'fixed',
    right: 18,
    bottom: 84,
    width: 420,
    maxWidth: 'calc(100vw - 36px)',
    height: 620,
    maxHeight: 'calc(100vh - 120px)',
    borderRadius: 18,
    border: '1px solid rgba(4, 60, 140, 0.18)',
    background: '#FFFFFF',
    color: '#0B1B3A',
    zIndex: 9999,
    overflow: 'hidden',
    boxShadow: '0 18px 52px rgba(0,0,0,0.22)',
    display: 'flex',
    flexDirection: 'column',
    animation: 'utkccChatIn 220ms ease-out',
    transformOrigin: 'bottom right',
  },
  header: {
    padding: '14px 16px 12px',
    borderBottom: '1px solid rgba(255,255,255,0.18)',
    background: UTKCC_BLUE,
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 800,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.92,
  },
  langWrap: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  langBtn: {
    padding: '8px 12px',
    minWidth: 74,
    height: 34,
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.32)',
    background: 'rgba(255,255,255,0.14)',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    opacity: 0.92,
    whiteSpace: 'nowrap',
    lineHeight: '18px',
    transition: 'transform 140ms ease, background 140ms ease, opacity 140ms ease',
  },
  langBtnActive: {
    background: '#FFFFFF',
    color: UTKCC_BLUE,
    border: '1px solid rgba(255,255,255,0.65)',
    opacity: 1,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.32)',
    background: 'rgba(255,255,255,0.12)',
    color: '#FFFFFF',
    fontSize: 20,
    cursor: 'pointer',
    lineHeight: '34px',
    transition: 'transform 140ms ease, background 140ms ease, opacity 140ms ease',
  },
  body: {
    padding: 16,
    overflowY: 'auto',
    flex: 1,
    background: '#FFFFFF',
  },
  suggestions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  suggestionBtn: {
    border: '1px solid rgba(4, 60, 140, 0.16)',
    background: 'rgba(4, 60, 140, 0.05)',
    color: '#0B1B3A',
    borderRadius: 999,
    padding: '9px 12px',
    fontSize: 12,
    cursor: 'pointer',
    transition: 'transform 140ms ease, background 140ms ease, border-color 140ms ease',
  },
  bubble: {
    padding: '11px 12px',
    borderRadius: 16,
    lineHeight: 1.45,
    fontSize: 13,
    whiteSpace: 'pre-wrap',
  },
  bubbleBot: {
    alignSelf: 'flex-start',
    background: '#F5F7FB',
    border: '1px solid rgba(11, 27, 58, 0.08)',
    color: '#0B1B3A',
    maxWidth: '92%',
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    background: UTKCC_BLUE,
    border: '1px solid rgba(4, 60, 140, 0.35)',
    color: '#FFFFFF',
    maxWidth: '92%',
  },
  sourcesWrap: {
    marginTop: 4,
    padding: '10px 12px',
    borderRadius: 16,
    border: '1px solid rgba(4, 60, 140, 0.14)',
    background: 'rgba(4, 60, 140, 0.04)',
    maxWidth: '92%',
  },
  sourcesTitle: {
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 8,
    color: '#0B1B3A',
  },
  sourcesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  },
  sourceLink: {
    fontSize: 12,
    color: UTKCC_BLUE,
    textDecoration: 'underline',
  },
  footer: {
    padding: 12,
    borderTop: '1px solid rgba(11, 27, 58, 0.08)',
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    background: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    border: '1px solid rgba(11, 27, 58, 0.12)',
    background: '#FFFFFF',
    color: '#0B1B3A',
    padding: '0 12px',
    outline: 'none',
    fontSize: 13,
    transition: 'border-color 140ms ease, box-shadow 140ms ease',
  },
  send: {
    height: 44,
    padding: '0 16px',
    borderRadius: 14,
    border: '1px solid rgba(4, 60, 140, 0.25)',
    background: UTKCC_BLUE,
    color: '#FFFFFF',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 800,
    transition: 'transform 140ms ease, filter 140ms ease, opacity 140ms ease',
  },
  sendDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  disclaimer: {
    padding: '0 14px 14px',
    fontSize: 11,
    color: '#0B1B3A',
    opacity: 0.65,
    background: '#FFFFFF',
  },
};
