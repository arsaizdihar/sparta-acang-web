import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchButtonProps {
  onClick: any;
}

export default function SearchButton(props: SearchButtonProps) {
  const { onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className="hidden w-10 h-10 md:flex md:justify-center md:items-center text-sudo-tan bg-sudo-orange rounded-full shadow-lg hover:bg-[#b87437] transition active:bg-[#966539]"
    >
      <FontAwesomeIcon icon={faSearch} size="lg" className="w-5" />
    </button>
  );
}
