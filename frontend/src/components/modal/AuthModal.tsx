import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useToast
} from "@chakra-ui/react";
import React from "react";
import { updateUserInfo } from "../../store/ducks/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
};

function AuthModal({ isOpen, onClose, content }: AuthModalProps) {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const backjoonId = useAppSelector(state => state.auth.information.backjoonId);
  const overlayClick = () => {
    toast({
      title: "서비스를 사용하기 위한 필수 과정입니다",
      status: "error",
      position: "top"
    });
  };

  const test = () => {
    const id = backjoonId ? "" : "test";
    dispatch(updateUserInfo({ backjoonId: id }));
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
      <ModalContent bg="dep_1" maxW={650}>
        <Button onClick={test}>{backjoonId}</Button>
        {content}
      </ModalContent>
    </Modal>
  );
}
export default AuthModal;
