import { useSession } from 'next-auth/react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { EventPageData } from '~/types/cms';
import { getHourMinuteString, getWibTime } from '~/utils/time';
import { trpc } from '~/utils/trpc';
import Button from '../Button';
import { usePageData } from '../PageDataProvider';

interface EventDetailsProps {
  register: () => void;
  cancel: () => void;
}

export default function EventDetails(props: EventDetailsProps) {
  const { event: data, showEventRegister } = usePageData<EventPageData>();
  const session = useSession();
  const registerQuery = trpc.useQuery(['event.getRegistered'], {
    enabled: !!session.data?.user && showEventRegister,
  });
  const startTime = getWibTime(data.waktuMulai);
  const endTime = getWibTime(data.waktuSelesai);

  const eventQuery = trpc.useQuery([
    'event.getParticipants',
    { slug: data.slug },
  ]);

  return (
    <div className="w-11/12 max-w-4xl h-fit mx-auto md:flex md:flex-row-reverse md:justify-between md:items-top md:gap-3">
      <div className="w-full md:w-7/12 h-fit mb-5">
        <Image
          src={data.thumbnail.data.attributes.url}
          alt="thumbnail"
          width="100%"
          height="60%"
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <div>
        <div className="font-montserrat text-sudo-dark-brown mb-3">
          <h2 className="text-2xl lg:text-3xl font-bold mb-1">Prasyarat</h2>
          <ReactMarkdown className="prasyarat">{data.prasayarat}</ReactMarkdown>
        </div>
        <div className="font-montserrat text-sudo-dark-brown mb-3">
          <h2 className="text-2xl lg:text-3xl font-bold mb-1">
            Tempat & Waktu
          </h2>
          <ul className="list-disc pl-5">
            <li>
              <span className="font-bold">Lokasi: </span>
              <>{data.lokasi}</>
            </li>
            <li>
              <span className="font-bold">Waktu: </span>
              <>
                {getHourMinuteString(startTime)} -{' '}
                {getHourMinuteString(endTime)} WIB
              </>
            </li>
          </ul>
        </div>
        <div className="flex justify-between items-center">
          {eventQuery.data && (
            <p className="uppercase font-sudo-title text-2xl lg:text-3xl text-sudo-dark-brown">
              Kuota terisi: {eventQuery.data.registered}/{eventQuery.data.total}
            </p>
          )}
          {registerQuery.data ? (
            registerQuery.data.eventSlug === data.slug ? (
              <Button
                text="BATAL"
                buttonType="cancel"
                runOnClick={props.cancel}
              />
            ) : (
              <Button
                text="DAFTAR"
                buttonType="normal"
                runOnClick={props.register}
              />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
