'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  kccEmail,
  presEmail,
  vicePresEmail,
  erDirectorEmail,
} from '@/data/change-annually-data';

import Image from 'next/image';
import icon3 from '@/app/icon3.png';

export default function ContactPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyEmail = async (email: string) => {
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
        setToastMessage('Email copied to clipboard');
      } else {
        setToastMessage('Clipboard not available on this browser');
      }
    } catch (err) {
      setToastMessage('Failed to copy email');
    }

    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 flex justify-start items-start">
      <section className="w-full max-w-5xl px-10 py-24 text-left flex flex-col items-start space-y-20">
        <header className="w-full flex flex-col items-start text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-kcc-theme/70">
            Contact
          </p>

          <h1 className="relative mt-6 text-5xl font-bold leading-tight text-gray-900 sm:text-7xl">
            Say hello to{' '}
            <span className="relative inline-block">
              <span className="relative z-5 text-kcc-theme">UTKCC</span>
              <span className="pointer-events-none absolute inset-x-[-4px] bottom-1 h-3 rounded-md bg-kcc-theme/10" />
            </span>
            <Image
              src={icon3}
              alt="UTKCC logo"
              className="absolute -right-10 top-1/4 w-31 -translate-y-1/2 opacity-30 pointer-events-none select-none"
            />
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
            행사, 멤버십, 후원 등 UTKCC와 관련해 궁금한 점이 있으신가요? 아래
            담당자에게 편하게 문의를 남겨주세요!
          </p>
        </header>

        <div className="mt-10 space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-start">
            <PrimaryButton href={`mailto:${kccEmail}`}>
              General inquiries
            </PrimaryButton>
            <SecondaryButton href={`mailto:${erDirectorEmail}`}>
              Sponsor inquiries
            </SecondaryButton>
          </div>

          <div className="h-px w-16 bg-gray-200" />

          <div className="grid max-w-4xl gap-8 text-sm sm:grid-cols-2">
            <ContactCard
              label="General"
              email={kccEmail}
              onCopy={handleCopyEmail}
            />
            <ContactCard
              label="President"
              email={presEmail}
              onCopy={handleCopyEmail}
            />
            <ContactCard
              label="Vice-President"
              email={vicePresEmail}
              onCopy={handleCopyEmail}
            />
            <ContactCard
              label="Sponsorships / ER Director"
              email={erDirectorEmail}
              onCopy={handleCopyEmail}
            />
          </div>

          <p className="pt-2 text-xs text-gray-500 italic">
            가능하다면 UofT 이메일을 사용해주세요. 학생 신분 확인에 도움이
            됩니다.
          </p>
        </div>
      </section>

      {toastMessage && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center">
          <div className="pointer-events-auto rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-gray-900/40 transition">
            {toastMessage}
          </div>
        </div>
      )}
    </main>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
};

function PrimaryButton({ href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full bg-kcc-theme px-8 py-4 text-base font-semibold text-white shadow-md shadow-kcc-theme/40 transition-transform transition-shadow duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      {children}
    </Link>
  );
}

function SecondaryButton({ href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full border border-kcc-theme/30 bg-white px-8 py-4 text-base font-semibold text-kcc-theme shadow-sm shadow-black/10 transition-transform transition-shadow duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
    >
      {children}
    </Link>
  );
}

type ContactCardProps = {
  label: string;
  email: string;
  onCopy: (email: string) => void;
};

function ContactCard({ label, email, onCopy }: ContactCardProps) {
  return (
    <div className="rounded-3xl bg-slate-50 px-6 py-6 shadow-md shadow-black/5 transition-transform transition-shadow duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-xs tracking-[0.16em] text-kcc-theme/80">{label}</p>
      <p className="mt-2 text-base font-semibold text-gray-900">{email}</p>
      <button
        type="button"
        onClick={() => onCopy(email)}
        className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-kcc-theme hover:text-kcc-theme-darker"
      >
        <span>이메일 복사</span>
      </button>
    </div>
  );
}
