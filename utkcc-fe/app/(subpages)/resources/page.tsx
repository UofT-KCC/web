import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageIntro from '@/components/pageIntro';
import MenuBar from '@/components/menubar';
import antiCalendarImage from '/public/assets/images/resources/anti-calendar.jpeg';
import studyPackageImage from '/public/assets/images/resources/study-package.jpeg';
import instagramLogo from '/public/assets/images/media-logo/instagram.png';
import facebookLogo from '/public/assets/images/media-logo/facebook.png';
import linkedInLogo from '/public/assets/images/media-logo/linkedIn.png';
import youtubeLogo from '/public/assets/images/media-logo/youtube.png';
import { joinMemberShipLink } from '@/data/change-annually-data';

export const metadata: Metadata = {
  title: 'Resources',
};

export default function Resources() {
  const resourcesData: { [k: string]: JSX.Element[] } = {
    'anti-calendar': [
      <div
        key={0}
        className="mx-auto mt-6 max-w-5xl rounded-3xl bg-white px-10 py-12 shadow-sm shadow-slate-200/70 ring-1 ring-slate-100 sm:px-14 sm:py-14"
      >
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
          <div className="relative mx-auto h-60 w-60 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:mx-0 sm:h-72 sm:w-72">
            <Image
              key={0}
              alt="UTKCC Anti-calendar"
              src={antiCalendarImage}
              fill
              placeholder="blur"
              sizes="100%"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-4 text-left text-sm leading-relaxed text-gray-700">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-kcc-theme/70">
                Resource
              </p>
              <h2 className="mt-1 text-xl font-semibold text-gray-900">
                Anti-calendar
              </h2>
            </div>
            <p>
              이 수업 들어볼까 고민될 때, 과목별 꿀팁과 추천 강의를 한눈에 볼 수 있는
              UTKCC만의 안티캘린더입니다. 전공·교양 선택에 도움이 되는 솔직한 후기를
              모아두었어요.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/assets/pdf/anti-calendar-freshmen.pdf"
                target="_blank"
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-kcc-theme px-6 py-3 text-sm font-medium text-white text-opacity-90 shadow-sm shadow-kcc-theme/30 transition hover:-translate-y-0.5 hover:bg-kcc-theme-darker hover:text-opacity-100 hover:shadow-md"
              >
                신입생용 샘플 보기
              </Link>
              <Link
                href="/assets/pdf/anti-calendar-upperyears.pdf"
                target="_blank"
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-100 px-6 py-3 text-sm font-medium text-gray-700 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white hover:text-gray-900"
              >
                상·고학년용 샘플 보기
              </Link>
            </div>
          </div>
        </div>
      </div>,
    ],
    'study package': [
      <div
        key={1}
        className="mx-auto mt-6 max-w-5xl rounded-3xl bg-white px-10 py-12 shadow-sm shadow-slate-200/70 ring-1 ring-slate-100 sm:px-14 sm:py-14"
      >
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
          <div className="relative mx-auto h-60 w-60 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:mx-0 sm:h-72 sm:w-72">
            <Image
              key={1}
              alt="UTKCC Study Package"
              src={studyPackageImage}
              fill
              placeholder="blur"
              sizes="100%"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-4 text-left text-sm leading-relaxed text-gray-700">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-kcc-theme/70">
                Resource
              </p>
              <h2 className="mt-1 text-xl font-semibold text-gray-900">
                Study Package
              </h2>
            </div>
            <p>
              선배들의 과제 팁, 연습문제, 강의 정리를 한 번에 모아둔 스터디 패키지입니다.
              시험 대비와 개념 복습에 바로 활용할 수 있는 실전형 자료예요.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/assets/pdf/eco101-sample.pdf"
                target="_blank"
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-kcc-theme px-6 py-3 text-sm font-medium text-white text-opacity-90 shadow-sm shadow-kcc-theme/30 transition hover:-translate-y-0.5 hover:bg-kcc-theme-darker hover:text-opacity-100 hover:shadow-md"
              >
                ECO101 샘플 보기
              </Link>
              <Link
                href="/assets/pdf/sta130-sample.pdf"
                target="_blank"
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-100 px-6 py-3 text-sm font-medium text-gray-700 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white hover:text-gray-900"
              >
                STA130 샘플 보기
              </Link>
            </div>
          </div>
        </div>
      </div>,
    ],
    'social media': [
      <div
        key={2}
        className="mx-auto mt-6 max-w-5xl rounded-3xl bg-white px-6 py-8 text-left shadow-sm shadow-slate-200/70 ring-1 ring-slate-100 sm:px-10 sm:py-10"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-kcc-theme/70">
              Stay connected
            </p>
            <h2 className="mt-1 text-xl font-semibold text-gray-900">
              UTKCC Social Media
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              행사 소식, 모집 공고, 꿀팁 리소스를 가장 빠르게 받아보고 싶다면 UTKCC
              공식 채널을 팔로우해 주세요.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            target="_blank"
            href="https://www.instagram.com/utkcc_/"
            rel="noopener noreferrer"
            className="group flex flex-col items-center rounded-2xl bg-slate-50 px-4 py-5 text-center shadow-sm shadow-slate-100 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
          >
            <div className="relative mb-3 h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
              <Image
                alt="Instagram"
                src={instagramLogo}
                fill
                placeholder="blur"
                sizes="100%"
                className="object-contain"
              />
            </div>
            <p className="text-xs font-semibold text-gray-900">Instagram</p>
            <p className="mt-1 text-[11px] text-gray-500">@utkcc_</p>
          </Link>

          <Link
            target="_blank"
            href="https://www.youtube.com/@utkcc3050"
            rel="noopener noreferrer"
            className="group flex flex-col items-center rounded-2xl bg-slate-50 px-4 py-5 text-center shadow-sm shadow-slate-100 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
          >
            <div className="relative mb-3 h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
              <Image
                alt="YouTube"
                src={youtubeLogo}
                fill
                placeholder="blur"
                sizes="100%"
                className="object-contain"
              />
            </div>
            <p className="text-xs font-semibold text-gray-900">YouTube</p>
            <p className="mt-1 text-[11px] text-gray-500">@utkcc3050</p>
          </Link>

          <Link
            target="_blank"
            href="https://www.facebook.com/groups/utkcc/"
            rel="noopener noreferrer"
            className="group flex flex-col items-center rounded-2xl bg-slate-50 px-4 py-5 text-center shadow-sm shadow-slate-100 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
          >
            <div className="relative mb-3 h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
              <Image
                alt="Facebook"
                src={facebookLogo}
                fill
                placeholder="blur"
                sizes="100%"
                className="object-contain"
              />
            </div>
            <p className="text-xs font-semibold text-gray-900">Facebook</p>
            <p className="mt-1 text-[11px] text-gray-500">UTKCC</p>
          </Link>

          <Link
            target="_blank"
            href="https://www.linkedin.com/company/utkcc/mycompany/"
            rel="noopener noreferrer"
            className="group flex flex-col items-center rounded-2xl bg-slate-50 px-4 py-5 text-center shadow-sm shadow-slate-100 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
          >
            <div className="relative mb-3 h-12 w-12 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
              <Image
                alt="LinkedIn"
                src={linkedInLogo}
                fill
                placeholder="blur"
                sizes="100%"
                className="object-contain"
              />
            </div>
            <p className="text-xs font-semibold text-gray-900">LinkedIn</p>
            <p className="mt-1 text-[11px] text-gray-500">UTKCC</p>
          </Link>
        </div>
      </div>,
    ],
  };

  return (
    <PageIntro
      pageName="resources"
      pageSlogan={<>UTKCC가 제공하는 리소스</>}
      pageExp={
        <>
          멤버십 소지자에게는 매년 60개 이상의 강의 후기와 전공·교양 수업 대비에
          유용한 안티캘린더 및 자료집을 제공합니다.
          <span className="my-3 w-full block" />
          UTKCC의 최신 소식과 행사 정보를 소셜 미디어에서 확인해보세요!
          <span className="text-center flex justify-center my-2">
            <Link
              className="text-center px-7 py-2.5 bg-kcc-theme hover:bg-kcc-theme-darker mt-4 text-white text-opacity-90 hover:text-opacity-100 text-sm w-fit rounded-full transition shadow-sm hover:shadow-md hover:-translate-y-0.5"
              target="_blank"
              rel="noopener noreferrer"
              href={joinMemberShipLink}
            >
              멤버십 신청하기
            </Link>
          </span>
        </>
      }
    >
      <MenuBar
        defaultLabel="anti-calendar"
        columnNumber={1}
        data={resourcesData}
      />
    </PageIntro>
  );
}
