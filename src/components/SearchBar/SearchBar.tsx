import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import SearchButton from './SearchButton';

interface SearchBarProps {
  placeholder: string;
  runOnSearch: (query: string) => void;
  reset: () => void;
}

export default function SearchBar({
  placeholder,
  runOnSearch,
  reset,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const firstRender = useRef(true);

  useEffect(() => {
    if (query.trim() === '' && !firstRender.current) {
      reset();
    }

    if (firstRender) {
      firstRender.current = false;
    }
  }, [query, reset]);

  return (
    <div className="w-fit mx-auto mt-10 mb-7">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runOnSearch(query);
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
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-sudo-tan font-sudo-body placeholder-sudo-gradtext-light placeholder:font-sudo-body text-sudo-orange px-3 py-2 rounded-full pl-11 md:pl-6 shadow-lg outline-none focus:outline-sudo-orange focus:placeholder-sudo-orange  "
          />
        </div>
        <SearchButton
          onClick={() => {
            runOnSearch(query);
          }}
        />
      </form>
    </div>
  );
}
