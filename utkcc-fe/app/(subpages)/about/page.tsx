import { Metadata } from 'next';
import Image from 'next/image';
import PageIntro from '@/components/pageIntro';
import aboutImage from '/public/assets/images/about-image.webp';
import AboutModalButton from './aboutModal';

export const metadata: Metadata = {
  title: 'About',
};

export default function About() {
  return (
    <PageIntro
      pageName="about"
      pageSlogan={
        <span className="after:content-['토론토_대학교_\A_한인_경영동아리'] whitespace-pre lg:after:content-['UTKCC'] lg:font-bold lg:text-7xl lg:mb-0" />
      }
      pageExp={
        <>
          UTKCC는 2007년 설립된 토론토대학교 공식 한인 커뮤니티로, 비즈니스,
          네트워킹, 그리고 대학 생활 전반에 관심 있는 한인 학생들이 함께
          성장하는 공간입니다.
          <span className="my-3 w-full block" />
          매년 커리어 세미나, 전공 수업 튜토리얼과 같은 학술 프로그램뿐만 아니라
          신입생 환영회, 할로윈 파티 등 다양한 소셜 이벤트를 통해 한인 학생들의
          교류와 대학 생활을 더욱 풍성하게 만들고 있습니다.
          <span className="my-3 w-full block" />
          또한, UTKCC는 졸업생 네트워크와 외부 기관과의 협력을 통해 지역
          사회와의 연결을 강화하고, 한인 학생 커뮤니티의 지속적인 성장을
          이끌어가고 있습니다.
          <AboutModalButton />
        </>
      }
    >
      <Image
        alt="about image"
        className="w-fit h-auto lg:max-h-[60vh] object-contain rounded-lg"
        placeholder="blur"
        src={aboutImage}
      />
    </PageIntro>
  );
}
