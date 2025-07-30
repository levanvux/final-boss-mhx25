"use client";
import ReactModal from "react-modal";
import { useState } from "react";
import { FiX } from "react-icons/fi";

type ModalProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children, trigger }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <div onClick={() => setShowModal(true)}>{trigger}</div>
      <ReactModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        ariaHideApp={false}
        className="relative mx-auto w-md max-w-xl rounded bg-gray-200 p-8 shadow-md"
        overlayClassName="fixed flex items-center justify-center bg-[rgba(0,0,0,0.7)] inset-0 z-1000"
      >
        <FiX
          size={30}
          className="absolute top-2 right-2 cursor-pointer text-gray-800 hover:text-gray-900"
          onClick={() => setShowModal(false)}
        />
        {children}
      </ReactModal>
    </>
  );
};

export default Modal;
