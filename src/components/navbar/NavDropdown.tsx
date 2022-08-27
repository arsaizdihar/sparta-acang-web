import Link from 'next/link';
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';

type NavDropdownProps = {
  children: ReactNode;
};

const NavDropdown = ({ children }: NavDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

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
        onClick={() => {
          setOpen(!open);
        }}
        className="sudo-dropdown font-sudo-title text-xl text-sudo-dark-tan flex items-center gap-2"
      >
        {children}
        <MdArrowDropDown className="sudo-dropdown" />
      </button>
      <NavDropdownMenu ref={dropDownRef} open={open} />
    </div>
  );
};

type NavDropdownMenuProps = {
  open: boolean;
  ref: RefObject<HTMLDivElement>;
};

const NavDropdownMenu = ({ open, ref }: NavDropdownMenuProps) => {
  return (
    <div
      ref={ref}
      style={{ display: open ? 'block' : 'none' }}
      className="md:absolute mt-[10px] w-[96px] md:bg-sudo-dark-tan md:text-sudo-dark-brown md:shadow-md"
    >
      <ul className="text-sm" aria-labelledby="dropdownDefault">
        <li>
          <Link href="/">
            <a className="sudo-dropdown block py-2 text-xl px-3 hover:bg-sudo-dark-brown/25 ">
              Futsal
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className="sudo-dropdown block py-2 text-xl px-3 hover:bg-sudo-dark-brown/25 ">
              Basket
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavDropdown;
