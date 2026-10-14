// Run: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/test-event-calendar.ts
import assert from 'node:assert/strict';
import { dateKey, monthDays, occursOn, parseDate, shiftMonth } from '../app/(subpages)/events/calendarDates';
import { calendarEvents } from '../data/calendar-events';

const october = monthDays('2026-10');
assert.equal(october.length, 35);
assert.equal(october[0], '2026-09-27');
assert.equal(october[4], '2026-10-01');
assert.equal(october[34], '2026-10-31');
assert.equal(monthDays('2026-08').length, 42);
assert.ok(monthDays('2028-02').includes('2028-02-29'));
assert.ok(!monthDays('2027-02').includes('2027-02-29'));
assert.equal(shiftMonth('2026-12', 1), '2027-01');
assert.equal(shiftMonth('2026-01', -1), '2025-12');
assert.equal(dateKey(parseDate('2026-11-01')), '2026-11-01');
const readingWeek = calendarEvents.find(event => event.id === 'reading-week')!;
assert.ok(occursOn(readingWeek, '2026-10-26'));
assert.ok(occursOn(readingWeek, '2026-10-30'));
assert.ok(!occursOn(readingWeek, '2026-10-31'));
assert.equal(calendarEvents.filter(event => !event.notice && occursOn(event, '2026-10-12')).length, 2);
assert.equal(new Set(calendarEvents.map(event => event.id)).size, calendarEvents.length);
console.log('Calendar checks passed: month boundaries, leap years, date ranges, and overlapping events.');
