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
      'bg-sudo-dark-tan text-sudo-dark-brown hover:text-sudo-dark-tan hover:bg-sudo-grad-btn outline-sudo-dark-brown hover:outline-sudo-dark-tan',
    cancel:
      'bg-sudo-orange text-sudo-dark-tan hover:bg-sudo-grad-btn-cancel outline-sudo-dark-tan',
    disabled: 'bg-slate-200 text-black',
  } as Record<ButtonType, string>;
  return (
    <button
      disabled={buttonType === 'disabled'}
      onClick={runOnClick ?? (() => null)}
      className={`flex flex-row items-center font-sudo-title justify-center leading-7 font-normal tracking-wider py-1 px-3 gap-2 text-xl rounded-3xl outline-offset-[-0.25rem] outline outline-2 ${buttonStyling[buttonType]}`}
    >
      <p>{text}</p>
      {useArrow ? <p className="font-bold">{`>`}</p> : null}
    </button>
  );
};

export default Button;
