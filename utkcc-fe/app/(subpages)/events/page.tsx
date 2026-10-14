import { Metadata } from 'next';
import EventCalendar from './eventCalendar';

export const metadata: Metadata = {
  title: 'Events',
};

export default function Events() {
  return <EventCalendar />;
}
