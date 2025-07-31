"use client";
import ReactModal from "react-modal";
import { useState } from "react";
import { FiX } from "react-icons/fi";

type ModalProps = {
  children(closeModal: () => void): React.ReactNode;
  trigger: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children, trigger }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div onClick={() => setShowModal(true)}>{trigger}</div>
      <ReactModal
        isOpen={showModal}
        onRequestClose={() => closeModal()}
        ariaHideApp={false}
        className="relative z-1000 mx-auto w-md max-w-xl rounded-lg bg-white p-9 shadow-lg outline-none"
        overlayClassName="fixed flex items-center justify-center bg-[rgba(0,0,0,0.5)] inset-0 z-1000"
      >
        <FiX
          size={30}
          className="absolute top-2 right-2 cursor-pointer text-gray-700 hover:text-gray-900"
          onClick={() => setShowModal(false)}
        />
        {children(closeModal)}
      </ReactModal>
    </>
  );
};

export default Modal;
