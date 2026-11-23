import { Metadata } from 'next';
import ResourcesSection from './resourcesSection';
import {
  isEarlyBirdActive,
  studyPackageSeason,
} from '@/data/study-package-data';

export const metadata: Metadata = {
  title: 'Resources',
};

export const revalidate = 3600;

export default function Resources() {
  const salesStatusText = isEarlyBirdActive()
    ? `${studyPackageSeason} 얼리버드 판매가 진행 중입니다.`
    : `${studyPackageSeason} 정가 판매가 진행 중입니다.`;

  return <ResourcesSection salesStatusText={salesStatusText} />;
}
