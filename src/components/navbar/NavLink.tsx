import Link from 'next/link';
import { ReactNode } from 'react';

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link href={href}>
      <a className="font-sudo-title text-xl text-sudo-dark-tan">{children}</a>
    </Link>
  );
};

export default NavLink;
