'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SocialIcon, socialLinks } from '@/components/footerContactInfo';
import ContactPanel, { topics } from './contactPanel';

// Owns the selected recipient so the headline can follow the tab.
export default function ContactSection() {
  const [activeId, setActiveId] = useState(topics[0].id);
  const active = topics.find(t => t.id === activeId) ?? topics[0];

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-6 lg:px-10 lg:pb-32 lg:pt-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0">
        {/* intro */}
        <header className="text-left lg:col-start-1 lg:row-start-1 lg:pt-4">
          <p className="text-xl font-bold capitalize text-kcc-theme">Contact</p>
          <h1 className="mt-5 break-keep text-[2.5rem] font-bold leading-[1.08] tracking-tight text-black lg:text-6xl">
            궁금한 건
            <span className="block whitespace-nowrap">
              <span
                key={active.id}
                className="inline-block animate-[menu-panel-in_260ms_cubic-bezier(0.22,1,0.36,1)] text-kcc-theme motion-reduce:animate-none"
              >
                {active.headline}
              </span>
            </span>
          </h1>
          <p className="mt-6 max-w-md break-keep text-sm leading-relaxed text-kcc-gray lg:text-base">
            행사, 멤버십, 후원까지. 받는 사람을 고르면 가장 잘 답해줄 담당자를
            알려드려요.
          </p>
        </header>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ContactPanel activeId={activeId} onSelect={setActiveId} />
        </div>

        {/* other channels: below the panel on mobile, under the intro on desktop */}
        <div className="max-w-md border-t border-slate-200 pt-6 text-left lg:col-start-1 lg:row-start-2 lg:mt-10 lg:self-start">
          <p className="text-xs font-semibold text-slate-500">
            이메일 대신 DM이 편하다면
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {socialLinks.map(social => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-kcc-theme/40 hover:text-kcc-theme focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/20"
                >
                  <SocialIcon name={social.icon} />
                  {social.label}
                  <span className="sr-only">(새 탭에서 열림)</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
