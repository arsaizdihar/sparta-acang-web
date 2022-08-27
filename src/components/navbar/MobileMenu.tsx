import Image from 'next/image';
import { MdClose } from 'react-icons/md';
import NavDropdown from './NavDropdown';
import NavLink from './NavLink';

type MobileMenuProps = {
  open: boolean;
  closeMenu: Function;
};

const MobileMenu = ({ open, closeMenu }: MobileMenuProps) => {
  return (
    <div className="md:hidden text-sudo-dark-tan font-sudo-title text-xl tracking-wider">
      <div
        style={{
          opacity: open ? '0.3' : '',
          zIndex: open ? '10' : '-1',
        }}
        className="fixed top-0 left-0 opacity-0 bg-black w-screen h-screen transition transform ease-in-out duration-700"
      ></div>
      <div
        style={{ transform: open ? 'translateX(260px)' : '' }}
        className="fixed z-20 w-[260px] h-screen bg-sudo-dark-brown py-[100px] px-8 left-[-260px] transition ease-in-out duration-700 transform"
      >
        <div className="flex gap-4 items-center mb-6">
          <MdClose
            width={14}
            height={14}
            onClick={() => closeMenu()}
            className="absolute top-6 right-6"
          />
          <Image
            width={64}
            height={64}
            src="/images/logo.jpg"
            alt=""
            className="rounded-full"
          />
          <p className="">SUDO</p>
        </div>
        <div className="flex flex-col gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/">SudoEx</NavLink>
          <NavDropdown>SudoLympic</NavDropdown>
          <NavLink href="/">SuDonation</NavLink>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
