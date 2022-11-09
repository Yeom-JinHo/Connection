import React, { useState } from "react";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Link,
  ModalBody,
  Text,
  useClipboard,
  useToast,
  Spinner
} from "@chakra-ui/react";
import { getUserProblems, postBJConfirm, postBJSolved } from "../../api/auth";
import { useAppDispatch } from "../../store/hooks";
import { updateUserInfo } from "../../store/ducks/auth/authSlice";

type BackjoonModalProps = {
  code: string;
};

type BJPromblemProps = {
  acceptedUserCount: number;
  averageTries: number;
  givesNoRating: boolean;
  isLevelLocked: boolean;
  isPartial: boolean;
  isSolvable: boolean;
  level: number;
  official: boolean;
  problemId: number;
  sprout: boolean;
  tags: any[];
  titleKo: string;
  titles: any[];
  votedUserCount: number;
};

function BackjoonModal({ code }: BackjoonModalProps) {
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const { onCopy } = useClipboard(code);
  const toast = useToast();
  const dispatch = useAppDispatch();
  // 백준 연동 확인하기
  const confirmBJ = async () => {
    // 연동 확인
    try {
      const data = await postBJConfirm({
        baekjoonId: id,
        code
      });
      if (data.msg === "success") {
        setMsg("인증되었습니다");
        setReady(true);
      }
    } catch (error) {
      console.log(error);
      setMsg("인증에 실패했습니다");
      setReady(false);
    }
  };

  const onCopyEvent = () => {
    onCopy();
    toast({
      title: "인증 코드를 복사했습니다!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 1000
    });
  };

  const onFinish = async () => {
    if (loading) return;
    setLoading(true);
    // onClose();
    // 백준에서 푼 문제 가져오기
    const res = await getUserProblems(id, 1);
    const total = res.data.count;
    const range = Array.from({ length: total / 50 + 1 }, (v, i) => i + 1);
    const alls = await Promise.all(
      range.map(async params => getUserProblems(id, params))
    );
    const solved: number[] = [];
    alls.map(data =>
      data.data.items.map((item: BJPromblemProps) =>
        solved.push(item.problemId)
      )
    );
    // console.log(solved);
    // 푼 문제 보내기
    const resSolved = await postBJSolved({ list: solved });
    // console.log(resSolved);
    if (resSolved.msg === "success") {
      toast({
        title: "백준 인증 성공했습니다!",
        position: "top",
        duration: 1000
      });

      // redux 수정하기
      dispatch(updateUserInfo({ backjoonId: id }));
      setLoading(false);
    }
  };

  return (
    <ModalBody p="50px">
      <Text fontSize="30px" fontWeight="bold">
        백준 연동
      </Text>
      <Center p="50px 0" flexDir="column">
        <Flex w="350px" mb="30px">
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
              <CopyIcon
                color="black"
                _dark={{ color: "white" }}
                _dark={{ color: "white" }}
                boxSize="15px"
                mx="3px"
                onClick={() => onCopyEvent()}
                cursor="pointer"
              />
            </Flex>
            <Text fontSize={12} mt="5px">
              Solved.ac 프로필 편집 {">"} 상태메시지를
              <br /> Code로 변경한 뒤,{" "}
              <Text as="span" color="main" display="inline" fontWeight="bold">
                인증
              </Text>{" "}
              버튼을 눌러주세요
            </Text>
            <Box h="20px">
              <Link
                href={`https://solved.ac/profile/${id}`}
                isExternal
                fontSize={12}
                display="flex"
                alignItems="center"
                textDecorationLine="underline"
                pointerEvents={id === "" ? "none" : "auto"}
              >
                Solved.ac로 이동하기
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Box>
          </Flex>
        </Flex>
        <Flex w="350px">
          <Flex w="70px" h={10} fontSize="18px" alignItems="center">
            백준ID
          </Flex>
          <Flex direction="column">
            <Input
              type="text"
              value={id}
              placeholder="백준 ID를 입력해주세요"
              onChange={e => setId(e.target.value)}
            />
            <Text fontSize={12} mt="5px" color={ready ? "green" : "red"}>
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
            백준ID
          </Flex>
          <Flex direction="column">
            <Input
              type="text"
              value={id}
              placeholder="백준 ID를 입력해주세요"
              onChange={e => setId(e.target.value)}
            />
            <Text fontSize={12} mt="5px" color={ready ? "green" : "red"}>
              {msg}
            </Text>
          </Flex>
          <Box ml="10px">
            <Button bg="gra" _hover={{}} onClick={() => confirmBJ()}>
              인증
            </Button>
          </Box>
        </Flex>
      </Center>
      <Center>
        <Button
          bg="gra"
          width="100px"
          _hover={{}}
          _active={{}}
          disabled={!ready}
          onClick={() => onFinish()}
        >
          {loading ? <Spinner /> : "완료"}
        </Button>
      </Center>
    </ModalBody>
  );
}

export default BackjoonModal;
