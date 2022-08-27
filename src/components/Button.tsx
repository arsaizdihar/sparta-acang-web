import { ButtonType } from '~/types/frontEndTypes';

type Props = {
  text: string;
  useArrow?: boolean;
  runOnClick?: () => void;
  buttonType?: ButtonType;
};

const Button = ({
  text,
  runOnClick,
  useArrow = false,
  buttonType = 'normal',
}: Props) => {
  const buttonStyling = {
    normal:
      'bg-sudo-dark-tan text-sudo-dark-brown hover:text-sudo-dark-tan hover:bg-sudo-grad-btn border-sudo-dark-brown hover:border-sudo-dark-tan',
    cancel:
      'bg-sudo-orange text-sudo-dark-tan hover:bg-sudo-grad-btn-cancel border-sudo-dark-tan',
  } as Record<ButtonType, string>;

  const containerStyling = {
    normal: 'bg-sudo-dark-tan hover:bg-sudo-dark-brown',
    cancel: 'bg-sudo-orange hover:bg-sudo-red',
  } as Record<ButtonType, string>;
  return (
    <div className={`rounded-3xl p-0.5 ${containerStyling[buttonType]}`}>
      <button
        onClick={
          runOnClick ??
          (() => {
            console.log();
          })
        }
        className={`flex flex-row items-center font-sudo-title justify-center leading-7 font-normal tracking-wider py-1 px-3  gap-2 text-xl rounded-3xl border-2 border-solid ${buttonStyling[buttonType]}`}
      >
        <p>{text}</p>
        {useArrow ? <p className="font-bold">{`>`}</p> : null}
      </button>
    </div>
  );
};

export default Button;
