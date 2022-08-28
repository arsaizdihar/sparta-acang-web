type Props = {
  runOnClick: () => void;
};

const LoginButton = ({ runOnClick }: Props) => {
  return (
    <button
      onClick={runOnClick}
      className="flex flex-row items-center font-sudo-title justify-center leading-7 font-normal tracking-wider py-0.5 px-5 bg-sudo-dark-tan md:hover:bg-sudo-dark-brown text-sudo-dark-brown md:hover:text-sudo-dark-tan text-xl rounded-3xl"
    >
      <p>Login</p>
    </button>
  );
};

export default LoginButton;
