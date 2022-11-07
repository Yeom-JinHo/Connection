import { Modal, ModalOverlay, useToast } from "@chakra-ui/react";
import React from "react";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
};

function AuthModal({ isOpen, onClose, content }: AuthModalProps) {
  const toast = useToast();
  const overlayClick = () => {
    toast({
      title: "서비스를 사용하기 위한 필수 과정입니다",
      status: "error",
      position: "top"
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      onOverlayClick={() => overlayClick()}
      closeOnEsc={false}
    >
      <ModalOverlay />
      {content}
    </Modal>
  );
}
export default AuthModal;
