import { Metadata } from 'next';
import ContactSection from './contactSection';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return <ContactSection />;
}
