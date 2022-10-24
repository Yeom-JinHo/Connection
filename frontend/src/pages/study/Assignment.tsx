import React, { useState } from "react";

import { Box, Button, Flex, Grid, Icon, Input, Text } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { HiMinusCircle } from "react-icons/hi";

import StudyLayout from "../../components/layout/StudyLayout";
import BackButton from "../../components/common/BackButton";
import ProblemCard from "../../components/common/ProblemCard";

const dumpProblemList = [
  {
    id: 123,
    title: "징검다리 건너기",
    difficulty: "골드 3",
    elapsedTime: "1:10:23",
    link: "http://asasfasf.com",
    tags: [{ id: 0, title: "#dfs" }]
  },
  {
    id: 12,
    title: "징검다리 건너기",
    difficulty: "골드 3",
    elapsedTime: "1:10:23",
    link: "http://asasfasf.com",
    tags: [{ id: 0, title: "#dfs" }]
  },
  {
    id: 3,
    title: "징검다리 건너기",
    difficulty: "골드 3",
    elapsedTime: "1:10:23",
    link: "http://asasfasf.com",
    tags: [{ id: 0, title: "#dfs" }]
  }
];

function Assignment() {
  const [problemList, setProblemList] = useState(dumpProblemList);
  return (
    <StudyLayout
      sideComponent={<BackButton />}
      title="과제 등록"
      description="스터디원들과 같이 풀 문제와 기간을 설정해주세요."
      bg="dep_1"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Flex alignItems="center" gap={4}>
          <Text fontSize="lg" fontWeight="bold" flexShrink={0}>
            과제 기간
          </Text>
          <Input type="date" bg="dep_2" />
          <Text fontWeight="bold">~</Text>
          <Input type="date" bg="dep_2" />
        </Flex>
        <Box bg="dep_2" p={2} borderRadius="10px" cursor="pointer">
          <Search2Icon w={6} h={6} />
        </Box>
      </Flex>
      <Grid templateColumns="repeat(2,1fr)" gap="32px">
        <Flex direction="column" alignItems="center">
          <Box
            p={3}
            bg="gra"
            w="full"
            borderTopRadius="20px"
            textAlign="center"
          >
            선택한 문제
          </Box>
          <Flex
            w="full"
            bg="dep_2"
            direction="column"
            alignItems="center"
            h="500px"
            px={8}
            py={8}
            gap={4}
          >
            <Flex
              p={4}
              bg="dep_3"
              w="full"
              borderRadius="20px"
              alignItems="center"
              justifyContent="space-around"
            >
              <Text w="15%" borderRight="1px" borderColor="border_gray">
                No 1
              </Text>
              <Text w="70%" paddingLeft={1}>
                징검
              </Text>
              <Icon
                w="15%"
                as={HiMinusCircle}
                fill="red"
                cursor="pointer"
                onClick={() => console.log("삭제")}
              />
            </Flex>
            <Flex
              p={4}
              bg="dep_3"
              w="full"
              borderRadius="20px"
              alignItems="center"
              justifyContent="space-around"
            >
              <Text w="15%" borderRight="1px" borderColor="border_gray">
                No 1
              </Text>
              <Text w="70%" paddingLeft={1}>
                징검
              </Text>
              <Icon
                w="15%"
                as={HiMinusCircle}
                fill="red"
                cursor="pointer"
                onClick={() => console.log("삭제")}
              />
            </Flex>
            <Flex
              p={4}
              bg="dep_3"
              w="full"
              borderRadius="20px"
              alignItems="center"
              justifyContent="space-around"
            >
              <Text w="15%" borderRight="1px" borderColor="border_gray">
                No 1
              </Text>
              <Text w="70%" paddingLeft={1}>
                징검
              </Text>
              <Icon
                w="15%"
                as={HiMinusCircle}
                fill="red"
                cursor="pointer"
                onClick={() => console.log("삭제")}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" alignItems="center">
          <Flex w="full">
            <Box
              p={3}
              bg="gra"
              w="full"
              borderTopRadius="20px"
              textAlign="center"
              cursor="pointer"
            >
              추천 문제
            </Box>{" "}
            <Box
              p={3}
              bg="dep_3"
              w="full"
              borderTopRadius="20px"
              textAlign="center"
              cursor="pointer"
            >
              문제집
            </Box>
          </Flex>
          <Flex
            w="full"
            bg="dep_2"
            h="500px"
            direction="column"
            p={8}
            gap={8}
            overflowY="scroll"
          >
            {problemList.map(problem => (
              <ProblemCard
                key={problem.id}
                bg="dep_3"
                problem={problem}
                btnType="delete"
                onBtnClick={() => console.log(problem.id)}
              />
            ))}
          </Flex>
        </Flex>
      </Grid>
      <Box mt={4} ml="auto" w="fit-content">
        <Button
          bg="gra"
          _hover={{ transform: "scale(1.05)" }}
          _active={{ transform: "scale(1.05)" }}
        >
          등록하기
        </Button>
      </Box>
    </StudyLayout>
  );
}

export default Assignment;
