export function ArrowUpRightIcon({
  className = 'h-4 w-4',
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`fill-none ${className}`}
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path
        d="M5 15 15 5M7 5h8v8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`fill-none ${className}`}
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M15.5 8.2c0 4-5.5 8-5.5 8s-5.5-4-5.5-8a5.5 5.5 0 1 1 11 0Z" />
      <circle cx="10" cy="8" r="1.8" />
    </svg>
  );
}

export function InstagramIcon({
  className = 'h-4 w-4',
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`fill-none ${className}`}
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3" y="3" width="14" height="14" rx="4.2" />
      <circle cx="10" cy="10" r="3.2" />
      <circle cx="14.2" cy="5.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MemberCardIcon({
  className = 'h-5 w-5',
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`fill-none ${className}`}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16c.6-1.4 1.7-2 3-2s2.4.6 3 2M14.5 10H18M14.5 13.5H17" />
    </svg>
  );
}

export function StoreIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`fill-none ${className}`}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9.5 5.4 5h13.2L20 9.5" />
      <path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" />
      <path d="M5.5 12.5V19h13v-6.5M10 19v-3.5h4V19" />
    </svg>
  );
}

export function GiftIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`fill-none ${className}`}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="9" width="16" height="4" rx="1" />
      <path d="M5.5 13v6.5h13V13M12 9v10.5" />
      <path d="M12 9c-1.2-2.8-4.5-3.6-4.5-1.5C7.5 9 12 9 12 9Zm0 0c1.2-2.8 4.5-3.6 4.5-1.5C16.5 9 12 9 12 9Z" />
    </svg>
  );
}

export function ChevronRightIcon({
  className = 'h-4 w-4',
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`fill-none ${className}`}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 5 5 5-5 5" />
    </svg>
  );
}

export function FlipIcon({
  className = 'h-3.5 w-3.5',
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`fill-none ${className}`}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.5 8A6 6 0 0 0 4.7 6.2M4.5 12a6 6 0 0 0 10.8 1.8" />
      <path d="M4.5 3.5v3h3M15.5 16.5v-3h-3" />
    </svg>
  );
}
