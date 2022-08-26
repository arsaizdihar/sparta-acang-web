type Props = {
  text: string;
  useArrow?: boolean;
  runOnClick: () => void;
};

const Button = ({ text, runOnClick, useArrow = false }: Props) => {
  return (
    <div className="rounded-3xl border-2 border-solid p-0.5 bg-sudo-dark-tan hover:bg-sudo-dark-brown">
      <button
        onClick={runOnClick}
        className="flex flex-row items-center font-sudo-title justify-center leading-7 font-normal tracking-wider py-1 px-3 bg-sudo-dark-tan hover:text-sudo-dark-tan hover:bg-sudo-dark-brown gap-2 text-xl rounded-3xl border-2 border-solid border-sudo-dark-brown hover:border-sudo-dark-tan"
      >
        <p>{text}</p>
        {useArrow ? <p className="font-bold">{`>`}</p> : null}
      </button>
    </div>
  );
};

export default Button;
