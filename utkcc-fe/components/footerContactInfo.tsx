import Link from 'next/link';
import {
  kccEmail,
  presEmail,
  vicePresEmail,
  erDirectorEmail,
} from '@/data/change-annually-data';

const socialLinks: {
  label: string;
  href: string;
  icon: 'instagram' | 'youtube' | 'facebook' | 'linkedin';
}[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/utkcc_/',
    icon: 'instagram',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@utkcc3050',
    icon: 'youtube',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/groups/utkcc/',
    icon: 'facebook',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/utkcc/mycompany/',
    icon: 'linkedin',
  },
];

export default function FooterContactInfo() {
  return (
    <div className="bg-kcc-theme px-8 py-10 text-white lg:px-32 lg:py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 lg:gap-5">
        <div className="flex flex-col gap-2 border-b border-white/20 pb-4 lg:flex-row lg:items-end lg:justify-between lg:gap-1 lg:pb-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 lg:text-xs">
              UTKCC
            </div>
            <div className="mt-1 text-xl font-bold leading-tight lg:text-xl">
              Contact Information
            </div>
          </div>
          <div className="max-w-[18rem] text-xs leading-snug text-white/75 lg:max-w-none lg:text-sm lg:text-white/55">
            University of Toronto Korean Commerce Community
          </div>
        </div>

        <div className="grid gap-2 text-sm lg:grid-cols-2 lg:gap-2 lg:text-sm">
          <ContactLine label="General Inquiries" email={kccEmail} />
          <ContactLine label="President" email={presEmail} />
          <ContactLine label="Vice-president" email={vicePresEmail} />
          <ContactLine label="Sponsor Inquiries" email={erDirectorEmail} />
        </div>

        <div className="border-t border-white/20 pt-4 text-[11px] leading-5 text-white/45 lg:pt-4 lg:text-xs lg:leading-5 lg:text-white/40">
          <div className="space-y-1 lg:space-y-0">
            <div>
              Designed by{' '}
              <Link
                href="https://www.instagram.com/hyunjunyou"
                target="_blank"
                className="transition-colors hover:text-white"
              >
                Hyunjun You
              </Link>
              .
            </div>
            <div>
              Initially developed by{' '}
              <Link
                href="https://www.instagram.com/ryubsmile"
                target="_blank"
                className="transition-colors hover:text-white"
              >
                Jaehyuk Ryu
              </Link>
              , and{' '}
              <Link
                href="https://www.instagram.com/justin.geon.kim/"
                target="_blank"
                className="transition-colors hover:text-white"
              >
                Jingeon Kim
              </Link>{' '}
              (UTKCC 17th).
            </div>
            <div>
              Maintained and updated by UTKCC Programming Team:{' '}
              <Link
                href="https://www.instagram.com/jamieryu._"
                target="_blank"
                className="transition-colors hover:text-white"
              >
                Jeehoon Ryu
              </Link>
              ,{' '}
              <Link
                href="https://www.instagram.com/jiho_shin_07"
                target="_blank"
                className="transition-colors hover:text-white"
              >
                Jiho Shin
              </Link>
              .
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-white/85">
              © 2026 University of Toronto Korean Commerce Community. All rights
              reserved.
            </div>
            <div className="flex items-center gap-1.5" aria-label="UTKCC social media">
              {socialLinks.map(({ label, href, icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`UTKCC ${label}`}
                  title={label}
                  className="group inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] text-white/65 transition duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <SocialIcon name={icon} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({
  name,
}: {
  name: 'instagram' | 'youtube' | 'facebook' | 'linkedin';
}) {
  if (name === 'instagram') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === 'youtube') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.8" y="5.5" width="18.4" height="13" rx="4" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === 'facebook') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14.5 4h-2a3 3 0 0 0-3 3v3H7v3h2.5v7h3v-7H15l.5-3h-3V7.5c0-.6.4-1 1-1h1V4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="6.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <path d="M5 10v9M10 19v-9m0 4.1c.8-2.4 5.8-3.1 5.8 1.2V19M16 19v-4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContactLine({ label, email }: { label: string; email: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-md border border-white/10 bg-white/[0.035] px-3.5 py-2 transition-colors hover:bg-white/[0.07] lg:px-3 lg:py-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/60 lg:text-[11px] lg:text-white/45">
        {label}
      </span>
      <Link
        href={`mailto:${email}`}
        className="break-all text-xs font-bold text-white transition-colors hover:text-white/75 lg:text-sm"
      >
        {email}
      </Link>
    </div>
  );
}
