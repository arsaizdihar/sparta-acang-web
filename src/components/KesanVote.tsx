import { useSession } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { EventPageData } from '~/types/cms';
import { inferQueryOutput, trpc } from '~/utils/trpc';
import { usePageData } from './PageDataProvider';

type Props = inferQueryOutput<'event.getKesan'>['kesanPesan'][number] & {
  pageNumber: number;
};

const KesanVote: React.FC<Props> = (k) => {
  const { event } = usePageData<EventPageData>();
  const session = useSession();
  const isLoggedIn = !!session.data?.user;
  const queryClient = trpc.useContext();

  function onSuccess() {
    queryClient.refetchQueries([
      'event.getKesan',
      { slug: event.slug, page: k.pageNumber },
    ]);
  }
  const upvoteMutation = trpc.useMutation('event.upvoteKesan', { onSuccess });
  const downvoteMutation = trpc.useMutation('event.downvoteKesan', {
    onSuccess,
  });
  return (
    <div className="flex flex-col items-center relative">
      <button
        className={`relative bottom-3 md: ${
          k.isUpvoted ? 'text-[#00A446]' : ''
        }`}
        onClick={() => {
          if (!isLoggedIn) return toast.error('Harus log in untuk meng-upvote');
          const promise = upvoteMutation.mutateAsync({ userId: k.userId });
          toast.promise(
            promise,
            {
              error: 'Gagal upvote',
              success(res) {
                return res.isUpvoted
                  ? 'Berhasil upvote'
                  : 'Berhasil membatalkan upvote';
              },
              loading: 'Loading...',
            },
            {
              id: 'upvote',
            },
          );
        }}
      >
        <MdKeyboardArrowUp size={42} />
      </button>
      <p
        className={`relative bottom-2 md:bottom-6 text-lg font-montserrat ${
          k.isUpvoted ? 'text-[#00A446]' : k.isDownvoted ? 'text-[#DD3916]' : ''
        }`}
      >
        {k.upvotesCount - k.downvotesCount}
      </p>
      <button
        className={`relative bottom-4 md:bottom-9 ${
          k.isDownvoted ? 'text-[#DD3916]' : ''
        }`}
        onClick={() => {
          if (!isLoggedIn)
            return toast.error('Harus log in untuk meng-downvote');
          const promise = downvoteMutation.mutateAsync({ userId: k.userId });
          toast.promise(
            promise,
            {
              error: 'Gagal downvote',
              success(res) {
                return res.isDownvoted
                  ? 'Berhasil downvote'
                  : 'Berhasil membatalkan downvote';
              },
              loading: 'Loading...',
            },
            { id: 'downvote' },
          );
        }}
      >
        <MdKeyboardArrowDown size={42} />
      </button>
    </div>
  );
};

export default KesanVote;
