import ImageGallery from 'react-image-gallery';
import Button from '../Button';
import NavigationButton from './NavigationButton';

type CardProps = {
  imageURLs: string[];
  nthGroup: number;
  appName: string;
  description: string;
  showButton?: boolean;
  runOnButtonClick?: () => void;
  buttonText?: string;
};

const Card = ({
  imageURLs,
  nthGroup,
  appName,
  description,
  buttonText = 'VOTE',
  runOnButtonClick,
  showButton = false,
}: CardProps) => {
  const renderNav = (onChange: any, disabled: any, isLeft: boolean) => {
    return (
      <NavigationButton
        isLeft={isLeft}
        onClick={onChange}
        disabled={disabled}
      />
    );
  };
  return (
    <div className="rounded-lg overflow-hidden w-full max-w-lg flex flex-col items-center justify-center shadow">
      <div className="w-full">
        <ImageGallery
          showThumbnails={false}
          autoPlay={true}
          infinite={true}
          showBullets={true}
          showPlayButton={false}
          renderRightNav={(onChange: any, disabled: any) =>
            renderNav(onChange, disabled, false)
          }
          renderLeftNav={(onChange: any, disabled: any) =>
            renderNav(onChange, disabled, true)
          }
          items={imageURLs.map((imageURL) => {
            return { original: imageURL };
          })}
          showFullscreenButton={false}
        />
      </div>
      <div className="flex flex-col w-full items-center justify-start bg-sudo-grad2 gap-3 py-5 px-3 text-sudo-dark-tan">
        <h2 className="font-sudo-title text-3xl">
          Kelompok {nthGroup} - ({appName})
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
