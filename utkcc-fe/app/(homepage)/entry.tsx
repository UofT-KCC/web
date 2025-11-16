import Image from 'next/image';
import LogoImage from 'public/assets/images/big-logo.png';
import './entry.css';

/**
 * 홈페이지 LCP (Largest Contentful Paint)를 띄우는 애니메이션.
 */
export default function Entry() {
  const animationName = 'upfold';

  const Logo = (
    <Image
      src={LogoImage}
      alt=""
      fill={true}
      sizes={'100%'}
      priority={true}
      className={`
        object-contain
        scale-[0.32]           /* 모바일: 기존 0.4 → 0.32로 균형 조정 */
        sm:scale-[0.30]
        md:scale-[0.28]
        lg:scale-[0.22]        /* PC: 기존 0.25 → 0.22로 살짝 축소 */
        xl:scale-[0.20]
        ${animationName}-logo
      `}
    />
  );

  const ScrollInstructor = (
    <div
      className={`
        absolute w-full bottom-[6dvh]
        opacity-60 text-center text-sm
        ${animationName}-logo
      `}
    >
      아래로 스크롤하세요.
    </div>
  );

  const Text1 = (
    <div className="font-normal text-[1.05rem] md:text-lg leading-relaxed text-center text-gray-600 px-6">
      <p className={`${animationName}-text-1`}>
        학업 성취와 커리어의 첫 시작점 <br />
        모두 이 곳에서 시작하세요. <br />
      </p>
      <p className={`${animationName}-text-2 mt-2`}>
        이제껏 경험 못 했던 한인 경영동아리, <br />
        <span className="text-kcc-theme font-semibold">UTKCC</span>와 함께라면 <br />
        당신의 유티는 분명 더 즐거울거예요.
      </p>
    </div>
  );

  const Text2 = (
    <div
      className={`
        font-normal text-lg md:text-xl text-center leading-relaxed
        ${animationName}-slogan
      `}
    >
      Be Part of a
      <br /> <span className="text-kcc-theme font-semibold">Professional</span> Community.
    </div>
  );

  const GroupName = (
    <div className={`
      flex flex-col text-center
      ${animationName}-group-name
    `}>
      <div className="font-bold text-
