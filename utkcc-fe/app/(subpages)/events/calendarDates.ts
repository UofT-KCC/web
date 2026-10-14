// Local noon keeps calendar arithmetic clear of daylight-saving transitions.
export function parseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day, 12);
}

export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function monthDays(month: string) {
  const first = parseDate(`${month}-01`);
  const count = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  return Array.from({ length: Math.ceil((first.getDay() + count) / 7) * 7 }, (_, index) => {
    const day = new Date(first.getFullYear(), first.getMonth(), index - first.getDay() + 1, 12);
    return dateKey(day);
  });
}

export function shiftMonth(month: string, offset: number) {
  const date = parseDate(`${month}-01`);
  date.setMonth(date.getMonth() + offset);
  return dateKey(date).slice(0, 7);
}

export function occursOn(event: { date: string; endDate?: string }, day: string) {
  return event.date <= day && (event.endDate || event.date) >= day;
}

export function formatDate(date: string, options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }) {
  return parseDate(date).toLocaleDateString('en-CA', options);
}
