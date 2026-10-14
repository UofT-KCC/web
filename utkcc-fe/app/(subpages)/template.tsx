// Templates remount on every navigation, so the entrance animation replays
// for each new page while the navbar in the layout stays put.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition flex w-full">{children}</div>;
}
