type NavigationButtonProps = {
  isLeft: boolean;
  onClick: any;
  disabled: boolean;
};

const NavigationButton = ({
  isLeft,
  onClick,
  disabled,
}: NavigationButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`image-gallery-icon image-gallery-${
        isLeft ? 'left' : 'right'
      }-nav text-lg sm:text-2xl py-1 px-2 sm:py-2 sm:px-3 flex items-center justify-center rounded-full bg-sudo-dark-brown opacity-75 ${
        isLeft ? 'ml-3' : 'mr-3'
      } text-sudo-dark-tan hover:bg-sudo-dark-brown hover:text-sudo-dark-tan`}
      onClick={onClick}
    >
      {isLeft ? '<' : '>'}
    </button>
  );
};

export default NavigationButton;
