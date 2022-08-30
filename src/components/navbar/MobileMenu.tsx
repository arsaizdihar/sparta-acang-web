import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { MdClose } from 'react-icons/md';
import { useOutsideClick } from '~/utils/useOutsideClick';
import { usePageData } from '../PageDataProvider';
import LoginButton from './LoginButton';
import NavDropdown from './NavDropdown';
import NavLink from './NavLink';

type MobileMenuProps = {
  open: boolean;
  closeMenu: () => void;
  session: Session | null;
};

const MobileMenu = ({ open, closeMenu, session }: MobileMenuProps) => {
  const name = session ? session.user?.name?.split(' ')[1] : '';
  const { showMilestone } = usePageData();
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOutsideClick(ref, closeMenu);

  return (
    <div className="md:hidden text-sudo-dark-tan font-sudo-title text-xl tracking-wider">
      <div
        style={{
          opacity: open ? '0.3' : '0',
          zIndex: open ? '10' : '-1',
        }}
        className="fixed top-0 left-0 opacity-0 bg-black w-screen h-screen transition transform ease-in-out duration-700"
      ></div>
      <div
        ref={ref}
        style={{ transform: open ? 'translateX(260px)' : 'none' }}
        className="fixed z-20 w-[260px] h-screen bg-sudo-dark-brown py-[100px] px-8 left-[-260px] transition ease-in-out duration-700 transform"
      >
        <MdClose
          width={14}
          height={14}
          onClick={() => closeMenu()}
          className="absolute top-6 right-6"
        />
        {session ? (
          <div className="flex gap-4 items-center mb-6">
            <Image
              width={64}
              height={64}
              src="/images/logo.jpg"
              alt=""
              className="rounded-full"
            />
            <p className="">{name}</p>
          </div>
        ) : (
          <LoginButton
            runOnClick={() => signIn('google', { callbackUrl: router.asPath })}
          />
        )}
        <div className="flex flex-col gap-6 my-7">
          <NavLink href="/" onClick={closeMenu}>
            Home
          </NavLink>
          {showMilestone && (
            <NavLink href="/sudoex" onClick={closeMenu}>
              SudoEx
            </NavLink>
          )}
          <NavDropdown closeMenu={closeMenu}>SudoLympic</NavDropdown>
        </div>
        {session && (
          <button
            className="underline font-sudo-body"
            onClick={() => signOut()}
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
