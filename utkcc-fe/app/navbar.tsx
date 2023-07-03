'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SetStateAction, useState } from 'react';

interface navBarProps {
  getter: boolean;
  setter: React.Dispatch<SetStateAction<boolean>>;
}

function MenuButton(props: navBarProps) {
  const [navActive, setNavActive] = [props.getter, props.setter];

  return (
    <div
      id="menu-button"
      className={`w-full h-full flex flex-col justify-between cursor-pointer`}
      onClick={() => {
        setNavActive(!navActive);
        console.log(navActive);
      }}
    >
      <Image
        width={40}
        height={40}
        src={`${
          navActive ? '/assets/menu-opened.png' : '/assets/menu-closed.png'
        }`}
        alt="menu"
        className={`${navActive ? 'scale-100' : 'scale-150'}`}
      />
    </div>
  );
}

export default function NavBar({ children }: { children: any }) {
  const [navActive, setNavActive] = useState(false);
  return (
    <nav
      className={`w-screen ${
        navActive ? 'h-screen' : 'h-16'
      } fixed bg-white border-b border-solid border-transparent font-semibold duration-200 select-none`}
    >
      <div className="px-4 py-2 h-16 flex">
        <Link
          className={`w-fit h-full flex gap-2 duration-100 items-center ${
            navActive ? 'opacity-0' : 'opacity-100'
          }`}
          href="/"
        >
          <Image
            src="/logo-nav.png"
            alt="logo"
            width={36}
            height={36}
            className="object-scale-down"
          />
          <span className="text-xl">UTKCC</span>
        </Link>
        <div className="w-8 h-8 ml-auto self-center">
          <MenuButton getter={navActive} setter={setNavActive} />
        </div>
      </div>
      <div
        className={`${
          navActive ? 'flex' : 'hidden'
        } flex-col mt-10 pl-16 gap-8 text-xl text-gray-600`}
      >
        <Link href="/" onClick={() => setNavActive(false)}>
          Home
        </Link>
        <Link href="/events" onClick={() => setNavActive(false)}>
          Events
        </Link>
        <Link href="/executives" onClick={() => setNavActive(false)}>
          Executives
        </Link>
        <Link href="/newsletter" onClick={() => setNavActive(false)}>
          Newsletter
        </Link>
        <Link href="/resources" onClick={() => setNavActive(false)}>
          Resources
        </Link>
        <Link href="/sponsors" onClick={() => setNavActive(false)}>
          Sponsors
        </Link>
      </div>
    </nav>
  );
}
