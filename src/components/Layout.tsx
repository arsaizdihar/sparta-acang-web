import Image from 'next/image';
import { ReactNode } from 'react';
import backgroundImage from '../../public/bg-coba-80.png';
import Footer from './Footer';
import Navbar from './navbar/Navbar';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          src={backgroundImage}
          alt="Background image"
          className="-z-10"
          priority
        />
        <div className="w-full relative mx-auto xl:max-w-screen-xl">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
