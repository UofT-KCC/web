import { Metadata } from 'next';
import PageIntro from '@/components/pageIntro';
import ResourcesShowcase from './resourcesShowcase';

export const metadata: Metadata = {
  title: 'Resources',
};

export default function Resources() {
  return (
    <PageIntro
      pageName="resources"
      childrenAlign="start"
      pageSlogan={
        <div className="text-3xl font-bold leading-[1.05] tracking-tight text-black lg:text-6xl">
          <span className="block lg:inline">선배들의 경험이 담긴</span>{' '}
          <span className="mt-1 inline-block text-kcc-theme lg:mt-0">코스맵 & 족보</span>
        </div>
      }
      pageExp={
        <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-kcc-gray lg:text-base lg:leading-relaxed">
          <p>
            어떤 수업을 들어야 할지 고민된다면 코스맵에서, 시험 대비 핵심
            정리가 필요하다면 족보에서 답을 찾아보세요.
          </p>
          <p>
            UTKCC가 선배들의 실제 수강 경험과 시험 노하우를 담아 만든
            자료예요.
          </p>
          <p className="font-bold text-kcc-theme">
            2026–2027 얼리버드 판매가 진행 중입니다.
          </p>
        </div>
      }
    >
      <ResourcesShowcase />
    </PageIntro>
  );
}
