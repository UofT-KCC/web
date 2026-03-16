'use client';

import { LayoutGroup, MotionConfig } from 'framer-motion';

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig transition={{ duration: 0.22, ease: 'easeOut' }}>
      <LayoutGroup id="recap-shared">{children}</LayoutGroup>
    </MotionConfig>
  );
}
