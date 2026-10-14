import { Metadata } from 'next';
import Link from 'next/link';
import { joinMemberShipLink } from '@/data/change-annually-data';
import { sponsorData } from '@/data/sponsors-data';
import SponsorsDirectory from './sponsorsDirectory';
import {
  ArrowUpRightIcon,
  ChevronRightIcon,
  GiftIcon,
  MemberCardIcon,
  StoreIcon,
} from './sponsorIcons';

export const metadata: Metadata = {
  title: 'Sponsors',
};

// Kept short so each hint fits on one line inside a third of the guide card.
const steps = [
  {
    Icon: MemberCardIcon,
    title: '멤버십 가입',
    hint: '가입하면 바로 혜택 대상',
  },
  {
    Icon: StoreIcon,
    title: '제휴 매장 방문',
    hint: `아래 ${sponsorData.length}곳 중 골라서`,
  },
  { Icon: GiftIcon, title: '멤버십 보여주기', hint: '결제 전 제시하면 혜택!' },
];

export default function Sponsors() {
  return (
    <div className="w-full px-1 lg:px-0">
      <header className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <p className="text-lg font-bold capitalize text-kcc-theme lg:text-xl">
            Sponsors
          </p>
          <h1 className="mt-4 text-[34px] font-bold leading-[1.1] tracking-tight text-black lg:text-6xl lg:leading-[1.05]">
            UTKCC와 함께하는
            <br />
            <span className="text-kcc-theme">파트너십</span>
          </h1>
        </div>

        <section
          aria-labelledby="sponsor-guide-title"
          className="max-w-xl rounded-lg bg-white px-5 py-4 shadow-[0_16px_42px_-32px_rgba(5,60,140,0.5)] ring-1 ring-slate-200/70"
        >
          <h2
            id="sponsor-guide-title"
            className="text-[11px] font-bold tracking-[0.14em] text-slate-900"
          >
            이용 방법
          </h2>

          {/* Three equal columns with a 16px gap, and each arrow sits halfway
              between two icons. On phones the steps are centred, so that's the
              column boundary (100% + 8px). From sm up they're left-aligned with
              40px icons: (40px + 100% + 16px) / 2 = 50% + 28px. */}
          <ol className="mt-3 grid grid-cols-3 gap-4">
            {steps.map(({ Icon, title, hint }, i) => {
              const isLast = i === steps.length - 1;
              return (
                <li
                  key={title}
                  className="relative flex flex-col items-center gap-2 text-center sm:items-start sm:gap-2.5 sm:text-left"
                >
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[calc(100%+8px)] top-3 -translate-x-1/2 text-slate-800 sm:left-[calc(50%+28px)]"
                    >
                      <ChevronRightIcon />
                    </span>
                  )}
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg shadow-sm ring-1 ${
                      isLast
                        ? 'bg-kcc-theme text-white ring-kcc-theme'
                        : 'bg-white text-kcc-theme ring-slate-200/80'
                    }`}
                  >
                    <Icon />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold tracking-[0.16em] text-slate-900">
                      STEP {i + 1}
                    </span>
                    <span className="mt-0.5 block break-keep text-[13px] font-bold leading-snug text-slate-900 sm:text-sm lg:text-[15px]">
                      {title}
                    </span>
                    <span className="mt-0.5 hidden break-keep text-xs leading-snug text-slate-500 sm:block">
                      {hint}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>

          <Link
            href={joinMemberShipLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 flex items-center justify-between gap-3 rounded-lg bg-kcc-theme px-4 py-3 text-sm font-bold text-white transition hover:bg-kcc-theme-darker focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(5,60,140,0.25)]"
          >
            <span>멤버십 가입하기</span>
            <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </section>
      </header>

      <SponsorsDirectory />
    </div>
  );
}
