import { Metadata } from 'next';
import DeptNav from './deptNav';
import {
  getDeptExecCells,
  getExecutives,
  type ExecInfo,
} from './executiveCards';
import { deptDescriptions, deptList } from '@/data/executives-data';
import { KCC_TH_NOW } from '@/data/change-annually-data';

export const metadata: Metadata = {
  title: 'Executives',
};

// Every department is listed one after another, so the whole team reads in a
// single scroll.
export default function Executives() {
  const executives = getExecutives();
  const depts = deptList.map(dept => ({
    dept,
    id: deptAnchor(dept),
    label: deptLabel(dept),
  }));

  return (
    <div className="w-full px-1 lg:px-0">
      <header id="executives" className="text-center">
        <p className="text-xl font-bold text-kcc-theme">Executives</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:mt-4 lg:text-6xl">
          UTKCC {KCC_TH_NOW}기 <span className="text-kcc-theme">임원진</span>
        </h1>
      </header>

      <DeptNav
        depts={depts.map(({ dept, id, label }) => ({
          id,
          label: shortLabels[dept] ?? label,
        }))}
      />

      <div className="divide-y divide-gray-200">
        {depts.map(({ dept, id, label }, i) => {
          const members = executives[dept] ?? [];
          // The presidents' entry is a general intro, not about the
          // presidents themselves, so that section shows only its members.
          const description = i === 0 ? undefined : deptDescriptions[dept];

          return (
            <section
              key={dept}
              id={id}
              aria-labelledby={`${id}-title`}
              className="scroll-mt-[calc(132px+env(safe-area-inset-top))] py-12 text-center lg:scroll-mt-[140px] lg:py-20"
            >
              <h2
                id={`${id}-title`}
                className="text-2xl font-bold capitalize tracking-tight text-slate-950 lg:text-4xl"
              >
                {label}
              </h2>
              {description && (
                <div className="mx-auto mt-4 max-w-2xl break-keep text-sm leading-relaxed text-kcc-gray lg:mt-5 lg:text-[15px]">
                  {description.paragraphs.map(paragraph => (
                    <p key={paragraph} className="mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-8 space-y-6 lg:mt-12 lg:space-y-8">
                {groupByRole(members).map(row => (
                  <div
                    key={row[0].id}
                    className="flex flex-wrap justify-center gap-x-3 gap-y-6 sm:gap-x-5 lg:gap-x-6 lg:gap-y-8"
                  >
                    {getDeptExecCells(row).map(cell => (
                      <div
                        key={cell.key}
                        className="w-[calc(50%-6px)] sm:w-[200px] lg:w-[220px]"
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

// Members sit in one centred row per role, so an odd number of directors or a
// lone intern lines up in the middle instead of trailing off to the left.
const roleOrder = ['president', 'director', 'manager', 'intern'];

function roleRank(position: string) {
  const role = position.toLowerCase();
  const rank = roleOrder.findIndex(name => role.includes(name));
  return rank === -1 ? roleOrder.length : rank;
}

function groupByRole(members: ExecInfo[]) {
  const rows = new Map<number, ExecInfo[]>();
  members.forEach(member => {
    const rank = roleRank(member.position);
    rows.set(rank, [...(rows.get(rank) ?? []), member]);
  });
  return Array.from(rows.keys())
    .sort((a, b) => a - b)
    .map(rank => rows.get(rank) as ExecInfo[]);
}

function deptAnchor(dept: string) {
  return dept.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

function deptLabel(dept: string) {
  return dept === 'social' ? 'socials' : dept;
}

// Shorter names for the department bar, so all of them fit on one line on a
// laptop. Section headings keep the full name.
const shortLabels: { [dept: string]: string } = {
  'corporate relations': 'CR',
  'information technology': 'IT',
  'marketing - poster': 'Poster',
  'marketing - video': 'Video',
};
