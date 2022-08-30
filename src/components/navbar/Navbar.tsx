import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { MdMenu } from 'react-icons/md';
import { usePageData } from '../PageDataProvider';
import LoginButton from './LoginButton';
import MobileMenu from './MobileMenu';
import NavDropdown from './NavDropdown';
import NavLink from './NavLink';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { showMilestone } = usePageData();

  const { data: session, status } = useSession();

  const router = useRouter();
  const { error: errorQuery } = router.query;

  useEffect(() => {
    if (errorQuery === 'AccessDenied') {
      toast.error('Gunakan email jurusan dengan akhiran @std.stei.itb.ac.id');
    }
  }, [errorQuery]);

  return (
    <>
      <MobileMenu
        session={session}
        open={menuOpen}
        closeMenu={() => setMenuOpen(false)}
      />
      <div className="flex w-full sticky z-10 top-0 h-12  bg-sudo-grad-navbar">
        <div className="flex items-center w-full max-w-7xl mx-auto h-full px-[10px]">
          <div className="flex-1 md:hidden">
            <MdMenu
              size={38}
              className="text-sudo-tan"
              onClick={() => setMenuOpen(true)}
            />
          </div>
          <div>
            <Link href="/">
              <a className="h-full flex items-center">
                <Image
                  layout="fixed"
                  width={35}
                  height={35}
                  src="/images/logo.jpg"
                  alt="logo"
                />
              </a>
            </Link>
          </div>
          <div className="hidden md:flex flex-1 h-full justify-end items-center tracking-wider gap-5">
            <NavLink href="/">Home</NavLink>
            {showMilestone && <NavLink href="/sudoex">SudoEx</NavLink>}
            <NavDropdown>SudoLympic</NavDropdown>
            {session ? (
              <ProfileDropdown session={session} signOut={signOut} />
            ) : (
              <LoginButton
                runOnClick={() =>
                  signIn('google', { callbackUrl: router.asPath })
                }
              />
            )}
          </div>
        </div>
      </div>
      <Toaster
        containerStyle={{
          top: '64px',
        }}
        toastOptions={{
          style: {
            backgroundColor: '#E0C79F',
            borderRadius: '4px',
            border: '1px solid #4D2A0C',
          },
        }}
      />
    </>
  );
};

export default Navbar;
