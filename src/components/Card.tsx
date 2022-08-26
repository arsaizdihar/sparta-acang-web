import Button from './Button';

type CardProps = {
  imageURL: string[];
  title: string;
  description: string;
  showButton?: boolean;
  runOnButtonClick?: () => void;
  buttonText?: string;
};

const Card = ({
  imageURL,
  title,
  description,
  buttonText = 'VOTE',
  runOnButtonClick,
  showButton = false,
}: CardProps) => {
  return (
    <div className="rounded-lg overflow-hidden w-full max-w-lg  flex-col items-center justify-center shadow">
      {/* Carousel here */}
      <div className="flex flex-col w-full items-center justify-start bg-sudo-grad2 gap-3 pb-5 text-sudo-dark-tan">
        <h2 className="font-sudo-title text-3xl">{title}</h2>
        <p className="font-sudo-body">{description}</p>
        <Button runOnClick={() => console.log('Bruh')} text={buttonText} />
      </div>
    </div>
  );
};

export default Card;
