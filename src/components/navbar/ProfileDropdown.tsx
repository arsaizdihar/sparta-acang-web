import { Session } from 'next-auth';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import { useOutsideClick } from '~/utils/useOutsideClick';

type Props = {
  signOut: () => void;
  session: Session;
};

const ProfileDropdown = ({ signOut, session }: Props) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const name = session ? session.user?.name?.split(' ')[1] : '';
  useOutsideClick(ref, () => setOpen(false));

  return (
    <div className="relative font-sudo-title" ref={ref}>
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
        <p className="ml-2 sudo-dropdown">{name}</p>
        <MdExpandMore className="ml-4 sudo-dropdown" />
      </button>
      <ProfileDropdownMenu open={open} signOut={signOut} />
    </div>
  );
};

const ProfileDropdownMenu = ({ open, signOut }: any) => {
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
          <button
            className="sudo-dropdown w-full text-left block py-2 text-xl px-3 hover:bg-sudo-dark-brown/25 "
            onClick={signOut}
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
