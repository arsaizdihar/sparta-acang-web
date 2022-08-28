import { useRouter } from 'next/router';
import Button from './Button';

interface Props {
  title: string;
  paragraph: string;
  text1: string;
  text2: string;
  nav: string;
}

const HomeCardWithTwoButtons = ({
  title,
  paragraph,
  text1,
  text2,
  nav,
}: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(nav);
  };
  return (
    <>
      <div className="px-6 py-20 linear-gradient-card-2 flex flex-col gap-4 rounded-xl md:w-[40%] text-center">
        <h2 className="text-6xl font-sudo-title text-center">{title}</h2>
        <p className="text-2xl">{paragraph}</p>
        <div className="mx-auto mt-10 flex flex-col lg:flex-row gap-8">
          <div className="w-[9.6rem]">
            <Button text={text1} runOnClick={handleClick} useArrow />
          </div>
          <div className="w-[9.7rem]">
            <Button text={text2} runOnClick={handleClick} useArrow />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCardWithTwoButtons;
