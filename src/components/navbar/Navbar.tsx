import Image from 'next/image';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import MobileMenu from './MobileMenu';
import NavDropdown from './NavDropdown';
import NavLink from './NavLink';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <MobileMenu open={menuOpen} closeMenu={() => setMenuOpen(false)} />
      <div className="flex w-full fixed items-center h-12 px-[10px] bg-sudo-grad1">
        <div className="flex-1 md:hidden">
          <MdMenu
            size={38}
            className="text-sudo-tan"
            onClick={() => setMenuOpen(true)}
          />
        </div>
        <Image
          className="self-center"
          layout="fixed"
          width={35}
          height={35}
          src="/images/logo.jpg"
          alt="logo"
        />
        <div className="hidden md:flex flex-1 h-full justify-end items-center tracking-wider gap-5">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/">SudoEx</NavLink>
          <NavDropdown>SudoLympic</NavDropdown>
          <NavLink href="/">SuDonation</NavLink>
          <ProfileDropdown />
        </div>
      </div>
    </>
  );
};

export default Navbar;
