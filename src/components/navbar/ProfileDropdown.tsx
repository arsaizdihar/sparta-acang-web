import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { MdExpandMore } from 'react-icons/md';

const ProfileDropdown = () => {
  const dropdownItems = [
    { text: 'Futsal', href: '/' },
    { text: 'Basket', href: '/' },
  ];
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!e.target.classList.contains('sudo-dropdown')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <div className="relative font-sudo-title">
      <button
        ref={buttonRef}
        onClick={() => {
          setOpen(!open);
        }}
        className="sudo-dropdown font-sudo-title text-xl text-sudo-dark-brown bg-sudo-dark-tan rounded-full flex items-center py-[2px] px-5"
      >
        <Image
          width={24}
          height={24}
          src="/images/logo.jpg"
          className="rounded-full sudo-dropdown"
          alt="profile picture"
        />
        <p className="ml-2 sudo-dropdown">SUDO</p>
        <MdExpandMore className="ml-4 sudo-dropdown" />
      </button>
      <ProfileDropdownMenu open={open} />
    </div>
  );
};

const ProfileDropdownMenu = ({ open }: any) => {
  return (
    <div
      style={{ display: open ? 'block' : 'none' }}
      className="absolute mt-[8px] ml-[10px] w-[118px] bg-sudo-dark-tan shadow-md dark:bg-gray-700"
    >
      <ul
        className="text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefault"
      >
        <li>
          <Link href="/">
            <a className="sudo-dropdown block py-2 text-xl px-3 hover:bg-sudo-dark-brown/25 ">
              Log Out
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
