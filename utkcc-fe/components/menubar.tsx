'use client';
import { useState } from 'react';

/**
 * Creates a menu bar with the following:
 * @param defaultLabel - the default category when initially loaded
 * @param columnNumber - the number of columns to display on a single row
 * @param data - object with categories as keys and JSX Elements as values
 */
export default function MenuBar({
  defaultLabel,
  columnNumber,
  data,
}: {
  defaultLabel: string;
  columnNumber: number;
  data: { [k: string]: JSX.Element[] };
}) {
  const [selectedCategory, setSelectedCategory] = useState(defaultLabel);

  const handleMenuChange = (category: string) => {
    setSelectedCategory(category);
  };

  const formatMenuLabel = (label: string) =>
    label === 'social' ? 'socials' : label;

  return (
    <div className="w-full">
      <div className="menu-scrollbar-hidden w-full overflow-x-auto border-b border-b-gray-200">
        <div className="flex min-w-max gap-2 pb-3 text-xs font-semibold text-kcc-gray whitespace-nowrap lg:flex-wrap">
          {Object.keys(data).map((d, i) => (
            <button
              type="button"
              key={i}
              className={`relative rounded-full px-3 py-2 capitalize transition-all duration-300 ease-out ${
                d === selectedCategory
                  ? 'bg-kcc-theme/5 text-kcc-theme'
                  : 'hover:-translate-y-0.5 hover:bg-slate-50 hover:text-kcc-theme'
              }`}
              onClick={() => handleMenuChange(d)}
            >
              {formatMenuLabel(d)}
              <span
                className={`absolute -bottom-[13px] left-3 right-3 h-0.5 rounded-full bg-kcc-theme shadow-[0_2px_8px_rgba(5,60,140,0.25)] transition-all duration-300 ease-out ${
                  d === selectedCategory
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-1 opacity-0'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div
        key={selectedCategory}
        // TODO: more columns to map as objects after interns come in
        className={`grid animate-[menu-panel-in_260ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:animate-none ${
          columnNumber === 1
            ? 'grid-cols-1 gap-x-4 px-0 py-4 sm:p-3'
            : 'grid-cols-2 gap-x-3 px-0 py-4'
        } gap-y-8 sm:gap-x-8 sm:p-3 lg:gap-x-10 lg:p-5`}
      >
        {data[selectedCategory]}
      </div>
    </div>
  );
}
