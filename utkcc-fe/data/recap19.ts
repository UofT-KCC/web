export type Recap19thLineKey = 'spring' | 'summer' | 'fall' | 'winter';

export type Recap19thStation = {
  key: string;   
  label: string; 
  page: number;  
};

export type Recap19thLine = {
  key: Recap19thLineKey;
  label: string;
  title: string;

  pdfPath: string;

  pageStart: number;
  pageEnd: number;

  stations: Recap19thStation[];
};

export const RECAP_19TH_LINES: Recap19thLine[] = [
  {
    key: 'spring',
    label: 'Spring',
    title: '18th Recap — Spring',
    pdfPath: '/assets/pdf/recap-line1-18th.pdf',
    pageStart: 1,
    pageEnd: 8,
    stations: [
      { key: 'jan', label: '1월', page: 1 },
      { key: 'feb', label: '2월', page: 2 },
      { key: 'mar', label: '3월', page: 3 },
      { key: 'apr', label: '4월', page: 8 },
    ],
  },
  {
    key: 'summer',
    label: 'Summer',
    title: '19th Recap — Summer',
    pdfPath: '/assets/pdf/recap-line2-19th.pdf',
    pageStart: 1,
    pageEnd: 8,
    stations: [
      { key: 'may', label: '5월', page: 1 },
      { key: 'jun', label: '6월', page: 2 },
      { key: 'jul', label: '7월', page: 5 },
      { key: 'aug', label: '8월', page: 8 },
    ],
  },
  {
    key: 'fall',
    label: 'Fall',
    title: '19th Recap — Fall',
    pdfPath: '/assets/pdf/recap-line3-19th.pdf',
    pageStart: 1,
    pageEnd: 11,
    stations: [
      { key: 'sep', label: '9월', page: 1 },
      { key: 'oct', label: '10월', page: 6 },
      { key: 'nov', label: '11월', page: 8 },
      { key: 'dec', label: '12월', page: 11 },
    ],
  },
  {
    key: 'winter',
    label: 'Winter',
    title: '19th Recap — Winter',
    pdfPath: '/assets/pdf/recap-line4-19th.pdf',
    pageStart: 1,
    pageEnd: 8,
    stations: [
      { key: 'jan', label: '1월', page: 1 },
      { key: 'feb', label: '2월', page: 2 },
      { key: 'mar', label: '3월', page: 5 },
      { key: 'apr', label: '4월', page: 8 },
    ],
  },
];

export const RECAP_19TH_BY_KEY: Record<Recap19thLineKey, Recap19thLine> = {
  spring: RECAP_19TH_LINES[0],
  summer: RECAP_19TH_LINES[1],
  fall: RECAP_19TH_LINES[2],
  winter: RECAP_19TH_LINES[3],
};
