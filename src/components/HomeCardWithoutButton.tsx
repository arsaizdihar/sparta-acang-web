interface Props {
  title: String;
  description: String;
}

const HomeCardWithoutButton = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center md:w-1/3 gap-4 linear-gradient-card-1 rounded p-6 text-sudo-dark-brown">
      <h2 className="font-sudo-title text-4xl">{title}</h2>
      <p className="text-center font-sudo-body">{description}</p>
    </div>
  );
};

export default HomeCardWithoutButton;
