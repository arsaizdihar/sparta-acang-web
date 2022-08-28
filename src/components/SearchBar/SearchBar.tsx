import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchBarProps {
  placeholder: string;
}

export default function SearchBar(props: SearchBarProps) {
  const { placeholder } = props;

  return (
    <div className="w-fit mx-auto mt-10 mb-7">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex gap-3"
      >
        <div className="relative flex gap-2 items-center w-25 sm:w-[400px] lg:w-[500px] text-sudo-gradtext-light focus-within:text-sudo-orange">
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            className="absolute md:hidden ml-3 w-5 pointer-events-none"
          />
          <input
            id=""
            type="text"
            placeholder={placeholder}
            className="w-full bg-sudo-tan font-sudo-body placeholder-sudo-gradtext-light placeholder:font-sudo-body text-sudo-orange px-3 py-2 rounded-full pl-11 md:pl-6 shadow-lg outline-none focus:outline-sudo-orange focus:placeholder-sudo-orange  "
          />
        </div>
        <button
          type="submit"
          className="hidden w-10 h-10 md:flex md:justify-center md:items-center text-sudo-tan bg-sudo-orange rounded-full shadow-lg hover:bg-[#b87437] transition active:bg-[#966539]"
        >
          <FontAwesomeIcon icon={faSearch} size="lg" className="w-5" />
        </button>
      </form>
    </div>
  );
}
