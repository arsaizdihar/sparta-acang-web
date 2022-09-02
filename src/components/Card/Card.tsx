import ImageGallery from 'react-image-gallery';
import { ButtonType } from '~/types/frontEndTypes';
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
  buttonType?: ButtonType;
  webUrl?: string;
};

const Card = ({
  imageURLs,
  nthGroup,
  appName,
  description,
  buttonText = 'VOTE',
  runOnButtonClick,
  showButton = false,
  buttonType = 'normal',
  webUrl,
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
    <div className="rounded-lg overflow-hidden w-full max-w-lg flex flex-col items-center shadow">
      <div className="w-full">
        <ImageGallery
          showThumbnails={false}
          autoPlay={true}
          infinite={true}
          showBullets={true}
          showPlayButton={false}
          lazyLoad
          renderRightNav={(onChange: any, disabled: any) =>
            renderNav(onChange, disabled, false)
          }
          renderLeftNav={(onChange: any, disabled: any) =>
            renderNav(onChange, disabled, true)
          }
          items={
            imageURLs.length === 0
              ? [{ original: '/images/placeholder.png' }]
              : imageURLs.map((imageURL) => {
                  return {
                    original: imageURL,
                    originalHeight: 276.75,
                  };
                })
          }
          showFullscreenButton={false}
        />
      </div>
      <div className="flex-1 flex flex-col w-full items-center justify-start bg-sudo-grad2 gap-3 py-5 px-3 text-sudo-dark-tan">
        <h2 className="font-sudo-title text-3xl">
          Kelompok {nthGroup} - ({appName})
        </h2>
        <p className="font-sudo-body self-start flex-1">{description}</p>
        {webUrl ? (
          <Button
            text="Visit website"
            runOnClick={() => window.open(webUrl, '_blank')}
          />
        ) : null}
        {showButton ? (
          <Button
            buttonType={buttonType}
            runOnClick={runOnButtonClick}
            text={buttonText}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Card;
