export type RecapLine = 'spring' | 'summer' | 'fall' | 'winter';

export interface RecapLineConfig {
  key: RecapLine;
  label: string;          // UI 표시용
  fileUrl: string;        // public 경로: /assets/pdf/...
  totalPages: number;     // 임시 값 OK
  pageStart?: number;     // 나중에 진짜 리캡 pdf로 바꿀 때 채움
  pageEnd?: number;       // 나중에 진짜 리캡 pdf로 바꿀 때 채움
}

export const RECAP_19TH_LINES: RecapLineConfig[] = [
  {
    key: 'spring',
    label: 'Spring',
    fileUrl: '/assets/pdf/sta130-sample.pdf',
    totalPages: 10,
  },
  {
    key: 'summer',
    label: 'Summer',
    fileUrl: '/assets/pdf/sta130-sample.pdf',
    totalPages: 10,
  },
  {
    key: 'fall',
    label: 'Fall',
    fileUrl: '/assets/pdf/sta130-sample.pdf',
    totalPages: 10,
  },
  {
    key: 'winter',
    label: 'Winter',
    fileUrl: '/assets/pdf/sta130-sample.pdf',
    totalPages: 10,
  },
];

export const RECAP_19TH_BY_KEY: Record<RecapLine, RecapLineConfig> =
  Object.fromEntries(RECAP_19TH_LINES.map(x => [x.key, x])) as Record<
    RecapLine,
    RecapLineConfig
  >;
