import Image from 'next/image';
import eventsImage from 'public/assets/images/events-image.png';
import Link from 'next/link';

export default function EventsHomeIntro() {
  return (
    <article className="relative h-auto w-full px-5 sm:px-6 lg:grid lg:grid-flow-col-dense lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.25fr)] lg:grid-rows-3-auto-rows lg:items-end lg:gap-x-[5vw] lg:px-0">
      <div id="events" className="absolute -top-32" />
      <div className="self-end text-xl font-bold capitalize text-kcc-theme">
        events
      </div>
      <div className="my-6 text-2xl font-normal text-black">
        <div className="events-slogan text-5xl lg:text-7xl">
          <span className="events-slogan-prefix">때론</span>
          <span className="events-slogan-rotator" aria-hidden="true">
            <span>아카데믹하게</span>
            <span>프로페셔널하게</span>
            <span>즐겁게</span>
          </span>
          <span className="sr-only">
            때론 아카데믹하게, 때론 프로페셔널하게, 때론 즐겁게
          </span>
        </div>
      </div>
      <div className="row-span-2 row-start-2 mx-auto flex h-fit w-full max-w-full items-center justify-center self-center">
        <Image
          alt="events image"
          className="h-auto w-fit rounded-lg object-contain lg:max-h-[60vh]"
          placeholder="blur"
          src={eventsImage}
        />
      </div>
      <div className="my-6 max-w-[480px] overflow-visible break-keep text-sm font-normal leading-relaxed text-kcc-gray hyphens-none self-start lg:mt-0 lg:text-base lg:leading-relaxed">
        UTKCC는 학업, 커리어, 그리고 친목이 균형 있게 어우러지는 다양한
        이벤트를 기획합니다. 전공 수업 튜토리얼과 학업 지원 프로그램부터,
        관심 있는 산업의 alumni와 직접 교류할 수 있는 네트워킹 세션, 그리고
        바쁜 학교 생활 속에서 새로운 사람들과 편하게 어울릴 수 있는 소셜
        이벤트까지.
        <span className="my-3 block w-full" />
        UTKCC 안에서 배우고, 연결되고, 함께 즐기는 순간들을 만나보세요.
        <Link
          href={`/events`}
          className="group mx-auto mt-5 flex w-fit items-center gap-1.5 rounded-full bg-gray-200 px-5 py-2 text-xs font-bold text-black shadow-sm ring-1 ring-black/5 transition-all duration-300 ease-out hover:bg-white hover:text-kcc-theme hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:ring-kcc-theme/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-kcc-theme/30 active:scale-[0.98] lg:mx-0 lg:gap-2 lg:px-7 lg:py-2.5 lg:text-sm"
        >
          <span>Learn More</span>
          <span className="text-sm leading-none transition-transform duration-300 ease-out group-hover:translate-x-0.5 lg:text-base">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
