import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';
import PageIntro from '@/components/pageIntro';
import MenuBar from '@/components/menubar';
import { sponsorData } from '@/data/sponsors-data';
import { getURL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Sponsors',
};

export default function Sponsors() {
  const data: { [k: string]: JSX.Element[] } = Object.fromEntries(
    sponsorData.map((sponsorInfo, i) => [
      sponsorInfo.name.toLowerCase(),
      [<SponsorCell {...sponsorInfo} id={i} key={i} />],
    ]),
  );

  return (
    <PageIntro
      pageName="sponsors"
      pageSlogan={<>UTKCC와 함께하는 파트너십</>}
      pageExp={
        <div className="space-y-4 text-sm leading-relaxed text-gray-700 max-w-2xl">
          <p>
            UTKCC는 토론토에 위치한 다양한 한인 식당 및 로컬 비즈니스와 제휴를 맺고,
            멤버십 소지자분들께 할인, 경품 등의 혜택을 제공하고 있습니다.
          </p>
          <p>
            친구들과의 식사, 동아리 모임, 시험 끝난 뒤의 소확행까지 — 제휴 매장을 통해
            더 합리적인 가격으로 즐겨보세요.
          </p>
          <p>멤버십에 가입하시면 더 많은 파트너 혜택을 순차적으로 받아보실 수 있습니다.</p>
        </div>
      }
    >
      <MenuBar
        defaultLabel={Object.keys(data)[0]}
        columnNumber={1}
        data={data}
      />
    </PageIntro>
  );
}

interface SponsorInfo {
  name: string;
  exp: string;
  imageSrc: string;
  websiteUrl: string;
  locationUrl: string;
  id: number;
}

function getSponsors() {
  const data: { [k: string]: JSX.Element[] } = Object.fromEntries(
    sponsorData.map((sponsorInfo, i) => [
      sponsorInfo.name.toLowerCase(),
      [<SponsorCell {...sponsorInfo} id={i} key={i} />],
    ]),
  );
}

async function SponsorCell({
  name,
  exp,
  imageSrc,
  websiteUrl,
  locationUrl,
  id,
}: SponsorInfo) {
  const blurImageUrl = await getBase64(getURL(imageSrc));

  return (
    <div
      key={id}
      className="mx-auto mt-6 max-w-4xl rounded-3xl bg-white px-6 py-8 text-left shadow-sm shadow-slate-200/70 ring-1 ring-slate-100 sm:px-10 sm:py-10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative mx-auto h-40 w-40 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:mx-0 sm:h-48 sm:w-48">
          <Image
            key={id}
            alt={name}
            src={imageSrc}
            fill
            blurDataURL={blurImageUrl}
            sizes="100%"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-4 text-sm leading-relaxed text-gray-700">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-kcc-theme/70">
              Partner
            </p>
            <h2 className="mt-1 text-xl font-semibold text-gray-900">{name}</h2>
          </div>

          <p>{exp}</p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link
              className="inline-flex flex-1 items-center justify-center rounded-full bg-kcc-theme px-4 py-2 text-xs font-medium text-white text-opacity-90 shadow-sm shadow-kcc-theme/30 transition hover:-translate-y-0.5 hover:bg-kcc-theme-darker hover:text-opacity-100 hover:shadow-md"
              target="_blank"
              rel="noopener noreferrer"
              href={websiteUrl}
            >
              웹사이트
            </Link>
            <Link
              className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-gray-700 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
              href={locationUrl}
            >
              위치 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    return base64;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
