import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';

type Props = {
  text: string;
  buttonText: string;
  runToClose: () => void;
  runOnButtonClick: () => void;
};

const Modal = ({ buttonText, runOnButtonClick, runToClose, text }: Props) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 relative bg-sudo-grad-modal w-fit p-5 rounded-lg max-w-md"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex items-center justify-center">
        <div className="h-9">
          <FontAwesomeIcon icon={faExclamationCircle} size="sm" />
        </div>
        <p className="font-sudo-title text-2xl leading-9 text-center">{text}</p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button buttonType="cancel" text="Cancel" runOnClick={runToClose} />
        <Button
          text={buttonText}
          runOnClick={() => {
            runOnButtonClick();
            runToClose();
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
