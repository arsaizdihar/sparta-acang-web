import { useRouter } from 'next/router';
import Button from './Button';

interface Props {
  title: string;
  paragraph: string;
  text: string;
  nav: string;
}

const HomeCardWithOneButton = ({ title, paragraph, text, nav }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(nav);
  };
  return (
    <>
      <div className="px-6 py-20 linear-gradient-card-2 flex flex-col gap-4 rounded-xl md:w-[40%]">
        <h2 className="text-6xl font-sudo-title text-center">{title}</h2>
        <p className="text-2xl">{paragraph}</p>
        <div className="w-[8.2rem] mx-auto mt-10">
          <Button text={text} runOnClick={handleClick} useArrow />
        </div>
      </div>
    </>
  );
};

export default HomeCardWithOneButton;
