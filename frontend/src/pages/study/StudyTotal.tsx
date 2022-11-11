import React, { useEffect, useState } from "react";
import { Link as ReactLink, Navigate, useNavigate } from "react-router-dom";
import { CopyIcon, QuestionIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  Tooltip,
  useClipboard,
  useColorMode,
  useToast
} from "@chakra-ui/react";
import TotalLayout from "../../components/layout/TotalLayout";
import Ranking from "../../components/study/Ranking";
import GithubL from "../../asset/img/githubL.svg";
import GithubD from "../../asset/img/githubD.svg";
import MyActivity from "../../components/study/MyActivity";
import Challenge from "../../components/study/Challenge";
import { useAppSelector } from "../../store/hooks";
import { UserInfoType } from "../../store/ducks/auth/auth.type";
import SubjectView from "../../components/study/subject/SubjectView";

function RankInfo() {
  return (
    <Tooltip
      label={
        <div>
          과제는 스터디장이 등록한 과제를 푼 점수에요
          <br />
          문제풀이 점수는 스터디원들과 같이 문제를 풀었을때 점수에요 <br />
          보너스 점수는 꾸준히 풀 수록 점수가 쌓여요
          <br />
        </div>
      }
    >
      <QuestionIcon w={6} h={6} cursor="help" />
    </Tooltip>
  );
}

function StudyTotal() {
  const { colorMode } = useColorMode();
  const info: UserInfoType = useAppSelector(state => state.auth.information);
  const { onCopy } = useClipboard(info.studyCode);
  const toast = useToast();

  function onCopyEvent() {
    onCopy();
    toast({
      title: "스터디 코드를 복사했습니다!",
      status: "success",
      isClosable: true,
      position: "top"
    });
  }

  return (
    <Box
      bg="dep_1"
      m="40px auto"
      borderRadius="20px"
      boxShadow="md"
      width="800px"
    >
      <Center
        height="80px"
        justifyContent="space-between"
        borderBottom="1px solid #BFBFBF"
      >
        <Flex direction="column" ml="20px">
          <Flex mb="5px" alignItems="center">
            <Heading fontSize="20px" fontWeight="bold" mr="5px">
              {info.studyName}
            </Heading>
            <Link href={info.studyRepository} isExternal>
              <Image src={colorMode === "light" ? GithubL : GithubD} w="20px" />
            </Link>
          </Flex>
          <Text fontSize="14px" display="flex" alignItems="center">
            스터디 코드 : {info.studyCode}
            <CopyIcon mx="3px" onClick={() => onCopyEvent()} cursor="pointer" />
          </Text>
        </Flex>
        <Flex dir="row">
          <Link as={ReactLink} to="/study/collection">
            <Button bg="gra" mr="20px" _hover={{}}>
              문제집
            </Button>
          </Link>
          <Link as={ReactLink} to="/study/management">
            <Button bg="gra" mr="20px" _hover={{}}>
              스터디 관리
            </Button>
          </Link>
        </Flex>
      </Center>
      <Box p="20px">
        <Flex>
          <TotalLayout
            title="챌린지"
            flex="3"
            height="200px"
            mr="10px"
            end="flex-end"
          >
            <Challenge />
          </TotalLayout>
          <TotalLayout
            title="랭킹"
            flex="2"
            height="200px"
            RankInfo={<RankInfo />}
          >
            <Ranking />
          </TotalLayout>
        </Flex>
        <TotalLayout title="과제 현황" height="300px">
          <SubjectView />
        </TotalLayout>
        <TotalLayout title="내 풀이 현황" height="300px">
          <MyActivity />
        </TotalLayout>
      </Box>
    </Box>
  );
}

export default StudyTotal;
