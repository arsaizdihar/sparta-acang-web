import Head from 'next/head';
import { useState } from 'react';
import Documentation from '~/components/Documentation';
import EventDetails from '~/components/EventDetails.tsx';
import KesanPesan from '~/components/KesanPesan';
import Modal from '~/components/Modal';
import Title from '~/components/Title';

export default function Sudolympic() {
  // cuma placeholder, nanti hapus
  const data = {
    title: 'Futsal',
    preconditions: [
      'Batas jumlah peserta xx',
      'Peserta laki-laki minimal xx',
      'Peserta perempuan minimal xx',
      'Diikuti minimal xx Async dan Init',
      'Lorem Ipsum',
    ],
    location: 'Saraga',
    time: '9.00-16.00',
    thumbnailUrl: '/images/futsal.png',
    openQuota: 5,
    maxQuota: 20,
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // const cancel = () => {
  //   setModalOpen(!modalOpen);
  // };

  return (
    <>
      <Head>
        <title>Sudolympic | {data.title}</title>
        <meta
          name="description"
          content="Rangkaian acara berupa Fun Sports dari SUDO. Acara ini bertujuan untuk mendekatkan anggota SUDO, INIT, dan Async lewat olahraga, sekaligus menjadi tempat untuk memberikan donasi bagi orang yang hadir."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`fixed z-10 top-0 bottom-0 left-0 right-0 ${
          modalOpen ? '' : 'invisible'
        } bg-rgba flex items-center justify-center bg-black/30`}
        onClick={() => setModalOpen(false)}
      >
        <Modal
          buttonText="IYA"
          runOnButtonClick={() => setIsRegistered(false)}
          runToClose={() => setModalOpen(false)}
          text={'Apakah kamu yakin ingin batal mendaftar'}
        />
      </div>

      <main className="py-5">
        <Title text={data.title} />
        <EventDetails
          {...data}
          register={() => setIsRegistered(true)}
          cancel={() => setModalOpen(true)}
          isRegistered={isRegistered}
        />
        <Title text="Dokumentasi" />
        <Documentation />
        <Title text="Kesan & Pesan" />
        <KesanPesan />
      </main>
    </>
  );
}
