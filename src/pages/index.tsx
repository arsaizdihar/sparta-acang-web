import type { NextPage } from 'next';
import Image from 'next/image';
import AboutSudo from '~/components/AboutSudo';
import CustomHead from '~/components/CustomHead';
import HomeCardWithOneButton from '~/components/HomeCardWithOneButton';
import HomeCardWithoutButton from '~/components/HomeCardWithoutButton';
import HomeCardWithTwoButtons from '~/components/HomeCardWithTwoButtons';
import { usePageData } from '~/components/PageDataProvider';
import RoundedRectangle from '~/components/RoundedRectangle';
import TitleSection from '~/components/TitleSection';
import { getFeatureFlag } from '~/utils/server/getFeatureFlag';
import QR from '../../public/qr.png';

export const getStaticProps = async () => {
  const showDonation = await getFeatureFlag('DONATION');
  const showMilestone = await getFeatureFlag('MILESTONE_SHOW');
  return {
    props: {
      data: { showDonation },
    },
  };
};

const Home: NextPage = () => {
  const { showDonation } = usePageData<{ showDonation: boolean }>();
  const { showMilestone } = usePageData<{ showMilestone: boolean }>();

  const Data = {
    sudoverse: {
      title: 'SUDOVERSE',
    },
    about: {
      title: 'ABOUT SUDO',
      content: [
        {
          title: 'SUDOEX',
          description:
            'Rangkaian acara berupa Exhibiton dari SUDOVerse. Acara ini bertujuan untuk memberikan wadah partisipasi dari setiap anggota SUDO dalam acara angkatan dan menjadi tempat untuk memberikan donasi bagi orang yang hadir di acara ini.',
        },
        {
          title: 'SUDOLYMPIC',
          description:
            'Rangkaian acara berupa Fun Sports dari SUDO. Acara ini bertujuan untuk mendekatkan anggota SUDO, INIT, dan Async lewat olahraga, sekaligus menjadi tempat untuk memberikan donasi bagi orang yang hadir.',
        },
        {
          title: 'SUDONATION',
          description:
            'Rangkaian acara SUDOVerse yang berupa donasi ke panti asuhan.  Acara ini bertujuan untuk memenuhi salah satu tujuan Acara angkatan, yaitu memberikan manfaat bagi masyarakat sekitar.',
        },
      ],
    },
  };
  return (
    <>
      <CustomHead />
      <main>
        <div className="px-4 pt-10">
          {/* SUDOVERSE SECTION*/}
          <div className="flex flex-col">
            <TitleSection title={Data.sudoverse.title} />
            <div className="flex flex-col md:flex-row gap-4 mt-10">
              {Data.about.content.map((item, idx) => (
                <HomeCardWithoutButton
                  key={idx}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>

          {/* ABOUT SUDO SECTION*/}
          <div className="flex flex-col mt-10">
            <TitleSection title={Data.about.title} />
            <AboutSudo />
          </div>
        </div>

        <div>
          {/* NAVIGATION SECTION*/}
          <div className="flex flex-col mt-10 relative">
            <TitleSection title="" />
            <RoundedRectangle position="left" />
            <RoundedRectangle position="right" />
            <div className="flex flex-col md:flex-row px-8 my-40 gap-10 justify-center">
              {showMilestone && (
                <HomeCardWithOneButton
                  text="VOTE KARYA"
                  title="Lihat karya-karya SUDO!"
                  paragraph="Pilih karya favoritmu dari karya-karya terbaik SUDO!"
                  nav="/"
                />
              )}
              <HomeCardWithTwoButtons
                text1="DAFTAR FUTSAL"
                text2="DAFTAR BASKET"
                title="Ikuti Fun Sports!"
                paragraph="Jangan sampai ketinggalan keseruan rangkaian acara Fun Sports dari SUDOVerse."
                nav="/"
              />
            </div>
          </div>

          {/* DONATION SECTION*/}
          {showDonation && (
            <div className="flex flex-col pb-40">
              <TitleSection title="" />
              <div className="mt-4 md:mt-32 mb-10 flex flex-col md:flex-row px-4 gap-16 md:gap-4">
                <div className="flex flex-col gap-4 md:w-2/3 mt-24 text-center md:text-left">
                  <h2 className="text-6xl font-sudo-title">
                    BERBAGILAH KEBAHAGIAAN!
                  </h2>
                  <p className="font-sudo-body text-2xl">
                    Sisihkan sebagian dari uangmu ke orang-orang yang
                    membutuhkan. SuDonation akan menggalang dana untuk memberi
                    sembako ke Panti Asuhan A, Jatinangor.
                  </p>
                </div>
                <div className="w-2/3 md:w-1/3 relative mx-auto md:mx-0">
                  <div className="flex flex-col justify-center gap-4 w-[8rem] mx-auto">
                    <Image alt="qr" src={QR} />
                    <p className="text-xl font-sudo-body">
                      Scan QR code di atas!
                    </p>
                  </div>
                  <div className="z-[-1] w-full h-[234px] absolute linear-gradient-card-3 right-0 top-[5rem] rounded-tl-[150px] rounded-br-[150px]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
