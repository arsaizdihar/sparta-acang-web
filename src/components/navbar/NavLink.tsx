import Link from 'next/link';
import { ReactNode } from 'react';

type NavLinkProps = {
  href: string;
  children: ReactNode;
  onClick?: () => void;
};

const NavLink = ({ href, children, onClick }: NavLinkProps) => {
  return (
    <Link href={href}>
      <a
        className="font-sudo-title text-xl text-sudo-dark-tan"
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
