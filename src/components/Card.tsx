import ImageGallery from 'react-image-gallery';
import Button from './Button';

type CardProps = {
  imageURLs: string[];
  nthGroup: number;
  projectName: string;
  description: string;
  showButton?: boolean;
  runOnButtonClick?: () => void;
  buttonText?: string;
};

const Card = ({
  imageURLs,
  nthGroup,
  projectName,
  description,
  buttonText = 'VOTE',
  runOnButtonClick,
  showButton = false,
}: CardProps) => {
  return (
    <div className="rounded-lg overflow-hidden w-full max-w-lg flex flex-col items-center justify-center shadow">
      <div className="w-full">
        <ImageGallery
          showThumbnails={false}
          autoPlay={true}
          infinite={true}
          showBullets={true}
          showPlayButton={false}
          items={imageURLs.map((imageURL) => {
            return { original: imageURL };
          })}
        />
      </div>
      {/* Carousel here */}
      <div className="flex flex-col w-full items-center justify-start bg-sudo-grad2 gap-3 pb-5 text-sudo-dark-tan">
        <h2 className="font-sudo-title text-3xl">
          Kelompok {nthGroup} - ({projectName})
        </h2>
        <p className="font-sudo-body">{description}</p>
        {showButton ? (
          <Button runOnClick={runOnButtonClick} text={buttonText} />
        ) : null}
      </div>
    </div>
  );
};

export default Card;
