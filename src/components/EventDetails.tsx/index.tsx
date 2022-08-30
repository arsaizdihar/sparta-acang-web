import Image from 'next/image';
import Button from '~/components/Button';

interface EventDetailsProps {
  preconditions: string[];
  location: string;
  time: string;
  openQuota: number;
  maxQuota: number;
  thumbnailUrl: string;
  isRegistered: boolean;
  register: () => void;
  cancel: () => void;
}

export default function EventDetails(props: EventDetailsProps) {
  const {
    preconditions,
    location,
    time,
    openQuota,
    maxQuota,
    isRegistered,
    thumbnailUrl,
    register,
    cancel,
  } = props;

  return (
    <div className="w-11/12 max-w-4xl h-fit mx-auto md:flex md:flex-row-reverse md:justify-between md:items-top md:gap-3">
      <div className="w-full md:w-7/12 h-fit mb-5">
        <Image
          src={thumbnailUrl}
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
          <ul className="list-disc pl-5">
            {preconditions.map((precondition) => (
              <li key={precondition}>{precondition}</li>
            ))}
          </ul>
        </div>
        <div className="font-montserrat text-sudo-dark-brown mb-3">
          <h2 className="text-2xl lg:text-3xl font-bold mb-1">
            Tempat & Waktu
          </h2>
          <ul className="list-disc pl-5">
            <li>
              <span className="font-bold">Lokasi: </span>
              {location}
            </li>
            <li>
              <span className="font-bold">Waktu: </span>
              {time} WIB
            </li>
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <p className="uppercase font-sudo-title text-2xl lg:text-3xl text-sudo-dark-brown">
            Kuota terisi: {openQuota}/{maxQuota}
          </p>
          {isRegistered ? (
            <Button text="BATAL" buttonType="cancel" runOnClick={cancel} />
          ) : (
            <Button text="DAFTAR" buttonType="normal" runOnClick={register} />
          )}
        </div>
      </div>
    </div>
  );
}
