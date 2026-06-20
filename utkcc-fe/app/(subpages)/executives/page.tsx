import { Metadata } from 'next';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import PageIntro from '@/components/pageIntro';
import MenuBar from '@/components/menubar';
import { getURL } from '@/lib/utils';
import PresidentModalButton from './presidentModal';
import { deptList, execData } from '@/data/executives-data';
import { KCC_TH_NOW } from '@/data/change-annually-data';

export const metadata: Metadata = {
  title: 'Executives',
};

export default function Executives() {
  const deptContent = Object.fromEntries(
    deptList.map((deptName: string) => [
      deptName,
      getDeptExecCells(getExecutives()[deptName]),
    ]),
  );

  return (
    <PageIntro
      pageName="executives"
      pageSlogan={
        <div>
          <div className="text-2xl font-bold leading-tight text-black lg:text-6xl">
            UTKCC {KCC_TH_NOW}기 임원진
          </div>
          <div className="mt-3 text-sm font-bold text-kcc-theme/75 lg:mt-4 lg:text-lg">
            {deptList.length}개의 부서가 함께 만들어가는 UTKCC
          </div>
        </div>
      }
      pageExp={
        <div className="text-sm leading-relaxed text-kcc-gray lg:text-base lg:leading-relaxed">
          UTKCC는 연도별 기수제로 운영되며, 현재 회장단과 다양한 전문 부서가
          함께 커뮤니티를 이끌어가고 있습니다.
          <span className="my-3 w-full block" />
          학업, 커리어, 네트워킹, 소셜 이벤트까지 각자의 역할 안에서 UTKCC의
          경험을 만들어가는 {KCC_TH_NOW}기 임원진을 부서별로 만나보세요.
        </div>
      }
    >
      <MenuBar defaultLabel={deptList[0]} columnNumber={2} data={deptContent} />
    </PageIntro>
  );
}

interface ExecInfo {
  imageSrc: string;
  position: string;
  name: string;
  program: string;
  intro: string[];
  id: number;
}

// TODO: optimize, rewrite using Object.groupBy when released
function getExecutives() {
  const deptContent: { [dept: string]: any[] } = Object.fromEntries(
    deptList.map((deptName: string) => [deptName, []]),
  );

  execData.forEach((execInfo, i) => {
    deptContent[execInfo.dept].push({
      name: execInfo.name,
      program: execInfo.program,
      position: execInfo.position,
      imageSrc: execInfo.imageSrc,
      intro: execInfo.intro,
      id: i,
    } as ExecInfo);
  });

  return deptContent;
}

async function ExecutiveCell({
  imageSrc,
  position,
  name,
  program,
  intro,
  id,
}: ExecInfo) {
  // const blurImageUrl = await getBase64(getURL(imageSrc));

  return (
    <article className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm shadow-black/[0.04] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(0,0,0,0.07)]">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          alt={`${name} executive headshot`}
          src={imageSrc}
          fill={true}
          sizes={'100%'}
          // placeholder="blur"
          // blurDataURL={blurImageUrl}
          className="border-0 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          key={id}
        />
      </div>
      <div className="p-3 text-left lg:p-5">
        <div
          className={`text-[8px] uppercase tracking-[0.1em] lg:text-[11px] lg:tracking-[0.14em] ${getRoleClass(
            position,
          )}`}
        >
          {formatPosition(position)}
        </div>
        <div className="mt-1.5 text-base font-bold text-black lg:mt-2 lg:text-xl">
          {name}
        </div>
        <div className="mt-1 min-h-[1rem] text-[10px] capitalize leading-snug text-kcc-gray/60 lg:min-h-[1.25rem] lg:text-xs">
          {program}
        </div>
        {intro !== undefined && intro.length !== 0 && (
          <PresidentModalButton position={position} name={name} intro={intro} />
        )}
      </div>
    </article>
  );
}

function formatPosition(position: string) {
  return position
    .split(/([\s-])/)
    .map((part) =>
      part === ' ' || part === '-'
        ? part
        : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join('');
}

function getRoleClass(position: string) {
  const normalizedPosition = position.toLowerCase();

  if (normalizedPosition.includes('president')) {
    return 'font-bold text-black';
  }
  if (normalizedPosition.includes('director')) {
    return 'font-bold text-black/80';
  }
  if (normalizedPosition.includes('committee')) {
    return 'font-bold text-kcc-gray';
  }
  if (normalizedPosition.includes('intern')) {
    return 'font-bold text-gray-400';
  }

  return 'font-bold text-kcc-gray/80';
}

function getDeptExecCells(deptExecList: ExecInfo[]) {
  return deptExecList.map(
    ({ imageSrc, name, position, program, intro, id }) => (
      <ExecutiveCell
        key={id}
        imageSrc={imageSrc}
        name={name}
        position={position}
        program={program}
        intro={intro}
        id={id}
      />
    ),
  );
}

/**
 * Get the base64 blurred image url from the href source url
 */
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
