import { useState } from 'react';
import toast from 'react-hot-toast';
import { EventPageData } from '~/types/cms';
import { trpc } from '~/utils/trpc';
import CustomHead from './CustomHead';
import Documentation from './Documentation';
import EventDetails from './EventDetails.tsx';
import KesanPesan from './KesanPesan';
import Modal from './Modal';
import { usePageData } from './PageDataProvider';
import Title from './Title';

const EventPage = () => {
  const data = usePageData<EventPageData>();

  const [modalOpen, setModalOpen] = useState(false);

  const unregisterMutation = trpc.useMutation('event.unregister');
  const registerMutation = trpc.useMutation('event.register');
  const queryClient = trpc.useContext();

  return (
    <>
      <CustomHead
        title={`Sudolympic | ${data.event.title}`}
        description="Rangkaian acara berupa Fun Sports dari SUDO. Acara ini bertujuan untuk mendekatkan anggota SUDO, INIT, dan Async lewat olahraga, sekaligus menjadi tempat untuk memberikan donasi bagi orang yang hadir."
      />

      <div
        className={`fixed z-10 top-0 bottom-0 left-0 right-0 ${
          modalOpen ? '' : 'invisible'
        } bg-rgba flex items-center justify-center bg-black/30`}
        onClick={() => setModalOpen(false)}
      >
        <Modal
          buttonText="IYA"
          runOnButtonClick={() => {
            const promise = unregisterMutation.mutateAsync({
              slug: data.event.slug,
            });
            toast.promise(
              promise,
              {
                error(error) {
                  console.log(error);
                  return error.message;
                },
                success: 'Berhasil membatalkan pendaftaran',
                loading: 'Loading...',
              },
              { id: 'event-register' },
            );

            promise.then(() => {
              queryClient.setQueryData(['event.getRegistered'], {});
              queryClient.refetchQueries([
                'event.getParticipants',
                { slug: data.event.slug },
              ]);
            });
          }}
          runToClose={() => setModalOpen(false)}
          text={'Apakah kamu yakin ingin batal mendaftar'}
        />
      </div>

      <main className="py-5">
        <Title text={data.event.title} />
        <EventDetails
          register={() => {
            const promise = registerMutation.mutateAsync({
              slug: data.event.slug,
            });
            toast.promise(
              promise,
              {
                error(error) {
                  console.log(error);
                  return error.message;
                },
                success(res) {
                  return `Berhasil mendaftar${
                    res.isWaiting ? ' (waiting list)' : ''
                  }`;
                },
                loading: 'Loading...',
              },
              { id: 'event-register' },
            );

            promise.then((res) => {
              queryClient.setQueryData(['event.getRegistered'], {
                isWaiting: res.isWaiting,
                eventSlug: data.event.slug,
              });
              queryClient.refetchQueries([
                'event.getParticipants',
                { slug: data.event.slug },
              ]);
            });
          }}
          cancel={() => setModalOpen(true)}
        />
        <Title text="Dokumentasi" />
        <Documentation />
        <Title text="Kesan & Pesan" />
        <KesanPesan />
      </main>
    </>
  );
};

export default EventPage;
