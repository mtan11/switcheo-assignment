import { ReactNode, FC } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@switcheo/assets/icons/close-icon.svg?react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed top-0 z-50 flex h-full w-full items-center justify-center bg-modal-backdrop">
      <div className="min-w-full rounded-2xl bg-white p-8 md:min-w-[450px]">
        <button className="float-right hover:text-teal-500" onClick={onClose}>
          <CloseIcon data-testid="closeModalButton" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
