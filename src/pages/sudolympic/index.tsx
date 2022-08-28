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
      <Title text={data.title} />

      <EventDetails {...data} />
    </>
  );
}
