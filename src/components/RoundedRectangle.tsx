interface Props {
  position: String;
}

const RoundedRectangle = ({ position }: Props) => {
  return (
    <div
      className={`z-[-1] w-[216px] h-[130px] absolute bg-sudo-grad2 rounded-tl-[200px] pl-4 pt-[6px] ${
        position === 'left'
          ? 'rotate-180 top-[10%] md:top-[20%] left-[0]'
          : 'top-[85%] md:top-[70%] right-[0]'
      }`}
    >
      <div className="border-2 border-[#E0C79F] rounded-tl-[200px] w-[200px] h-[116px] border-r-0"></div>
    </div>
  );
};

export default RoundedRectangle;
