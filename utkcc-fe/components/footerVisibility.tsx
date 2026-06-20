'use client';

import { usePathname } from 'next/navigation';

export default function FooterVisibility({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/contact' || pathname.startsWith('/contact/')) return null;

  return (
    <footer id="footer" className="mt-auto">
      {children}
    </footer>
  );
}
