import Image from 'next/image';
import { invitationSites } from '@/data/invitation-archive';
import { formatDate } from './calendarDates';

/**
 * 지난 행사마다 만든 초대장 웹사이트 모음. Each card opens the site in a new tab.
 */
export default function InvitationArchive() {
  return (
    <section aria-labelledby="invitations-heading">
      <p className="mb-2 text-lg font-bold text-kcc-theme lg:text-xl">
        Invitations
      </p>
      <h2
        id="invitations-heading"
        className="text-[28px] font-bold leading-tight tracking-tight text-slate-900 lg:text-4xl"
      >
        지난 행사 초대장
      </h2>
      <p className="mt-3 break-keep text-sm leading-relaxed text-slate-500 lg:text-base">
        UTKCC는 행사마다 초대장 웹사이트를 직접 만들어요. 지난 행사들의 초대장을
        둘러보세요.
      </p>

      <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
        {invitationSites.map(site => (
          <li key={site.id}>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl focus:outline-none focus-visible:ring-[3px] focus-visible:ring-kcc-theme focus-visible:ring-offset-4"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 shadow-[0_25px_55px_-32px_rgba(5,60,140,0.45)] ring-1 ring-slate-200/70">
                <Image
                  src={site.image}
                  alt={site.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
                />
              </div>

              <p className="mt-5 text-xs font-semibold text-slate-400">
                {site.edition}
                {site.date &&
                  ` · ${formatDate(site.date, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}`}
              </p>
              <h3 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900">
                {site.title}
              </h3>
              <p className="mt-0.5 text-[15px] font-semibold text-kcc-theme">
                {site.theme}
              </p>
              <p className="mt-2 break-keep text-sm leading-relaxed text-slate-500">
                {site.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-kcc-theme">
                초대장 보기
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="h-4 w-4 fill-none transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 13 13 7M8 7h5v5" />
                </svg>
                <span className="sr-only">(새 탭에서 열림)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
