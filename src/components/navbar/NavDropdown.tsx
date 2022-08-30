import Link from 'next/link';
import { ReactNode, useRef, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useOutsideClick } from '~/utils/useOutsideClick';

type NavDropdownProps = {
  children: ReactNode;
};

const NavDropdown = ({ children }: NavDropdownProps) => {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  function close() {
    setOpen(false);
  }

  useOutsideClick(ref, close);

  return (
    <div className="relative font-sudo-title" ref={ref}>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="sudo-dropdown font-sudo-title text-xl text-sudo-dark-tan flex items-center gap-2"
      >
        {children}
        <MdArrowDropDown className="sudo-dropdown" />
      </button>
      <NavDropdownMenu open={open} close={close} />
    </div>
  );
};

type NavDropdownMenuProps = {
  open: boolean;
  close: () => void;
};

const NavDropdownMenu = ({ open, close }: NavDropdownMenuProps) => {
  return (
    <div
      style={{ display: open ? 'block' : 'none' }}
      className="md:absolute mt-[10px] w-[96px] md:bg-sudo-dark-tan md:text-sudo-dark-brown md:shadow-md"
    >
      <ul className="text-sm" aria-labelledby="dropdownDefault">
        <li>
          <Link href="/sudolympic/futsal">
            <a
              className="sudo-dropdown block py-2 text-xl px-3 hover:bg-sudo-dark-brown/25 "
              onClick={close}
            >
              Futsal
            </a>
          </Link>
        </li>
        <li>
          <Link href="/sudolympic/basket">
            <a
              className="sudo-dropdown block py-2 text-xl px-3 hover:bg-sudo-dark-brown/25 "
              onClick={close}
            >
              Basket
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavDropdown;
