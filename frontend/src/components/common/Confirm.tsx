import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";

interface ConfirmPropType {
  isOpen: boolean;
  onClose: () => void;
  msg: string;
  onConfirmHandler: () => Promise<void> | null;
}

function Confirm({ isOpen, onClose, msg, onConfirmHandler }: ConfirmPropType) {
  const [pending, setPending] = useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={!pending}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalBody>
          <Text fontSize="2xl" fontWeight="bold" align="center">
            {pending ? "요청중입니다" : msg}
          </Text>
        </ModalBody>
        <ModalFooter>
          {!pending && (
            <>
              <Button
                colorScheme="red"
                mr={3}
                onClick={async () => {
                  setPending(true);
                  await onConfirmHandler();
                  setPending(false);
                  onClose();
                }}
              >
                네
              </Button>
              <Button variant="ghost" onClick={onClose}>
                아니요
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default Confirm;
