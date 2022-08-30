import Image from 'next/image';
import { EventPageData } from '~/types/cms';
import { usePageData } from '../PageDataProvider';

export default function Documentation() {
  const {
    event: { dokumentasi },
  } = usePageData<EventPageData>();

  return (
    <>
      <div className="w-11/12 lg:w-10/12 max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {dokumentasi.data.map((photos) => {
          return (
            <div key={photos.id} className="w-full rounded-3xl overflow-hidden">
              <Image
                src={photos.attributes.url}
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
