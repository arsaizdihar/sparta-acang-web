import Image from 'next/image';
import Logo from '../../public/logo-xl.png';
interface Props {
  description: String;
}

const AboutSudo = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row mt-10 gap-10 items-center justify-center">
        <div data-aos="fade-up">
          <Image alt="" src={Logo} />
        </div>
        <p
          className="md:w-2/3 px-6 py-10 linear-gradient-card-2 text-[20px] font-sudo-body rounded-xl text-sudo-dark-brown"
          data-aos="fade-up"
        >
          SUDO diambil dari superuser do yang bermakna bisa melakukan aksi
          berdampak besar. Di tengah era digital ini, kami, mahasiswa HMIF
          angkatan 21, ingin bertindak sebagai superuser yang melakukan
          digitalisasi, inisiasi, dan membawa perubahan di masyarakat.
        </p>
      </div>
    </>
  );
};

export default AboutSudo;
