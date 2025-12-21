import Link from 'next/link';
import {
  kccEmail,
  presEmail,
  vicePresEmail,
  erDirectorEmail,
} from '@/data/change-annually-data';

export default function FooterContactInfo() {
  return (
    <div className="flex flex-col min-h-[20vh] p-8 lg:px-32 bg-kcc-theme text-white font-normal">
      <div className="text-center">Contact Information</div>
      <div className="flex flex-col my-3 text-xs">
        <div>General Inquiries: {kccEmail}</div>
        <div>President: {presEmail}</div>
        <div>Vice-president: {vicePresEmail}</div>
        <div>Sponsor Inquiries: {erDirectorEmail}</div>

        <div className="pt-8 pb-2 opacity-30">
          Designed by{' '}
          <Link href="https://www.instagram.com/hyunjunyou" target="_blank">
            Hyunjun You
          </Link>
          . <br />
          Initially developed by{' '}
          <Link href="https://www.instagram.com/ryubsmile" target="_blank">
            Jaehyuk Ryu
          </Link>
          , and{' '}
          <Link
            href="https://www.instagram.com/justin.geon.kim/"
            target="_blank"
          >
            Jingeon Kim
          </Link>{' '}
          (UTKCC 17th). <br />
          Maintained and updated by UTKCC Programming Team:{' '}
          <Link href="https://www.instagram.com/ryubsmile" target="_blank">
            Jaehyuk Ryu
          </Link>
          ,{' '}
          <Link href="https://www.instagram.com/caelannkim" target="_blank">
            Nayeon Kim
          </Link>
          ,{' '}
          <Link href="https://www.instagram.com/jamieryu._" target="_blank">
            Jihoon Ryu
          </Link>
          .
        </div>

        <div className="pb-2">
          © 2023 University of Toronto Korean Commerce Community. All rights
          reserved.
        </div>
      </div>
    </div>
  );
}
