import PageIntro from '@/components/pageIntro';
import MenuBar from '@/components/menubar';
import { getDeptExecCells, getExecutives } from './executiveCards';
import { deptDescriptions, deptList } from '@/data/executives-data';
import { KCC_TH_NOW } from '@/data/change-annually-data';
import { MenuSelectionProvider } from '@/components/menuSelectionContext';
import ExecutiveDeptDescription from './executiveDeptDescription';

// The homepage's executives section: one department at a time, picked from
// the tabs. The /executives page lists every department instead.
export default function ExecutivesHomeIntro() {
  const deptContent = Object.fromEntries(
    deptList.map((deptName: string) => [
      deptName,
      getDeptExecCells(getExecutives()[deptName]),
    ]),
  );

  return (
    <MenuSelectionProvider defaultLabel={deptList[0]}>
      <PageIntro
        pageName="executives"
        pageSlogan={
          <div>
            <div className="text-2xl font-bold leading-tight text-black lg:text-6xl">
              UTKCC {KCC_TH_NOW}기{' '}
              <span className="text-kcc-theme">임원진</span>
            </div>
          </div>
        }
        pageExp={
          <ExecutiveDeptDescription
            defaultLabel={deptList[0]}
            descriptions={deptDescriptions}
          />
        }
      >
        <MenuBar
          defaultLabel={deptList[0]}
          columnNumber={2}
          data={deptContent}
        />
      </PageIntro>
    </MenuSelectionProvider>
  );
}
