import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import PresidentModalButton from './presidentModal';
import { deptList, execData } from '@/data/executives-data';

// Member cards and grouping, shared by the Executives page and the homepage's
// executives section.

export interface ExecInfo {
  imageSrc: string;
  position: string;
  name: string;
  program: string;
  intro: string[];
  id: number;
}

// TODO: optimize, rewrite using Object.groupBy when released
export function getExecutives() {
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
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.045)] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.075)]">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {imageSrc ? (
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
        ) : (
          <div
            aria-label={`${name} executive headshot placeholder`}
            className="h-full w-full bg-gray-50"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5 text-left lg:p-5">
        <div
          className={`text-[8px] uppercase tracking-[0.12em] lg:text-[11px] lg:tracking-[0.14em] ${getRoleClass(
            position,
          )}`}
        >
          {formatPosition(position)}
        </div>
        <div className="mt-1.5 text-base font-bold text-black lg:mt-2 lg:text-xl">
          {name}
        </div>
        <div className="mt-1 min-h-[2.1rem] text-[10px] capitalize leading-snug text-kcc-gray/60 lg:min-h-[1.25rem] lg:text-xs">
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
    .map(part =>
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
  if (normalizedPosition.includes('manager')) {
    return 'font-bold text-kcc-gray';
  }
  if (normalizedPosition.includes('intern')) {
    return 'font-bold text-gray-400';
  }

  return 'font-bold text-kcc-gray/80';
}

export function getDeptExecCells(deptExecList: ExecInfo[]) {
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
