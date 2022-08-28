import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Button from './Button';

const KesanPesan = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-11/12 max-w-4xl h-fit mx-auto">
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-2">
          <h2 className="font-sudo-title text-4xl tracking-wider">
            Bagikan Keseruanmu!
          </h2>
          <p className="font-sudo-body text-xl">
            Ceritakan kesan & pesan dari pengalaman serumu di acara SUDOLYMPIC
          </p>
        </div>
        <form
          className="flex flex-col bg-sudo-grad-kesanpesan-input p-[10px] gap-[10px] rounded-lg"
          onSubmit={handleSubmit}
        >
          <textarea
            value={inputValue}
            onChange={handleTextareaChange}
            name="kesanpesan-input"
            cols={30}
            rows={10}
            placeholder="Tulis ceritamu disini"
            spellCheck={false}
            className="bg-sudo-dark-tan rounded-lg p-[10px] shadow-textarea resize-none spell outline-none font-sudo-body text-sudo-dark-brown placeholder:text-sudo-gradtext-light"
          />
          <div className="self-end">
            <Button text="Kirim" />
          </div>
        </form>
      </div>
      <div className="mt-6 w-full">
        <div className="w-full p-[3px] bg-sudo-grad-kesanpesan-card text-[#512818] rounded-xl">
          <div className="flex gap-2 bg-inherit p-2 border border-sudo-dark-brown rounded-[10px]">
            <div className="flex flex-col items-center relative">
              <button>
                <MdKeyboardArrowUp size={42} />
              </button>
              <p className="relative bottom-2 text-lg font-montserrat">21</p>
              <button className="relative bottom-4">
                <MdKeyboardArrowDown size={42} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <Image
                  width={24}
                  height={24}
                  alt="profpic"
                  src="/images/futsal.jpg"
                  className="object-cover rounded-full"
                />
                <p className="font-sudo-title underline tracking-wider">
                  Nama Spartans
                </p>
              </div>
              <div>
                <p className="font-sudo-body">
                  Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KesanPesan;
