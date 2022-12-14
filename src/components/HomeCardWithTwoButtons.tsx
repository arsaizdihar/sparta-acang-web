import { useRouter } from 'next/router';
import Button from './Button';

interface Props {
  title: string;
  paragraph: string;
  text1: string;
  text2: string;
}

const HomeCardWithTwoButtons = ({ title, paragraph, text1, text2 }: Props) => {
  const router = useRouter();
  return (
    <>
      <div
        className="px-6 py-20 linear-gradient-card-2 flex flex-col gap-4 rounded-xl md:w-[40%] text-center"
        data-aos="fade-up"
      >
        <h2 className="text-6xl font-sudo-title text-center">{title}</h2>
        <p className="text-2xl font-sudo-body">{paragraph}</p>
        <div className="mx-auto mt-10 flex flex-col lg:flex-row gap-8">
          <div
            className={`${text1 === 'FUTSAL' ? 'w-[5.5rem]' : 'w-[9.6rem]'}`}
          >
            <Button
              text={text1}
              runOnClick={() => router.push('/sudolympic/futsal')}
              useArrow
            />
          </div>
          <div
            className={`${text2 === 'BASKET' ? 'w-[5.6rem]' : 'w-[9.6rem]'}`}
          >
            <Button
              text={text2}
              runOnClick={() => router.push('/sudolympic/basket')}
              useArrow
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCardWithTwoButtons;
