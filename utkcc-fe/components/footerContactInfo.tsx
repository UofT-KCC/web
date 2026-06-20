import Link from 'next/link';
import {
  kccEmail,
  presEmail,
  vicePresEmail,
  erDirectorEmail,
} from '@/data/change-annually-data';

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

          <div className="mt-4 text-white/85 lg:mt-4">
            © 2026 University of Toronto Korean Commerce Community. All rights
            reserved.
          </div>
        </div>
      </div>
    </div>
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
