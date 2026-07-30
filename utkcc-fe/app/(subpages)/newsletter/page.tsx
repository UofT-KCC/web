import Image from 'next/image';
import Link from 'next/link';
import PageIntro from '@/components/pageIntro';

const instagramLink = 'https://www.instagram.com/utkccmedia/';

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 15 15 5M7 5h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none" stroke="currentColor" strokeWidth="1.7">
      <path d="M6.5 4.5h11v16L12 17l-5.5 3.5v-16Z" strokeLinejoin="round" />
    </svg>
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
            시험, 커리어, 교내외 활동까지. 바쁜 학교생활 속 놓치기 쉬운 소식을 KCC만의
            시선으로 쉽고 재미있게 정리해 드려요.
          </p>
          <p>
            이제 뉴스레터는 인스타그램에도{' '}
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
        <div className="overflow-hidden rounded-[28px] border border-slate-200/90 bg-white shadow-[0_22px_70px_-34px_rgba(5,60,140,0.4)]">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-5">
            <Link
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-0 items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/15"
              aria-label="utkccmedia 인스타그램 열기"
            >
              <span className="rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-violet-600 p-[2px]">
                <span className="block rounded-full bg-white p-[2px]">
                  <Image
                    src="/assets/images/newsletter/profile.png"
                    alt="UTKCC Media 로고"
                    width={42}
                    height={42}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </span>
              </span>
              <span className="min-w-0 text-left">
                <span className="flex items-center gap-1.5 text-sm font-bold text-slate-900 group-hover:text-kcc-theme">
                  utkccmedia
                  <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-kcc-theme text-[8px] text-white">✓</span>
                </span>
                <span className="block truncate text-[11px] text-slate-500">KCC newsletter · Toronto</span>
              </span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-[minmax(0,1.05fr)_minmax(240px,.95fr)]">
            <Link
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[1250/1550] overflow-hidden bg-[#f4f0ec] sm:aspect-auto sm:min-h-[430px]"
              aria-label="July Week 4 뉴스레터 인스타그램에서 보기"
            >
              <Image
                src="/assets/images/newsletter/july-week-4-cover.png"
                alt="KCC Newsletter July Week 4 표지"
                fill
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 52vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.025]"
                priority
              />
              <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-md">
                1 / 7
              </span>
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent px-4 pb-4 pt-14 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
                인스타그램에서 이어보기
                <ArrowUpRightIcon />
              </span>
            </Link>

            <div className="flex min-h-[300px] flex-col p-5 sm:p-6">
              <div className="flex items-center justify-between text-slate-900">
                <div className="flex items-center gap-4">
                  <InstagramIcon />
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none" stroke="currentColor" strokeWidth="1.7">
                    <path d="m21 3-7.7 18-3.6-7.1L3 10.8 21 3Z" strokeLinejoin="round" />
                    <path d="M9.7 13.9 21 3" strokeLinecap="round" />
                  </svg>
                </div>
                <BookmarkIcon />
              </div>

              <div className="mt-7 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-kcc-theme">Latest post</p>
                <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">
                  July Week 4
                </h2>
                <ul className="mt-4 space-y-1 break-keep text-[13px] leading-5 text-slate-600">
                  <li>✔️ Weekly News - 관세 50% 예고</li>
                  <li>✔️ Biz Tip - Resume Essentials</li>
                  <li>✔️ KCC News - 유용한 앱 추천</li>
                  <li>✔️ Member Spotlight</li>
                </ul>
                <p className="mt-4 break-keep text-[13px] leading-5 text-slate-600">
                  이번 주에도 5분이면 읽을 수 있는 KCC Newsletter와 함께하세요!
                </p>
                <p className="mt-4 text-xs font-medium text-kcc-theme">#UTKCC #KCCNewsletter #UofT</p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </PageIntro>
  );
}
