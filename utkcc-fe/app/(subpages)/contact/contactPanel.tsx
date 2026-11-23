'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  kccEmail,
  presEmail,
  vicePresEmail,
  erDirectorEmail,
  joinMemberShipLink,
} from '@/data/change-annually-data';
import { execData } from '@/data/executives-data';

type Contact = {
  role: string;
  email: string;
  name?: string;
  imageSrc?: string;
};

type Topic = {
  id: string;
  label: string;
  // Second line of the page headline: 궁금한 건 / {headline}
  headline: string;
  heading: string;
  description: string;
  subject: string;
  contacts: Contact[];
};

const president = execData.find(e => e.position === 'president');
const vicePresident = execData.find(e => e.position === 'vice president');

export const topics: Topic[] = [
  {
    id: 'general',
    label: '일반 문의',
    headline: '운영진에게',
    heading: '행사, 멤버십, 그 밖의 모든 것',
    description:
      '어떤 내용이든 괜찮아요. 운영진이 함께 확인하고 가장 빠르게 답해드려요.',
    subject: '[UTKCC 문의] ',
    contacts: [{ role: 'UTKCC 운영진', email: kccEmail }],
  },
  {
    id: 'sponsor',
    label: '후원 · 파트너십',
    headline: '후원팀에게',
    heading: '함께할 기업과 단체를 찾고 있어요',
    description:
      '스폰서십, 협업 행사, 파트너십 제안은 Corporate Relations 팀이 담당해요. 회사·단체명과 제안 내용을 함께 적어주세요.',
    subject: '[UTKCC 후원·파트너십] ',
    contacts: [{ role: 'Corporate Relations 팀', email: erDirectorEmail }],
  },
  {
    id: 'presidents',
    label: '회장단',
    headline: '회장단에게',
    heading: '회장단에게 직접 연락하기',
    description:
      'UTKCC 운영 전반에 관한 문의나 제안은 회장단에게 직접 보내주세요.',
    subject: '[UTKCC 회장단 문의] ',
    contacts: [
      {
        role: '회장',
        email: presEmail,
        name: president?.name,
        imageSrc: president?.imageSrc,
      },
      {
        role: '부회장',
        email: vicePresEmail,
        name: vicePresident?.name,
        imageSrc: vicePresident?.imageSrc,
      },
    ],
  },
];

export default function ContactPanel({
  activeId,
  onSelect: setActiveId,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const active = topics.find(t => t.id === activeId) ?? topics[0];

  return (
    <section aria-label="문의하기" className="text-left">
      <p className="text-xs font-semibold text-slate-500">누구에게 보낼까요?</p>
      <div
        role="tablist"
        aria-label="문의 종류"
        className="mt-3 flex flex-wrap gap-2"
      >
        {topics.map(topic => {
          const selected = topic.id === activeId;
          return (
            <button
              key={topic.id}
              type="button"
              role="tab"
              id={`tab-${topic.id}`}
              aria-selected={selected}
              aria-controls={`panel-${topic.id}`}
              onClick={() => setActiveId(topic.id)}
              className={`rounded-full px-3.5 py-2 text-[13px] font-semibold sm:px-4 sm:text-sm transition focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/20 ${
                selected
                  ? 'bg-kcc-theme text-white shadow-sm shadow-kcc-theme/30'
                  : 'border border-slate-200 bg-white/70 text-slate-600 hover:border-kcc-theme/40 hover:text-kcc-theme'
              }`}
            >
              {topic.label}
            </button>
          );
        })}
      </div>

      <div
        key={active.id}
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className="mt-6 animate-[contact-fade_300ms_ease-out] rounded-2xl border border-black/[0.06] bg-white/70 p-5 backdrop-blur-sm sm:p-8"
      >
        <h2 className="break-keep text-2xl font-bold tracking-tight text-slate-950 sm:text-[1.75rem]">
          {active.heading}
        </h2>
        <p className="mt-3 break-keep text-sm leading-relaxed text-slate-500">
          {active.description}
        </p>

        <ul className="mt-7 divide-y divide-slate-200/80 border-t border-slate-200/80">
          {active.contacts.map(contact => (
            <ContactRow
              key={contact.email}
              contact={contact}
              subject={active.subject}
            />
          ))}
        </ul>

        {active.id === 'general' && (
          <p className="mt-6 break-keep text-xs text-slate-500">
            멤버십 가입은{' '}
            <Link
              href={joinMemberShipLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-kcc-theme underline-offset-2 hover:underline"
            >
              가입 폼
            </Link>
            에서 바로 할 수 있어요.
          </p>
        )}
      </div>

      <p className="mt-5 break-keep text-xs text-slate-400">
        가능하다면 UofT 이메일로 보내주세요. 학생 신분 확인에 도움이 돼요.
      </p>

      <style>{`@keyframes contact-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }`}</style>
    </section>
  );
}

function legacyCopy(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

function ContactRow({
  contact,
  subject,
}: {
  contact: Contact;
  subject: string;
}) {
  const [copied, setCopied] = useState<'ok' | 'fail' | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied('ok');
    } catch {
      // Clipboard API is blocked in some in-app browsers; fall back to execCommand.
      setCopied(legacyCopy(contact.email) ? 'ok' : 'fail');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 2000);
  };

  return (
    <li className="flex flex-col gap-4 py-5">
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        {contact.imageSrc ? (
          <Image
            src={contact.imageSrc}
            alt=""
            width={48}
            height={48}
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 sm:h-12 sm:w-12 ring-black/5"
          />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef3fa] ring-1 ring-black/5 sm:h-12 sm:w-12">
            <Image
              src="/assets/images/big-logo.png"
              alt=""
              width={28}
              height={28}
              className="h-6 w-6 sm:h-7 sm:w-7"
            />
          </span>
        )}
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-500">
            {contact.role}
            {contact.name && (
              <span className="ml-1.5 text-slate-900">{contact.name}</span>
            )}
          </p>
          <p className="mt-0.5 text-sm font-semibold tracking-[-0.01em] text-slate-900 [overflow-wrap:anywhere] sm:text-lg">
            {/* allow a line break only right after the @ */}
            {contact.email.split('@')[0]}@<wbr />
            {contact.email.split('@')[1]}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 gap-2 sm:pl-16">
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-w-[5.5rem] items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-kcc-theme/40 hover:text-kcc-theme focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/20"
        >
          <span aria-live="polite">
            {copied === 'ok'
              ? '복사됨 ✓'
              : copied === 'fail'
                ? '복사 실패'
                : '이메일 복사'}
          </span>
        </button>
        <a
          href={`mailto:${contact.email}?subject=${encodeURIComponent(subject)}`}
          className="inline-flex items-center justify-center gap-1 rounded-full bg-kcc-theme px-4 py-2 text-xs font-semibold text-white transition hover:bg-kcc-theme-darker focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/25"
        >
          메일 보내기
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5 fill-none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              d="M5 15 15 5M7 5h8v8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </li>
  );
}
