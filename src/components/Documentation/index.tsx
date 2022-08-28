import Image from 'next/image';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function Documentation() {
  // placeholder buat preview. nanti dihapus
  const placeholder = {
    '1': [
      {
        albumId: 1,
        id: 1,
        title: 'accusamus beatae ad facilis cum similique qui sunt',
        url: '/images/futsal.jpg',
      },
      {
        albumId: 1,
        id: 2,
        title: 'reprehenderit est deserunt velit ipsam',
        url: '/images/futsal.jpg',
      },
      {
        albumId: 1,
        id: 3,
        title: 'officia porro iure quia iusto qui ipsa ut modi',
        url: '/images/futsal.jpg',
      },
      {
        albumId: 1,
        id: 4,
        title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
        url: '/images/futsal.jpg',
      },
      {
        albumId: 1,
        id: 5,
        title: 'natus nisi omnis corporis facere molestiae rerum in',
        url: '/images/futsal.jpg',
      },
      {
        albumId: 1,
        id: 6,
        title: 'accusamus ea aliquid et amet sequi nemo',
        url: '/images/futsal.jpg',
      },
      {
        albumId: 1,
        id: 7,
        title:
          'officia delectus consequatur vero aut veniam explicabo molestias',
        url: '/images/futsal.jpg',
      },
      {
        albumId: 1,
        id: 8,
        title: 'aut porro officiis laborum odit ea laudantium corporis',
        url: '/images/futsal.jpg',
      },

      {
        albumId: 1,
        id: 9,
        title: 'qui eius qui autem sed',
        url: '/images/futsal.jpg',
      },
    ],
    2: [
      {
        albumId: 1,
        id: 10,
        title: 'beatae et provident et ut vel',
        url: '/images/futsal2.jpg',
      },
      {
        albumId: 1,
        id: 11,
        title: 'nihil at amet non hic quia qui',
        url: '/images/futsal2.jpg',
      },
      {
        albumId: 1,
        id: 12,
        title:
          'mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores',
        url: '/images/futsal2.jpg',
      },
      {
        albumId: 1,
        id: 13,
        title: 'repudiandae iusto deleniti rerum',
        url: '/images/futsal2.jpg',
      },
      {
        albumId: 1,
        id: 14,
        title: 'est necessitatibus architecto ut laborum',
        url: '/images/futsal2.jpg',
      },
      {
        albumId: 1,
        id: 15,
        title: 'harum dicta similique quis dolore earum ex qui',
        url: '/images/futsal2.jpg',
      },
      {
        albumId: 1,
        id: 16,
        title:
          'iusto sunt nobis quasi veritatis quas expedita voluptatum deserunt',
        url: '/images/futsal2.jpg',
      },
      {
        albumId: 1,
        id: 17,
        title: 'natus doloribus necessitatibus ipsa',
        url: '/images/futsal2.jpg',
      },
      {
        albumId: 1,
        id: 18,
        title: 'laboriosam odit nam necessitatibus et illum dolores reiciendis',
        url: '/images/futsal2.jpg',
      },
    ],
    3: [
      {
        albumId: 1,
        id: 19,
        title: 'perferendis nesciunt eveniet et optio a',
        url: '/images/futsal3.jpg',
      },
      {
        albumId: 1,
        id: 20,
        title:
          'assumenda voluptatem laboriosam enim consequatur veniam placeat reiciendis error',
        url: '/images/futsal3.jpg',
      },
      {
        albumId: 1,
        id: 21,
        title: 'ad et natus qui',
        url: '/images/futsal3.jpg',
      },
      {
        albumId: 1,
        id: 22,
        title: 'et ea illo et sit voluptas animi blanditiis porro',
        url: '/images/futsal3.jpg',
      },
      {
        albumId: 1,
        id: 23,
        title: 'harum velit vero totam',
        url: '/images/futsal3.jpg',
      },
      {
        albumId: 1,
        id: 24,
        title: 'beatae officiis ut aut',
        url: '/images/futsal3.jpg',
      },
      {
        albumId: 1,
        id: 25,
        title: 'facere non quis fuga fugit vitae',
        url: '/images/futsal3.jpg',
      },
      {
        albumId: 1,
        id: 26,
        title: 'asperiores nobis voluptate qui',
        url: '/images/futsal3.jpg',
      },
      {
        albumId: 1,
        id: 27,
        title: 'sit asperiores est quos quis nisi veniam error',
        url: '/images/futsal3.jpg',
      },
    ],
  };

  // Gw kurang ngerti BE dan API, klo berantakan, gw nyontek dari sini https://www.youtube.com/watch?v=kMuRr53RjcE

  const [pageCount, setPageCount] = useState(3);

  const [items, setItems] = useState(placeholder[1]);

  //   useEffect(() => {
  // const total = ???
  //     setPageCount(total/9)
  //     setItems(placeholder[1]);
  //   });

  const fetchPhotos = (currentPage) => {
    const data = placeholder[currentPage];
    return data;
  };

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    console.log(currentPage);
    const photosFromServer = fetchPhotos(currentPage);
    setItems(photosFromServer);
  };

  return (
    <>
      <div className="w-11/12 lg:w-10/12 max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {items.map((item) => {
          return (
            <div key={item} className="w-full rounded-3xl overflow-hidden">
              <Image
                src={item.url}
                alt="pictures"
                width={'100%'}
                height={'100%'}
                layout="responsive"
                objectFit="cover"
              />
            </div>
          );
        })}
      </div>

      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'mx-auto flex gap-2 justify-center mb-20'}
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
    </>
  );
}
