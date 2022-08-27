import Image from 'next/image';

interface TitleProps {
  text: string;
}

export default function Title(props: TitleProps) {
  const { text } = props;

  return (
    <div className="w-fit mx-auto mt-10 mb-7 ">
      <div className="font-sudo-title text-7xl text-center bg-gradient-to-t from-sudo-gradtext-dark to-sudo-gradtext-light bg-clip-text text-transparent mb-2">
        {text}
      </div>
      <Image
        src="/images/title-decor.png"
        alt="judul"
        width={306}
        height={55}
      />
    </div>
  );
}
