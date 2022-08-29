import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import Button from './Button';

const KesanPesan = () => {
  const [inputValue, setInputValue] = useState('');
  const [shownItems, setShownItems] = useState<CommentItem[]>([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setShownItems(placeholder.items.slice(0, 6));
    setPageCount(Math.ceil(placeholder.items.length / 5));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handlePageChange = (data: any) => {
    let currentPage = data.selected + 1;
    setShownItems(
      placeholder.items.slice(data.selected * 5, data.selected * 5 + 6),
    );
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
      </div>
      <div className="mt-6 md:mt-8 w-full flex flex-col gap-[10px] mb-10">
        {shownItems.map(
          ({ username, id, comment, currStatus, votes }: CommentItem) => (
            <div
              key={`comment=${id}`}
              className="w-full p-[3px] bg-sudo-grad-kesanpesan-card text-[#512818] rounded-xl"
            >
              <div className="flex gap-2 bg-inherit p-2 border border-sudo-dark-brown rounded-[10px]">
                <div className="flex flex-col items-center relative">
                  <button
                    className={`relative bottom-3 md: ${
                      currStatus === 'upvoted' ? 'text-[#00A446]' : ''
                    }`}
                  >
                    <MdKeyboardArrowUp size={42} />
                  </button>
                  <p
                    className={`relative bottom-2 md:bottom-6 text-lg font-montserrat ${
                      currStatus === 'upvoted'
                        ? 'text-[#00A446]'
                        : currStatus === 'downvoted'
                        ? 'text-[#DD3916]'
                        : ''
                    }`}
                  >
                    {`${votes}`}
                  </p>
                  <button
                    className={`relative bottom-4 md:bottom-9 ${
                      currStatus === 'downvoted' ? 'text-[#DD3916]' : ''
                    }`}
                  >
                    <MdKeyboardArrowDown size={42} />
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <Image
                      width={24}
                      height={24}
                      alt="profpic"
                      src="/images/futsal.jpg"
                      className="object-cover rounded-full"
                    />
                    <p className="font-sudo-title underline tracking-wider">
                      {username}
                    </p>
                  </div>
                  <div>
                    <p className="font-sudo-body md:leading-5">{comment}</p>
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
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

type CommentItem = {
  username: string;
  id: string;
  votes: Number;
  currStatus: 'upvoted' | 'downvoted' | '';
  comment: string;
};

type PType = {
  items: CommentItem[];
};

// placeholder buat preview. nanti dihapus
const placeholder: PType = {
  items: [
    {
      username: 'Nama Spartans',
      id: '1',
      votes: 21,
      currStatus: 'upvoted',
      comment:
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
      username: 'Nama Spartans',
      id: '2',
      votes: 19,
      currStatus: 'downvoted',
      comment:
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
      username: 'Nama Spartans',
      id: '3',
      votes: 20,
      currStatus: 'downvoted',
      comment:
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
      username: 'Nama Spartans',
      id: '4',
      votes: 20,
      currStatus: '',
      comment:
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
      username: 'Nama Spartans',
      id: '5',
      votes: 20,
      currStatus: '',
      comment:
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
      username: 'Nama Spartans',
      id: '6',
      votes: 20,
      currStatus: '',
      comment:
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
      username: 'Nama Spartans',
      id: '7',
      votes: 20,
      currStatus: '',
      comment:
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
      username: 'Nama Spartans',
      id: '8',
      votes: 20,
      currStatus: '',
      comment:
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
      username: 'Nama Spartans',
      id: '9',
      votes: 20,
      currStatus: '',
      comment:
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
  ],
};
