import Image from 'next/image';
import Underline from '../../public/title-underline.png';

interface Props {
  title: String;
}

const TitleSection = ({ title }: Props) => {
  return (
    <>
      <div className="mx-auto">
        <h1 className="text-center font-sudo-title text-[64px] bg-sudo-grad2 text-transparent bg-clip-text">
          {title}
        </h1>
        <Image src={Underline} width="300" height="55" alt="underline" />
      </div>
    </>
  );
};

export default TitleSection;
