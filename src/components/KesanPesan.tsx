import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { EventPageData } from '~/types/cms';
import { trpc } from '~/utils/trpc';
import Button from './Button';
import KesanVote from './KesanVote';
import { usePageData } from './PageDataProvider';

const KesanPesan = () => {
  const { event } = usePageData<EventPageData>();
  const [inputValue, setInputValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const session = useSession();
  const isLoggedIn = !!session.data?.user;
  const registerQuery = trpc.useQuery(['event.getRegistered'], {
    enabled: isLoggedIn,
  });

  const queryClient = trpc.useContext();

  const addKesanMutation = trpc.useMutation('event.addKesanPesan');

  const kesanQuery = trpc.useQuery(
    ['event.getKesan', { slug: event.slug, page: pageNumber }],
    { staleTime: 60000 },
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      toast.error('Kesan tidak boleh kosong', { id: 'kesan' });
      return;
    }
    const promise = addKesanMutation.mutateAsync({
      eventSlug: event.slug,
      text: inputValue,
    });

    toast.promise(promise, {
      error(error) {
        console.log(error);
        return error.message;
      },
      success: 'Berhasil menambahkan kesan',
      loading: 'Loading...',
    });

    promise.then(() => {
      queryClient.invalidateQueries(['event.getKesan']);
    });
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-11/12 max-w-4xl h-fit mx-auto mb-9">
      <div className="flex flex-col gap-[10px] md:flex-row md:gap-10 md:mx-10">
        <div className="flex flex-col gap-2">
          <h2 className="font-sudo-title text-4xl tracking-wider">
            Bagikan Keseruanmu!
          </h2>
          <p className="font-sudo-body text-xl">
            Ceritakan kesan & pesan dari pengalaman serumu di acara SUDOLYMPIC
          </p>
        </div>
        {registerQuery.data?.eventSlug === event.slug && (
          <form
            className="flex flex-col bg-sudo-grad-kesanpesan-input p-[10px] gap-[10px] rounded-lg"
            onSubmit={handleSubmit}
          >
            <textarea
              value={inputValue}
              onChange={handleTextareaChange}
              name="kesanpesan-input"
              cols={45}
              rows={6}
              placeholder="Tulis ceritamu disini"
              spellCheck={false}
              className="bg-sudo-dark-tan rounded-lg p-[10px] shadow-textarea resize-none spell outline-none font-sudo-body text-sudo-dark-brown placeholder:text-sudo-gradtext-light"
            />
            <div className="self-end">
              <Button text="Kirim" />
            </div>
          </form>
        )}
      </div>
      <div className="mt-6 md:mt-8 w-full flex flex-col gap-[10px] mb-10">
        {kesanQuery.data?.kesanPesan.map((k) => (
          <div
            key={k.userId}
            className="w-full p-[3px] bg-sudo-grad-kesanpesan-card text-[#512818] rounded-xl"
          >
            <div className="flex gap-2 bg-inherit p-2 border border-sudo-dark-brown rounded-[10px]">
              <KesanVote {...k} pageNumber={pageNumber} />
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <Image
                    width={24}
                    height={24}
                    alt="profpic"
                    src={k.user.image!}
                    className="object-cover rounded-full"
                  />
                  <p className="font-sudo-title underline tracking-wider">
                    {k.user.name}
                  </p>
                </div>
                <div>
                  <p className="font-sudo-body md:leading-5">{k.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={kesanQuery.data?.totalPages ?? 0}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(e) => setPageNumber(e.selected)}
        containerClassName={'mx-auto flex gap-2 justify-center'}
        pageClassName={'bg-[#DFC899] hover:bg-sudo-grad2 w-7 h-7 rounded-md'}
        pageLinkClassName={
          'w-7 h-7 flex justify-center items-center font-montserrat font-bold bg-gradient-to-t from-sudo-gradtext-dark to-sudo-gradtext-light bg-clip-text text-transparent hover:text-[#DFC899] '
        }
        previousClassName={
          'bg-[#DFC899] hover:bg-sudo-grad2 w-7 h-7 rounded-md flex justify-center items-center '
        }
        previousLinkClassName={
          'w-7 h-7 flex justify-center items-center font-montserrat font-bold bg-gradient-to-t from-sudo-gradtext-dark to-sudo-gradtext-light bg-clip-text text-transparent hover:text-[#DFC899] '
        }
        nextClassName={
          'bg-[#DFC899] hover:bg-sudo-grad2 w-7 h-7 rounded-md flex justify-center items-center '
        }
        nextLinkClassName={
          'w-7 h-7 flex justify-center items-center font-montserrat font-bold bg-gradient-to-t from-sudo-gradtext-dark to-sudo-gradtext-light bg-clip-text text-transparent hover:text-[#DFC899] '
        }
        breakLinkClassName={'pointer-events-none text-sudo-dark-brown'}
        activeClassName={'bg-sudo-grad2'}
        activeLinkClassName={'text-[#DFC899] underline'}
      />
    </div>
  );
};

export default KesanPesan;
