import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import formalGroupPhoto from '@/public/assets/images/about-group-photo.png';
import { KCC_START_YEAR, KCC_TH_NOW } from '@/data/change-annually-data';
import AboutHero from './aboutHero';
import CountUp from './countUp';

export const metadata: Metadata = {
  title: 'About',
};

// The two numbers count up when they scroll into view (see CountUp). The
// year starts from 1900 so it stays four digits wide while rolling.
const facts: {
  value: React.ReactNode;
  label: string;
}[] = [
  { value: <CountUp from={1900} to={KCC_START_YEAR} />, label: '설립' },
  {
    value: (
      <>
        <CountUp to={KCC_TH_NOW} />기
      </>
    ),
    label: '현재 기수',
  },
  { value: 'U of T', label: '공식 한인 학생회' },
];

// Each motto is split so the key phrase can be set in brand blue.
const mottos = [
  {
    lead: 'Be Part of a',
    highlight: 'Professional Community',
    detail: '학업과 진로를 함께 고민하고 성장하는 커뮤니티',
  },
  {
    lead: 'Work Hard,',
    highlight: 'Play Hard',
    detail: '열심히 배우고, 그만큼 즐겁게 어울리는 대학 생활',
  },
];

const pillars = [
  {
    Icon: BookIcon,
    label: 'Academic',
    title: '학업',
    detail: '전공 수업 튜토리얼과 학술 프로그램으로 학교 공부를 함께 준비해요.',
  },
  {
    Icon: BriefcaseIcon,
    label: 'Career',
    title: '커리어',
    detail:
      'KCCA 선배들과의 커피챗, 커리어 세미나, 와인 파티로 관심 있는 산업을 미리 만나요.',
  },
  {
    Icon: PeopleIcon,
    label: 'Social',
    title: '친목',
    detail:
      '신입생 환영회, 할로윈 파티 같은 소셜 이벤트로 대학 생활에 활력을 더해요.',
  },
];

export default function About() {
  return (
    <div className="w-full px-1 lg:px-0">
      <header>
        <AboutHero />
      </header>

      <dl className="mt-10 grid grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 lg:mt-16">
        {facts.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col-reverse items-center px-2 py-5 text-center sm:items-start sm:px-6 sm:py-7 sm:text-left lg:px-10 lg:py-12"
          >
            <dt className="mt-1.5 break-keep text-[11px] font-bold leading-tight text-slate-400 sm:mt-2 sm:text-sm lg:mt-3 lg:text-base">
              {label}
            </dt>
            <dd className="whitespace-nowrap text-[30px] font-bold leading-none tracking-tight text-kcc-theme sm:text-5xl lg:text-7xl">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <Section
        id="about-story"
        label="Our Story"
        title="우리의 이야기"
        aside={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-100 shadow-[0_24px_60px_-36px_rgba(5,60,140,0.45)] ring-1 ring-black/5">
            <Image
              src={formalGroupPhoto}
              alt="포멀 행사에서 함께한 UTKCC 멤버들"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-center"
            />
          </div>
        }
      >
        <div className="max-w-2xl space-y-5 break-keep text-[15px] leading-[1.9] text-slate-600 lg:text-base">
          <p>
            토론토 대학교의 UTKCC는 {KCC_START_YEAR}년에 Commerce 및 Economics
            전공 학생들을 중심으로 설립되어, 현재 {KCC_TH_NOW}기를 맞이한 학교
            공식 한인 학생회입니다. 창립 이래 꾸준히 활동을 이어오며, 이제는
            상경계뿐 아니라 다양한 전공과 배경을 가진 학생들이 함께 모여 서로의
            아이디어와 역량을 나누는 폭넓은 커뮤니티로 발전했습니다.
          </p>
          <p>
            KCC는 선배들의 경험과 조언을 토대로 특정 분야에 한정되지 않고,
            다양한 영역에서 미래를 이끌어갈 리더를 양성하는 데 힘쓰고 있습니다.
            앞으로도 UTKCC는 학업과 커리어, 그리고 인간적인 교류가 조화된
            커뮤니티로서 여러분의 대학 생활을 한층 더 풍요롭고 의미 있게
            만들어가겠습니다.
          </p>
        </div>
      </Section>

      <Section label="Motto" title="우리가 지향하는 것">
        <div className="space-y-14 lg:space-y-20">
          {mottos.map(({ lead, highlight, detail }, i) => {
            const alignRight = i % 2 === 1;
            return (
              <figure
                key={highlight}
                className={`relative max-w-4xl pt-10 lg:pt-14 ${
                  alignRight ? 'ml-auto text-right' : ''
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 select-none text-[120px] font-bold leading-none text-[#dfe7f3] lg:-top-4 lg:text-[200px] ${
                    alignRight ? 'right-0' : 'left-0'
                  }`}
                >
                  &ldquo;
                </span>
                <blockquote className="relative text-[32px] font-bold leading-[1.08] tracking-tight text-slate-950 lg:text-6xl">
                  {lead}{' '}
                  <span className="block text-kcc-theme">{highlight}</span>
                </blockquote>
                <figcaption
                  className={`relative mt-5 flex items-center gap-2.5 break-keep text-[13px] text-slate-500 sm:gap-3 sm:text-sm lg:mt-6 lg:text-base ${
                    alignRight ? 'flex-row-reverse' : ''
                  }`}
                >
                  <span className="h-0.5 w-5 shrink-0 rounded-full bg-kcc-theme sm:w-8" />
                  <span>{detail}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Section>

      <Section label="What We Do" title="UTKCC가 하는 일">
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map(({ Icon, label, title, detail }) => (
            <div
              key={label}
              className="rounded-lg bg-white p-6 shadow-[0_16px_42px_-34px_rgba(5,60,140,0.5)] ring-1 ring-slate-200/80"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eef2f8] text-kcc-theme">
                <Icon />
              </span>
              <p className="mt-5 text-[11px] font-bold tracking-[0.16em] text-slate-400">
                {label.toUpperCase()}
              </p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 break-keep text-sm leading-relaxed text-slate-500">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-16 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row lg:mt-24">
        <NextLink href="/events" primary>
          이벤트 캘린더 보기
        </NextLink>
        <NextLink href="/executives">임원진 만나보기</NextLink>
      </div>
    </div>
  );
}

// With `aside`, the heading and content share the left column and the aside
// sits beside them, vertically centred, so the heading stays close to its text.
function Section({
  id,
  label,
  title,
  aside,
  children,
}: {
  id?: string;
  label: string;
  title: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  const body = (
    <div>
      <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400">
        {label.toUpperCase()}
      </p>
      <h2 className="mb-6 mt-2 text-2xl font-bold tracking-tight text-slate-950 lg:mb-8 lg:text-4xl">
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <section id={id} className="mt-16 scroll-mt-24 lg:mt-24">
      {aside ? (
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
          {body}
          {aside}
        </div>
      ) : (
        body
      )}
    </section>
  );
}

function NextLink({
  href,
  primary = false,
  children,
}: {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-between gap-6 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(5,60,140,0.2)] active:scale-[0.98] ${
        primary
          ? 'bg-kcc-theme text-white hover:bg-kcc-theme-darker'
          : 'bg-gray-200 text-black hover:bg-white hover:text-kcc-theme hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]'
      }`}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

function BookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5v-15Z" />
      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5v-15Z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="7" width="17" height="12" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.7-3 2.8-4.5 5.5-4.5s4.8 1.5 5.5 4.5" />
      <circle cx="16.5" cy="9.5" r="2.4" />
      <path d="M15.5 14.6c2.4-.3 4.3 1 5 3.9" />
    </svg>
  );
}
