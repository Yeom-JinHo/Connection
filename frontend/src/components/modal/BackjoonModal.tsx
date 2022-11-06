import React, { useEffect, useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import axios from "axios";
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
import { v4 } from "uuid";
import { getUserProblems, postBJConfirm } from "../../api/auth";

type BackjoonModalProps = {
  onClose: () => void;
};

function BackjoonModal({ onClose }: BackjoonModalProps) {
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [code, setCode] = useState("");

  // 백준 연동 확인하기
  const confirmBJ = async () => {
    // 연동 확인
    const data = await postBJConfirm({
      baekjoonId: id,
      code
    });
    console.log(data);

    // // 연동 완료면 백준에서 푼 문제 가져와서 api 사용
    // setMsg("연동되었습니다");
    // // const data = await getUserProblems(id, 1);

    // // 연동 안됐으면 경고 메시지
    // setMsg("연동이 확인되지 않았어요");
    // onClose();
  };

  useEffect(() => {
    setCode(v4().substring(0, 6).toUpperCase());
  }, []);

  return (
    <ModalContent bg="dep_1" maxW={650}>
      <ModalBody p="50px">
        <Text fontSize="30px" fontStyle="bold">
          백준 연동
        </Text>
        <Center p="50px 0 30px" flexDir="column">
          <Flex w="350px" mb="50px">
            <Flex w="70px" h={10} fontSize="18px" alignItems="center">
              백준ID
            </Flex>
            <Flex direction="column">
              <Input
                type="text"
                value={id}
                placeholder="백준 아이디"
                onChange={e => setId(e.target.value)}
              />
              <Text fontSize={12} mt="5px">
                {msg}
              </Text>
            </Flex>
            <Box ml="10px">
              <Button bg="gra" _hover={{}} onClick={() => confirmBJ()}>
                인증
              </Button>
            </Box>
          </Flex>
          <Flex w="350px">
            <Flex w="70px" h={10} fontSize="18px" alignItems="center">
              Code
            </Flex>
            <Flex direction="column">
              <Flex
                fontSize={20}
                h={10}
                fontWeight="bold"
                color="main"
                align="center"
              >
                {code}
              </Flex>
              <Text fontSize={12} mt="5px">
                Solved.ac 프로필 편집 {">"} 상태메시지를
                <br /> Code로 변경한 뒤,{" "}
                <Text as="span" color="main" display="inline" fontWeight="bold">
                  인증
                </Text>{" "}
                버튼을 눌러주세요
              </Text>
              <Link
                href={`https://solved.ac/profile/${id}`}
                isExternal
                fontSize={12}
                display="flex"
                alignItems="center"
                mt="10px"
                textDecorationLine="underline"
              >
                Solved.ac로 이동하기 {"->id 비어있는지 확인해야함"}
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Flex>
          </Flex>
        </Center>
        <Center>
          <Button bg="gra" width="100px" _hover={{}}>
            완료
          </Button>
        </Center>
      </ModalBody>
    </ModalContent>
  );
}

export default BackjoonModal;
