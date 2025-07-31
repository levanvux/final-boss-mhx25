"use client";

import ReactModal from "react-modal";
import { FiX } from "react-icons/fi";

type ModalProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  extraClassName?: string;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const Modal: React.FC<ModalProps> = ({
  children,
  trigger,
  extraClassName,
  isModalOpen,
  openModal,
  closeModal,
}) => {
  return (
    <>
      <div onClick={() => openModal()}>{trigger}</div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => closeModal()}
        ariaHideApp={false}
        className={`relative z-1000 mx-auto w-md max-w-xl rounded-lg bg-white p-9 shadow-lg outline-none ${extraClassName}`}
        overlayClassName="fixed flex items-center justify-center bg-[rgba(0,0,0,0.5)] inset-0 z-1000"
      >
        <FiX
          size={30}
          className="absolute top-2 right-2 cursor-pointer text-gray-700 hover:text-gray-900"
          onClick={() => closeModal()}
        />
        {children}
      </ReactModal>
    </>
  );
};

export default Modal;
