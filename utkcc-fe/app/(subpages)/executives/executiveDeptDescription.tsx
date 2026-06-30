'use client';

import { useMenuSelection } from '@/components/menuSelectionContext';

interface DeptDescription {
  paragraphs: string[];
  bullets?: string[];
}

export default function ExecutiveDeptDescription({
  defaultLabel,
  descriptions,
}: {
  defaultLabel: string;
  descriptions: { [dept: string]: DeptDescription };
}) {
  const { selectedCategory } = useMenuSelection(defaultLabel);
  const description =
    descriptions[selectedCategory] ?? descriptions[defaultLabel];

  return (
    <div className="text-sm leading-relaxed text-kcc-gray lg:text-base lg:leading-relaxed">
      {description.paragraphs.map((paragraph) => (
        <p key={paragraph} className="mb-3 last:mb-0">
          {paragraph}
        </p>
      ))}
      {description.bullets !== undefined && description.bullets.length > 0 && (
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          {description.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
