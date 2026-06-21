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

  const handleMenuChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const category = e.currentTarget.outerText.toLowerCase();
    setSelectedCategory(category);
  };

  return (
    <div className="w-full">
      <div className="w-full flex lg:flex-wrap border-b border-b-gray-200 text-kcc-gray overflow-x-auto gap-2 pb-3 text-xs whitespace-nowrap justify-items-center">
        {Object.keys(data).map((d, i) => (
          <div
            key={i}
            className={`cursor-pointer px-2 py-1 capitalize transition-colors duration-200 ${
              d === selectedCategory
                ? 'font-bold text-kcc-theme'
                : 'hover:text-kcc-theme'
            }`}
            onClick={handleMenuChange}
          >
            {d}
          </div>
        ))}
      </div>
      <div
        // TODO: more columns to map as objects after interns come in
        className={`grid ${
          columnNumber === 1
            ? 'grid-cols-1 gap-x-4 p-3'
            : 'grid-cols-2 gap-x-3 px-0 py-4'
        } gap-y-8 sm:gap-x-8 sm:p-3 lg:gap-x-10 lg:p-5`}
      >
        {data[selectedCategory]}
      </div>
    </div>
  );
}
