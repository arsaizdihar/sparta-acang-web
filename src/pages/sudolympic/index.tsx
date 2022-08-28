import Head from 'next/head';
import Documentation from '~/components/Documentation';
import EventDetails from '~/components/EventDetails.tsx';
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
    openQuota: 5,
    maxQuota: 20,
    isRegistered: false,
    register: () => null,
    cancel: () => null,
  };

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
      <main className="py-5">
        <Title text={data.title} />
        <EventDetails {...data} />
        <Title text="Dokumentasi" />
        <Documentation />
      </main>
    </>
  );
}
