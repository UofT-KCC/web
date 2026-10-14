import Image from 'next/image';
import Link from 'next/link';
import PageIntro from '@/components/pageIntro';
import { sponsorData } from '@/data/sponsors-data';
import SponsorsMarquee from './sponsorsMarquee';
import { ArrowUpRightIcon, PinIcon } from './sponsorIcons';

// Homepage teaser: a horizontally scrolling strip. The full /sponsors page
// shows every partner in detail instead.
export default function SponsorsHomeIntro() {
  return (
    <PageIntro
      pageName="sponsors"
      pageSlogan={
        <div className="text-3xl font-bold leading-[1.05] tracking-tight text-black lg:text-6xl">
          <span className="block lg:inline">UTKCC와 함께하는</span>{' '}
          <span className="mt-1 inline-block text-kcc-theme lg:mt-0">파트너십</span>
        </div>
      }
      pageExp={
        <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-kcc-gray lg:text-base lg:leading-relaxed">
          <p>
            UTKCC는 토론토에 위치한 다양한 한인 식당 및 로컬 비즈니스와 제휴를 맺고,
            멤버십 소지자분들께 할인, 경품 등의 혜택을 제공하고 있습니다.
          </p>
          <p>
            친구들과의 식사, 동아리 모임, 시험 끝난 뒤의 소확행까지 — 제휴 매장을 통해
            더 합리적인 가격으로 즐겨보세요.
          </p>
          <p>파트너 카드는 직접 가로로 넘겨볼 수 있고, 멈추면 자동으로 다시 움직입니다.</p>
          <Link
            href="/sponsors"
            className="group mx-auto mt-5 flex w-fit items-center gap-1.5 rounded-full bg-gray-200 px-5 py-2 text-xs font-bold text-black shadow-sm ring-1 ring-black/5 transition-all duration-300 ease-out hover:bg-white hover:text-kcc-theme hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:ring-kcc-theme/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/30 active:scale-[0.98] lg:mx-0 lg:gap-2 lg:px-7 lg:py-2.5 lg:text-sm"
          >
            <span>View All Partners</span>
            <span className="text-sm leading-none transition-transform duration-300 ease-out group-hover:translate-x-0.5 lg:text-base">
              →
            </span>
          </Link>
        </div>
      }
    >
      <section className="w-full overflow-hidden py-4" aria-label="UTKCC partners">
        <div className="mb-5 flex items-end justify-between px-1">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-kcc-theme/65">
              Our partners
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
              멤버십 파트너
            </h2>
          </div>
        </div>

        <SponsorsMarquee>
          <SponsorGroup />
          <SponsorGroup copy />
        </SponsorsMarquee>
      </section>
    </PageIntro>
  );
}

function SponsorGroup({ copy = false }: { copy?: boolean }) {
  return (
    <div
      className={`flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5 ${copy ? 'sponsor-marquee-copy' : ''}`}
      aria-hidden={copy || undefined}
    >
      {sponsorData.map((sponsor, index) => (
        <SponsorCard
          key={`${copy ? 'copy' : 'original'}-${sponsor.name}`}
          {...sponsor}
          priority={!copy && index < 2}
        />
      ))}
    </div>
  );
}

function SponsorCard({
  name,
  exp,
  imageSrc,
  websiteUrl,
  locationUrl,
  priority,
}: (typeof sponsorData)[number] & { priority: boolean }) {
  return (
    <article className="group flex w-[240px] shrink-0 flex-col overflow-hidden rounded-lg bg-white shadow-[0_16px_42px_-30px_rgba(5,60,140,0.46)] ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-28px_rgba(5,60,140,0.38)] sm:w-[270px]">
      <Link
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex aspect-square items-center justify-center bg-[#f7f8fa] focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-kcc-theme/20"
        aria-label={`${name} 웹사이트 열기`}
      >
        <Image
          src={imageSrc}
          alt={`${name} 파트너 로고`}
          fill
          sizes="(min-width: 640px) 270px, 240px"
          className="object-contain"
          priority={priority}
        />
      </Link>

      <div className="flex min-h-[128px] flex-1 flex-col border-t border-slate-100 px-4 pb-4 pt-3.5">
        <div className="flex-1">
          <h3 className="text-[15px] font-bold leading-tight tracking-tight text-slate-950">{name}</h3>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-slate-500">{exp}</p>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <Link
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 flex-1 items-center justify-between rounded-full bg-kcc-theme px-3.5 text-[10px] font-bold text-white transition hover:bg-kcc-theme-darker focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/20"
          >
            웹사이트
            <ArrowUpRightIcon />
          </Link>
          <Link
            href={locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} 위치 보기`}
            title="위치 보기"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kcc-theme/[0.045] text-kcc-theme/55 transition hover:bg-kcc-theme/10 hover:text-kcc-theme focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/15"
          >
            <PinIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}
