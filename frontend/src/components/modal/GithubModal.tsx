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
import { getUserProblems, postGithubConfirm } from "../../api/auth";

type GithubModalProps = {
  onClose: () => void;
};

function GithubModal({ onClose }: GithubModalProps) {
  const confirmGithub = async () => {
    const { data } = await postGithubConfirm();
    console.log(data);

    // onClose();
  };

  return (
    <ModalContent bg="dep_1" maxW={650}>
      <ModalBody p="50px">
        <Text fontSize="30px" fontStyle="bold">
          Github
        </Text>
        <Center p="50px 0 30px" flexDir="column">
          <Text fontSize={20} mt="5px" textAlign="center">
            Github에서 “co-nnectnion”
            <br /> Organization 초대 수락 후,
            <br />
            <Text as="span" color="main" display="inline" fontWeight="bold">
              확인
            </Text>{" "}
            버튼을 눌러주세요
          </Text>
          <Flex direction="column">
            <Link
              href={`"깃허브조직초대페이지"`}
              isExternal
              fontSize={12}
              display="flex"
              alignItems="center"
              m="30px 0"
              textDecorationLine="underline"
            >
              Github로 이동하기
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Flex>
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

export default GithubModal;
