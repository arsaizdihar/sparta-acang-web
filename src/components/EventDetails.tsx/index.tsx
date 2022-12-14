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
    <div className="w-11/12 max-w-5xl h-fit mx-auto md:flex md:flex-row-reverse md:justify-between md:items-top md:gap-3">
      <div className="w-full md:w-2/5 h-fit mb-5 flex-shrink-0">
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
          <h2 className="text-2xl lg:text-5xl font-bold mb-1 font-sudo-title">
            Prasyarat
          </h2>
          <ReactMarkdown className="prasyarat font-sudo-body text-base lg:text-2xl">
            {data.prasayarat}
          </ReactMarkdown>
        </div>
        <div className="font-montserrat text-sudo-dark-brown mb-3">
          <h2 className="text-2xl lg:text-5xl font-bold mb-1 font-sudo-title">
            Tempat & Waktu
          </h2>
          <ul className="list-disc pl-5 font-sudo-body text-base lg:text-2xl">
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
            <p className="uppercase font-sudo-title text-2xl lg:text-4xl text-sudo-dark-brown">
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
        {registerQuery.data ? (
          <p className="uppercase font-sudo-title text-2xl lg:text-4xl text-sudo-dark-brown">
            Status:{' '}
            {registerQuery.data.eventSlug === data.slug
              ? registerQuery.data.isWaiting
                ? 'Waiting list'
                : 'Terdaftar'
              : 'Belum Terdaftar'}
          </p>
        ) : null}
      </div>
    </div>
  );
}
