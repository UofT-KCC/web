export default function PageIntro({
  children,
  className = '',
  pageName,
  pageSlogan,
  pageExp,
}: {
  children: React.ReactNode;
  className?: string;
  pageName: string;
  pageSlogan: string | React.ReactNode;
  pageExp: string | React.ReactNode;
}) {
  return (
    <article
      className={`relative h-auto w-full grid-flow-col-dense grid-rows-3-auto-rows items-end gap-x-[5vw] px-5 sm:px-6 lg:grid lg:grid-cols-right-tilt-twin-columns lg:px-0 lg:pt-0 ${className}`}
    >
      <div id={pageName} className="absolute -top-32"></div>
      {/* section intro title */}
      <div className="text-kcc-theme font-bold text-xl capitalize self-end">
        {pageName}
      </div>
      {/* section intro slogans */}
      <div className="text-black font-normal text-2xl my-6">{pageSlogan}</div>
      <div className="max-w-full w-full h-fit flex items-center justify-center self-center mx-auto row-span-2 row-start-2">
        {children}
      </div>
      <div className="break-keep hyphens-auto font-normal my-6 lg:mt-0 text-kcc-gray self-start">
        {pageExp}
      </div>
    </article>
  );
}
