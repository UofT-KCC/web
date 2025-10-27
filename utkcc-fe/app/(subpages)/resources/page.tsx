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
      <div key={0} className="text-center">
        <div className="max-w-[50%] mt-5 mx-auto relative aspect-square rounded-xl">
          <Image
            key={0}
            alt=""
            src={antiCalendarImage}
            fill={true}
            placeholder="blur"
            sizes={'100%'}
            className="aspect-square bg-gray-300 border-0 rounded-lg object-cover"
          />
        </div>
        <div className="my-2 underline underline-offset-2 capitalize">
          Anti-calendar
        </div>
        <div className="mb-1 text-xs">
          이 수업 들어볼까? 과목별 꿀팁과 추천 강의를 한눈에!
        </div>
        <div className="flex flex-col w-max mx-auto">
          <Link
            href="/assets/pdf/anti-calendar-freshmen.pdf"
            target="_blank"
            className="text-xs rounded-lg bg-gray-300 w-full py-2 px-auto mx-auto my-2 hover:bg-gray-200"
          >
            Sample for freshmen
          </Link>
          <Link
            href="/assets/pdf/anti-calendar-upperyears.pdf"
            target="_blank"
            className="text-xs rounded-lg bg-gray-300 w-fit py-2 px-5 mx-auto my-2 hover:bg-gray-200"
          >
            Sample for upper years
          </Link>
        </div>
      </div>,
    ],
    'study package': [
      <div key={1} className="text-center">
        <div className="max-w-[50%] mt-5 mx-auto relative aspect-square rounded-xl">
          <Image
            key={1}
            alt=""
            src={studyPackageImage}
            fill={true}
            placeholder="blur"
            sizes={'100%'}
            className="aspect-square bg-gray-200 border-0 rounded-lg object-cover"
          />
        </div>
        <div className="my-2 underline underline-offset-2 capitalize">
          Study Package
        </div>
        <div className="mb-1 text-xs">
          선배들의 팁, 연습문제, 강의 정리를 한번에!
        </div>
        <div className="flex flex-col w-max mx-auto">
          <Link
            href="/assets/pdf/eco101-sample.pdf"
            target="_blank"
            className="text-xs rounded-lg bg-gray-300 w-full py-2 px-auto mx-auto my-2 hover:bg-gray-200"
          >
            Sample for ECO101
          </Link>
          <Link
            href="/assets/pdf/sta130-sample.pdf"
            target="_blank"
            className="text-xs rounded-lg bg-gray-300 w-fit py-2 px-5 mx-auto my-2 hover:bg-gray-200"
          >
            Sample for STA130
          </Link>
        </div>
      </div>,
    ],
    'social media': [
      <div key={2} className="text-center max-h-[40vw]">
        <div className="my-5 mx-auto relative rounded-xl grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            target="_blank"
            href="https://www.instagram.com/utkcc_/"
            rel="noopener noreferrer"
            className="aspect-square w-full relative rounded-lg overflow-hidden"
          >
            <Image
              alt="Instagram"
              src={instagramLogo}
              fill={true}
              placeholder="blur"
              sizes={'100%'}
            />
          </Link>
          <Link
            target="_blank"
            href="https://www.youtube.com/@utkcc3050"
            rel="noopener noreferrer"
            className="aspect-square w-full relative rounded-lg overflow-hidden"
          >
            <Image
              alt="Youtube"
              src={youtubeLogo}
              fill={true}
              placeholder="blur"
              sizes={'100%'}
            />
          </Link>
          <Link
            target="_blank"
            href="https://www.facebook.com/groups/utkcc/"
            rel="noopener noreferrer"
            className="aspect-square w-full relative rounded-lg overflow-hidden"
          >
            <Image
              alt="Facebook"
              src={facebookLogo}
              fill={true}
              placeholder="blur"
              sizes={'100%'}
            />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/company/utkcc/mycompany/"
            rel="noopener noreferrer"
            className="aspect-square w-full relative rounded-lg overflow-hidden"
          >
            <Image
              alt="LinkedIn"
              src={linkedInLogo}
              fill={true}
              placeholder="blur"
              sizes={'100%'}
            />
          </Link>
        </div>
        <div className="my-2 underline underline-offset-2 capitalize">
          social media
        </div>
        <div className="text-xs">아이콘을 클릭하여 UTKCC를 만나보세요</div>
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
              className="text-center px-6 py-2 bg-kcc-theme hover:bg-kcc-theme-darker mt-4 text-white text-opacity-90 hover:text-opacity-100 text-sm w-fit rounded-xl"
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
