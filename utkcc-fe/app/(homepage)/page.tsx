export default function Home() {
  return (
    <div className="flex flex-col">
      <Entry />

      {/* default: px-8 */}
      <div className="pl-safe-left pr-safe-right">
        <div className="px-4 lg:px-20 z-50 flex flex-col gap-y-[10vh] mb-[5vh]">
          <About />
          <EventsHomeIntro />
          <Executives />
          <Sponsors />
          <Resources />
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
