'use client';

import { useState } from 'react';
import PageIntro from '@/components/pageIntro';
import ResourcesShowcase, { type ResourceView } from './resourcesShowcase';

const viewLabel: Record<ResourceView, string> = {
  'course-map': '코스맵',
  'study-package': '족보',
};

// Owns the 코스맵/족보 toggle so the slogan can follow the selected tab.
export default function ResourcesSection({
  salesStatusText,
}: {
  salesStatusText: string;
}) {
  const [view, setView] = useState<ResourceView>('course-map');

  return (
    <PageIntro
      pageName="resources"
      childrenAlign="start"
      pageSlogan={
        <div className="text-3xl font-bold leading-[1.08] tracking-tight text-black lg:text-6xl">
          선배들의 경험이
          <span className="block whitespace-nowrap">
            담긴{' '}
            <span
              key={view}
              className="inline-block animate-[menu-panel-in_260ms_cubic-bezier(0.22,1,0.36,1)] text-kcc-theme motion-reduce:animate-none"
            >
              {viewLabel[view]}
            </span>
          </span>
        </div>
      }
      pageExp={
        <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-kcc-gray lg:text-base lg:leading-relaxed">
          <p>
            어떤 수업을 들어야 할지 고민된다면 코스맵에서, 시험 대비 핵심 정리가
            필요하다면 족보에서 답을 찾아보세요.
          </p>
          <p>
            UTKCC가 선배들의 실제 수강 경험과 시험 노하우를 담아 만든 자료예요.
          </p>
          <p className="font-bold text-kcc-theme">{salesStatusText}</p>
        </div>
      }
    >
      <ResourcesShowcase view={view} onViewChange={setView} />
    </PageIntro>
  );
}
