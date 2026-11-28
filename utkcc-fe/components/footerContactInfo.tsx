import Link from 'next/link';
import { kccEmail } from '@/data/change-annually-data';

export const socialLinks: {
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

// Site footer, laid out like a letterhead: the club's name, one contact line
// (the Contact page has everyone else), and social links, with the
// copyright and credits underneath.
export default function FooterContactInfo() {
  return (
    <div className="bg-kcc-theme px-8 py-12 text-white lg:px-32 lg:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_auto] xl:gap-16">
          <p className="text-2xl font-medium leading-[1.15] tracking-tight lg:text-[32px]">
            University of Toronto
            <br />
            Korean Commerce Community
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-sm font-semibold">Contact</h2>
              <ul className="mt-3 space-y-2.5 text-sm text-white/75">
                <li>
                  <Link
                    href={`mailto:${kccEmail}`}
                    className="transition-colors hover:text-white"
                  >
                    {kccEmail}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-1 transition-colors hover:text-white"
                  >
                    All contacts
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold">Follow UTKCC</h2>
              <div
                className="mt-3 flex items-center gap-4"
                aria-label="UTKCC social media"
              >
                {socialLinks.map(({ label, href, icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`UTKCC ${label}`}
                    title={label}
                    className="text-white/75 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <SocialIcon name={icon} className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/20 pt-6 lg:mt-20">
          <p className="text-sm text-white/80">
            © 2026 University of Toronto Korean Commerce Community. All rights
            reserved.
          </p>
          <div className="mt-3 space-y-0.5 text-xs leading-5 text-white/50">
            <div>
              Original design by{' '}
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
              Originally developed by{' '}
              <Link
                href="https://www.instagram.com/ryubsmile"
                target="_blank"
                className="transition-colors hover:text-white"
              >
                Jaehyuk Ryu
              </Link>{' '}
              and{' '}
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
              Redesigned and rebuilt by{' '}
              <Link
                href="https://www.instagram.com/jamieryu._"
                target="_blank"
                className="transition-colors hover:text-white"
              >
                Jeehoon Ryu
              </Link>{' '}
              (UTKCC 20th).
            </div>
            <div>
              Maintained by the UTKCC Programming Team:{' '}
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
              ,{' '}
              <Link
                href="https://www.instagram.com/yi.an2_/"
                target="_blank"
                className="transition-colors hover:text-white"
              >
                Yian Kim
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SocialIcon({
  name,
  className = 'h-3.5 w-3.5',
}: {
  name: 'instagram' | 'youtube' | 'facebook' | 'linkedin';
  // Defaults to the small size the Contact page's link pills use.
  className?: string;
}) {
  if (name === 'instagram') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`fill-none ${className}`}
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === 'youtube') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`fill-none ${className}`}
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="2.8" y="5.5" width="18.4" height="13" rx="4" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === 'facebook') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`fill-none ${className}`}
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M14.5 4h-2a3 3 0 0 0-3 3v3H7v3h2.5v7h3v-7H15l.5-3h-3V7.5c0-.6.4-1 1-1h1V4Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`fill-none ${className}`}
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
      <circle cx="8.5" cy="8.4" r="1.1" fill="currentColor" stroke="none" />
      <path
        d="M8.5 11.2v5.3M12 16.5v-5.3m0 2.7c0-1.6 1-2.7 2.4-2.7s2.1 1 2.1 2.5v2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
