import Image from 'next/image';

export default function Documentation() {
  // placeholder buat preview. nanti dihapus
  const placeholder = [
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
      title: 'officia delectus consequatur vero aut veniam explicabo molestias',
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
  ];

  return (
    <>
      <div className="w-11/12 lg:w-10/12 max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {placeholder.map((photos) => {
          return (
            <div key={photos.id} className="w-full rounded-3xl overflow-hidden">
              <Image
                src={photos.url}
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
    </>
  );
}
