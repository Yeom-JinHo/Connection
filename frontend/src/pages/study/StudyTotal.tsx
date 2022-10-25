import React, { useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Link,
  Text
} from "@chakra-ui/react";
import TotalLayout from "../../components/layout/TotalLayout";
import Homework from "../../components/study/Homework";
import Ranking from "../../components/study/Ranking";

function StudyTotal() {
  function onCopy() {
    navigator.clipboard.writeText("초대코드");
    alert("스터디 코드가 복사되었습니다!");
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
          <Heading fontSize="20px" fontWeight="bold" mb="5px">
            우건이와 아이들
          </Heading>
          <Text fontSize="14px" display="flex" alignItems="center">
            초대 코드 : SDFWVS
            <ExternalLinkIcon
              mx="3px"
              onClick={() => onCopy()}
              cursor="pointer"
            />
          </Text>
        </Flex>
        <Flex dir="row">
          <Link as={ReactLink} to="/study/list">
            <Button bg="gra" mr="20px" _hover={{}}>
              문제집
            </Button>
          </Link>
          <Link as={ReactLink} to="/study/manage">
            <Button bg="gra" mr="20px" _hover={{}}>
              스터디 관리
            </Button>
          </Link>
        </Flex>
      </Center>
      <Box p="40px 20px">
        <Flex>
          <TotalLayout title="Challenge" flex="3" height="200px" mr="10px">
            <Text>잔디 심기</Text>
          </TotalLayout>
          <TotalLayout title="Rank" flex="2" height="200px">
            <Ranking />
          </TotalLayout>
        </Flex>
        <TotalLayout title="진행중인 과제" height="300px">
          <Homework />
        </TotalLayout>
        <TotalLayout title="내 풀이 현황" height="300px">
          <Text>차트</Text>
        </TotalLayout>
      </Box>
    </Box>
  );
}

export default StudyTotal;