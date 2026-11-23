import Image from 'next/image';
import Link from 'next/link';
import PageIntro from '@/components/pageIntro';

const instagramLink = 'https://www.instagram.com/utkccmedia/';

// Update this object each week when a new issue goes up.
const latestIssue = {
  title: '이번 주 경제 이슈, 무슨 일이?',
  cover: '/assets/images/newsletter/november-week-4-cover.jpg',
  slideCount: 11,
  caption: [
    '이번 주 캐나다 경제에는 어떤 변화가 있었을까요? 🇨🇦',
    '📈 미국 증시를 앞서던 캐나다 주식시장, 최근 상승세가 흔들리고 있습니다. 원자재 가격 하락이 새로운 변수로 떠올랐습니다.',
    '💵 한편 캐나다 달러는 미국 달러 대비 19개월 만에 최저 수준을 기록했습니다.',
    '이번 주 UTKCC 경제뉴스에서 확인해 보세요! 💙',
  ],
  hashtags: ['#UTKCC', '#UTKCCMedia', '#경제뉴스', '#이번주경제이슈'],
};

function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} fill-none`} stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const actionIcons = [
  // heart
  <path key="heart" d="M12 20s-7.5-4.6-9.2-9.4C1.6 7.2 3.9 4 7.2 4c2 0 3.4 1.1 4.8 2.9C13.4 5.1 14.8 4 16.8 4c3.3 0 5.6 3.2 4.4 6.6C19.5 15.4 12 20 12 20Z" strokeLinejoin="round" />,
  // comment
  <path key="comment" d="M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1.4-4.6A8.5 8.5 0 1 1 20.5 11.5Z" strokeLinejoin="round" />,
  // share
  <g key="share">
    <path d="m21 3-7.7 18-3.6-7.1L3 10.8 21 3Z" strokeLinejoin="round" />
    <path d="M9.7 13.9 21 3" strokeLinecap="round" />
  </g>,
];

function PostHeader({ className }: { className: string }) {
  return (
    <Link
      href={instagramLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`group items-center gap-3 border-black/[0.06] px-4 py-3 focus:outline-none focus-visible:bg-black/[0.03] ${className}`}
    >
      <Image
        src="/assets/images/newsletter/profile.png"
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 shrink-0 rounded-full object-cover"
      />
      <span className="text-[13px] font-semibold text-slate-900 group-hover:text-slate-600">utkccmedia</span>
      <span className="ml-auto text-[13px] font-semibold text-[#0095f6]">팔로우</span>
    </Link>
  );
}

export default function Newsletter() {
  return (
    <PageIntro
      pageName="newsletter"
      pageSlogan={
        <div className="text-3xl font-bold leading-[1.08] tracking-tight text-black lg:text-6xl">
          우리의 새 소식을
          <span className="block whitespace-nowrap text-kcc-theme">피드에서 만나요</span>
        </div>
      }
      pageExp={
        <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-kcc-gray lg:text-base lg:leading-relaxed">
          <p>
            캐나다 증시부터 환율까지. 우리 생활과 맞닿은 이번 주 경제 소식을 KCC만의
            시선으로 쉽고 재미있게 정리해 드려요.
          </p>
          <p>
            뉴스레터는 인스타그램에{' '}
            <strong className="font-bold text-kcc-theme">매주 일요일 9시</strong>에
            업로드됩니다. 가볍게 넘겨보고, 필요한 정보는 저장해두세요.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2 lg:justify-start">
            <Link
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-kcc-theme px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-kcc-theme/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-kcc-theme-darker hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/25 active:translate-y-0 lg:px-6 lg:text-sm"
            >
              <InstagramIcon />
              인스타그램 팔로우
            </Link>
          </div>
        </div>
      }
    >
      <section className="w-full max-w-[780px]">
        <article className="grid overflow-hidden rounded-xl border border-black/[0.06] bg-white/60 backdrop-blur-sm sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <PostHeader className="flex border-b sm:hidden" />

          {/* cover */}
          <Link
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[4/5] overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#8acaf2]"
            aria-label={`${latestIssue.title} — 인스타그램에서 보기`}
          >
            <Image
              src={latestIssue.cover}
              alt={`UTKCC 뉴스레터 표지: ${latestIssue.title}`}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
              priority
            />
            {/* carousel dots */}
            <span className="absolute inset-x-0 bottom-3 flex justify-center gap-1" aria-hidden="true">
              {Array.from({ length: latestIssue.slideCount }).map((_, i) => (
                <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/45'}`} />
              ))}
            </span>
          </Link>

          {/* post side */}
          <div className="flex min-w-0 flex-col text-left">
            <PostHeader className="hidden border-b sm:flex" />

            <div className="flex-1 space-y-3 overflow-hidden px-4 py-4 text-[13px] leading-[1.55] text-slate-800 sm:max-h-[330px] sm:overflow-y-auto lg:max-h-none">
              <p className="break-keep">
                <span className="mr-1.5 font-semibold text-slate-900">utkccmedia</span>
                💸 {latestIssue.title}
              </p>
              {latestIssue.caption.map((line) => (
                <p key={line} className="break-keep">
                  {line}
                </p>
              ))}
              <p className="text-[#00376b]">{latestIssue.hashtags.join(' ')}</p>
            </div>

            <div className="border-t border-black/[0.06] px-4 pb-4 pt-3">
              <div className="flex items-center gap-4 text-slate-900">
                {actionIcons.map((icon, i) => (
                  <svg key={i} aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none" stroke="currentColor" strokeWidth="1.8">
                    {icon}
                  </svg>
                ))}
                <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-auto h-6 w-6 fill-none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6.5 4.5h11v16L12 17l-5.5 3.5v-16Z" strokeLinejoin="round" />
                </svg>
              </div>
              <Link
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[12px] font-semibold text-slate-500 hover:text-slate-800"
              >
                인스타그램에서 전체 보기
              </Link>
            </div>
          </div>
        </article>
      </section>
    </PageIntro>
  );
}
