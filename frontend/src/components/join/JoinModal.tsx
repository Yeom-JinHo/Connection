import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text
} from "@chakra-ui/react";
import React from "react";

function JoinModal() {
  return (
    <ModalContent bg="dep_1" maxW={650}>
      <ModalHeader />
      <ModalCloseButton />
      <ModalBody>
        <Text fontSize="30px" fontStyle="bold">
          회원가입
        </Text>
        <Center py="60px" flexDir="column">
          <Box flexDir="column" mb="50px">
            <Box w="350px" flexDir="column">
              <Box w="80px">
                <Center mr="10px" h={10} fontSize="18px">
                  백준ID
                </Center>
              </Box>
              <Flex direction="column">
                <Input type="text" />
                <Text fontSize={12} mt="5px">
                  연동하는데 문제가 발생했습니다
                </Text>
              </Flex>
              <Box ml="10px">
                <Button bg="gra">연동</Button>
              </Box>
            </Box>
          </Box>
          <Box flexDir="column">
            <Flex w="350px">
              <Box w="80px">
                <Center mr="10px" h={10} fontSize="18px">
                  Code
                </Center>
              </Box>
              <Flex direction="column">
                <Flex
                  fontSize={20}
                  h={10}
                  fontWeight="bold"
                  color="main"
                  align="center"
                >
                  SD2SF4
                </Flex>
                <Text fontSize={12} mt="5px">
                  백준 설정 {">"} 정보 수정 {">"} 상태메시지를
                  <br /> Code로 변경한 뒤,
                  <br /> <span style={{ color: "main" }}>연동</span> 버튼을
                  눌러주세요
                </Text>
              </Flex>
              <Box ml="10px">
                <Button bg="gra">백준 이동</Button>
              </Box>
            </Flex>
          </Box>
        </Center>
      </ModalBody>
    </ModalContent>
  );
}

export default JoinModal;
