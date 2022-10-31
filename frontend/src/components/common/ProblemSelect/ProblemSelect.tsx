import React, { ReactNode, useEffect, useState } from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import ProblemCard from "../ProblemCard";
import SelectedProblem from "./SelectedProblem";
import { Problem } from "../../../pages/Recommend";
import { getRecommend } from "../../../api/problem";
import { getWorkbook } from "../../../api/workbook";

export interface selectedProblem {
  no: number;
  title: string;
}

interface ProblemSelectProps {
  selectedProblems?: selectedProblem[];
}

interface TabProps {
  selected?: boolean;
  onClick: () => void;
  children: ReactNode;
}

function Tab({ selected, onClick, children }: TabProps) {
  return (
    <Box
      p={3}
      w="full"
      borderTopRadius="20px"
      textAlign="center"
      cursor="pointer"
      bg={`${selected ? "gra" : "dep_2"}`}
      onClick={onClick}
    >
      {children}
    </Box>
  );
}
Tab.defaultProps = {
  selected: false
};

function ProblemSelect({ selectedProblems }: ProblemSelectProps) {
  const [selectedTab, setSelectedTap] = useState(0);
  const [recommends, setRecommends] = useState<Problem[]>([]);
  const [myWorkbook, setMyWorkbook] = useState<Problem[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await getRecommend();
      setRecommends([...res.data.popular, ...res.data.workbook]);
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const res = await getWorkbook();
      setMyWorkbook(res.data);
    };
    fetch();
  }, []);
  return (
    <Grid templateColumns="repeat(2,1fr)" gap="32px">
      <Flex direction="column" alignItems="center">
        <Box
          p={3}
          bg="gra"
          w="full"
          borderTopRadius="20px"
          textAlign="center"
          fontWeight="bold"
        >
          선택한 문제
        </Box>
        <Flex
          w="full"
          bg="dep_1"
          direction="column"
          alignItems="center"
          h="500px"
          px={8}
          py={8}
          gap={4}
          borderBottomRadius="20px"
        >
          {selectedProblems?.map(problem => (
            <SelectedProblem
              key={problem.no}
              no={problem.no}
              title={problem.title}
              onDeleteHandler={() => {
                console.log(`${problem.no} 삭제`);
              }}
            />
          ))}
        </Flex>
      </Flex>
      <Flex direction="column" alignItems="center">
        <Flex w="full" fontWeight="bold">
          <Tab selected={selectedTab === 0} onClick={() => setSelectedTap(0)}>
            추천 문제
          </Tab>
          <Tab selected={selectedTab === 1} onClick={() => setSelectedTap(1)}>
            문제집
          </Tab>
        </Flex>
        <Flex
          w="full"
          bg="dep_1"
          h="500px"
          direction="column"
          p={8}
          gap={8}
          overflowY="scroll"
          borderBottomRadius="20px"
        >
          {selectedTab === 0
            ? recommends.map(problem => (
                <ProblemCard
                  key={problem.problemInfo.problemId}
                  bg="dep_2"
                  problem={problem}
                  btnType="add"
                  onBtnClick={() => console.log(problem.problemInfo.problemId)}
                />
              ))
            : myWorkbook.map(problem => (
                <ProblemCard
                  key={problem.problemInfo.problemId}
                  bg="dep_2"
                  problem={problem}
                  btnType="add"
                  onBtnClick={() => console.log(problem.problemInfo.problemId)}
                />
              ))}
        </Flex>
      </Flex>
    </Grid>
  );
}

ProblemSelect.defaultProps = {
  selectedProblems: []
};

export default ProblemSelect;
