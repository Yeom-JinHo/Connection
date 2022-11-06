import React, { useRef, useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Link,
  ModalBody,
  ModalContent,
  Text
} from "@chakra-ui/react";
import { getUserProblems } from "../../api/auth";

type ExtensionModalProps = {
  onClose: () => void;
};

function ExtensionModal({ onClose }: ExtensionModalProps) {
  const confirmGithub = async () => {
    onClose();
  };

  return (
    <ModalContent bg="dep_1" maxW={650}>
      <ModalBody p="50px">
        <Text fontSize="30px" fontStyle="bold">
          Extension
        </Text>
        <Center p="50px 0 30px" flexDir="column">
          <Text fontSize={20} mb="30px" textAlign="center">
            “connection” 확장 프로그램이 <br />
            설치되지 않았거나 꺼져있어요😢 <br />
            확장 프로그램을 실행해주세요!
          </Text>
          <Button
            bg="gra"
            width="100px"
            _hover={{}}
            onClick={() => confirmGithub()}
          >
            확인
          </Button>
        </Center>
      </ModalBody>
    </ModalContent>
  );
}

export default ExtensionModal;
