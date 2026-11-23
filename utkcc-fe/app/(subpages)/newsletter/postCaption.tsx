'use client';

import { useState } from 'react';

// Instagram-style caption: on phones it starts as a two-line preview with
// "더 보기"; from `sm` up the full caption is always shown.
export default function PostCaption({
  title,
  lines,
  hashtags,
}: {
  title: string;
  lines: string[];
  hashtags: string[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="text-[13px] leading-[1.55] text-slate-800">
      {!expanded && (
        <div className="sm:hidden">
          <p className="line-clamp-2 break-keep">
            <span className="mr-1.5 font-semibold text-slate-900">
              utkccmedia
            </span>
            💸 {title} {lines[0]}
          </p>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-0.5 text-slate-500 hover:text-slate-800"
          >
            더 보기
          </button>
        </div>
      )}

      <div className={`space-y-3 ${expanded ? '' : 'hidden sm:block'}`}>
        <p className="break-keep">
          <span className="mr-1.5 font-semibold text-slate-900">
            utkccmedia
          </span>
          💸 {title}
        </p>
        {lines.map(line => (
          <p key={line} className="break-keep">
            {line}
          </p>
        ))}
        <p className="flex flex-wrap gap-x-1.5 text-[#00376b]">
          {hashtags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </p>
      </div>
    </div>
  );
}
