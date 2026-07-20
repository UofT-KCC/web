import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageIntro from '@/components/pageIntro';

export const metadata: Metadata = {
  title: 'Resources',
};

const courseMapOrderForm = 'https://forms.gle/Pfpnsi2QbAFQoBNN9';

function ArrowUpRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 15 15 5M7 5h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Resources() {
  return (
    <PageIntro
      pageName="resources"
      pageSlogan={
        <div className="text-3xl font-bold leading-[1.05] tracking-tight text-black lg:text-6xl">
          <span className="block lg:inline">수강신청 전에</span>{' '}
          <span className="mt-1 inline-block text-kcc-theme lg:mt-0">코스맵</span>
        </div>
      }
      pageExp={
        <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-kcc-gray lg:text-base lg:leading-relaxed">
          <p>
            어떤 수업을 들어야 할지, 어떤 교수님이 나와 잘 맞을지 고민된다면 선배들의
            경험에서 답을 찾아보세요.
          </p>
          <p>
            UTKCC Course Map은 토론토대학교 학생들의 실제 수강 후기와 교수 정보를 한 권에
            정리한 수강 가이드입니다.
          </p>
          <p className="font-bold text-kcc-theme">2026–2027 얼리버드 1차 판매가 시작되었습니다.</p>
        </div>
      }
    >
      <section
        className="-mt-12 w-full max-w-[1020px] py-4 sm:mt-0 lg:-translate-y-10"
        aria-labelledby="course-map-title"
      >
        <div className="grid items-center gap-10 sm:grid-cols-[minmax(315px,1.08fr)_minmax(285px,.92fr)] sm:gap-12 lg:gap-16">
          <div className="relative min-h-[440px] sm:min-h-[500px]">
            <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-kcc-theme/[0.055] blur-3xl" />
            <div className="absolute left-1/2 top-1/2 aspect-[0.79] w-[94%] max-w-[390px] -translate-x-1/2 -translate-y-1/2">
                <div className="course-map-sheet-stack course-map-sheet-1 absolute inset-0 overflow-hidden rounded-[3px] bg-white shadow-[0_25px_55px_-20px_rgba(3,40,100,.38)] ring-1 ring-black/10">
                  <Image
                    src="/assets/images/resources/course-map-cover.png"
                    alt="UTKCC Course Map 표지"
                    fill
                    sizes="(min-width: 640px) 230px, 72vw"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="course-map-sheet-stack course-map-sheet-2 absolute inset-0 overflow-hidden rounded-[3px] bg-white shadow-[0_25px_55px_-18px_rgba(3,40,100,.34)] ring-1 ring-black/10">
                  <Image
                    src="/assets/images/resources/course-map-rsm100.jpg"
                    alt="RSM100 Course Map 미리보기"
                    fill
                    sizes="(min-width: 640px) 230px, 72vw"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="course-map-sheet-stack course-map-sheet-3 absolute inset-0 overflow-hidden rounded-[3px] bg-white shadow-[0_25px_55px_-18px_rgba(3,40,100,.3)] ring-1 ring-black/10">
                  <Image
                    src="/assets/images/resources/course-map-eco101.jpg"
                    alt="ECO101 Course Map 미리보기"
                    fill
                    sizes="(min-width: 640px) 230px, 72vw"
                    className="object-contain"
                    priority
                  />
                </div>
            </div>
          </div>

          <div className="flex flex-col py-2 sm:min-h-[470px] sm:py-5">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">UTKCC</p>
                  <h2 id="course-map-title" className="mt-1 text-4xl font-bold leading-[0.88] tracking-[-0.055em] text-kcc-theme sm:text-5xl">
                    Course<br />Map
                  </h2>
                </div>
                <div className="shrink-0 rounded-2xl bg-kcc-theme/[0.07] px-5 py-4 text-center shadow-[0_14px_30px_-22px_rgba(5,60,140,.55)] ring-1 ring-inset ring-kcc-theme/15">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-kcc-theme/60">Early bird</p>
                  <p className="mt-1 text-4xl font-bold leading-none tracking-[-0.06em] text-kcc-theme">$5</p>
                  <span className="mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-[8px] font-bold tracking-[0.08em] text-kcc-theme shadow-sm ring-1 ring-inset ring-kcc-theme/10">
                    1차 판매 중
                  </span>
                </div>
              </div>

              <p className="mt-7 max-w-sm break-keep text-[13px] leading-[1.75] text-slate-600">
                선배들의 실제 수강 경험을 바탕으로 과목 난이도, 평가 방식, 교수진과 시험
                정보를 한눈에 확인할 수 있어요.
              </p>

              <div className="mt-7 space-y-3">
                <Feature number="80+" label="과목 및 교수진 리뷰" />
                <Feature number="01" label="학생들이 직접 전하는 수강 후기" />
                <Feature number="02" label="평가 방식과 시험 구성 인사이트" />
              </div>

              <div className="mt-auto pt-7">
                <Link
                  href={courseMapOrderForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-between rounded-full bg-kcc-theme px-5 py-3 text-sm font-bold text-white shadow-sm shadow-kcc-theme/25 transition hover:-translate-y-0.5 hover:bg-kcc-theme-darker hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/20"
                >
                  구매 문의하기
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRightIcon />
                  </span>
                </Link>
                <p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
                  구매 신청 Google Form으로 연결됩니다
                </p>
              </div>
          </div>
        </div>
      </section>
    </PageIntro>
  );
}

function Feature({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="w-8 shrink-0 text-xs font-bold tabular-nums text-kcc-theme">{number}</span>
      <span className="text-xs font-medium text-slate-600">{label}</span>
    </div>
  );
}
