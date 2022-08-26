type CardProps = {
  imageURL: string;
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
  buttonText,
  runOnButtonClick,
  showButton = false,
}: CardProps) => {
  return <div>Card</div>;
};

export default Card;
