import {
  Box,
  Center,
  Flex,
  Highlight,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import getTime from "../../utils/getTime";
import ViewTitle from "./ViewTitle";
import NextBtn from "./NextBtn";
import { useAppSelector } from "../../store/hooks";
import ParticipantContainer from "./ParticipantContainer";
import { UserProfileType } from "../../asset/data/socket.type";
import { getRecommendTimes } from "../../api/problem";
import { Problem, ProblemInfo } from "../../pages/Recommend";

type ProblemContainerProps = {
  id: number;
  title: string;
  recommendTime: number;
  setTimes: (id: number, time: number) => void;
};
type TimeSetViewProps = {
  onBtnClick: () => void;
  onPrevBtnClick: () => void;
  participants: UserProfileType[];
};

function ProblemContainer({
  id,
  title,
  recommendTime,
  setTimes
}: ProblemContainerProps) {
  const format = (val: number) => `${val}분`;
  const parse = (val: string) => +val.replace("분", "");
  const [time, setTime] = useState(recommendTime);

  useEffect(() => {}, [recommendTime]);
  return (
    <Center mb="32px">
      <Flex
        alignItems="center"
        bg="dep_1"
        w="440px"
        h="72px"
        borderRadius="16px"
        shadow="2px 4px 4px rgba(0, 0, 0, 0.25)"
      >
        <Center borderRight="1px solid #b8b8b8" w="80px" h="40px">
          <Text p="16px">{id}</Text>
        </Center>
        <Text ml="16px">{title}</Text>
      </Flex>
      <NumberInput
        min={1}
        max={180}
        value={format(time)}
        onChange={value => {
          setTime(parse(value));
          setTimes(id, parse(value));
        }}
        borderColor="dep_1"
        ml="32px"
        bg="dep_1"
        w="100px"
        h="72px"
        borderRadius="20px"
        shadow="2px 4px 4px rgba(0, 0, 0, 0.25)"
      >
        <NumberInputField h="72px" />
        <NumberInputStepper>
          <NumberIncrementStepper _hover={{ background: "gra" }} />
          <NumberDecrementStepper _hover={{ background: "gra" }} />
        </NumberInputStepper>
      </NumberInput>
      <Text ml="12px">
        <Highlight
          query={`${recommendTime}분 추천`}
          styles={{
            px: "4",
            py: "1",
            rounded: "full",
            fontWeight: 500,
            bg: "gra",
            color: "chakra-body-text"
          }}
        >
          {`${recommendTime}분 추천`}
        </Highlight>
      </Text>
    </Center>
  );
}
const MemoProblemContainer = React.memo(ProblemContainer);

function TimeSetView({
  onBtnClick,
  onPrevBtnClick,
  participants
}: TimeSetViewProps) {
  // const problemDummy = [
  //   { id: 1, title: "징검다리 달리기", recommendTime: 60 },
  //   { id: 2, title: "징검다리 달리기", recommendTime: 60 },
  //   { id: 3, title: "징검다리 달리기", recommendTime: 120 }
  // ];
  const [times, setTimes] = useState<Map<number, number>>(new Map());
  const studyName = useAppSelector(
    ({ auth: { information } }) => information.studyName
  );
  const selectedProblems = useAppSelector(
    ({ selectedProblem }) => selectedProblem.selectedProblemList
  );
  const [problems, setProblems] = useState<
    { recommendTime: number; problemId: number; title: string }[]
  >(selectedProblems.map(p => ({ ...p.problemInfo, recommendTime: 0 })));

  const totalTime = useMemo(() => {
    let total = 0;
    let flag = false;
    times.forEach(time => {
      if (time > 180) {
        flag = true;
      }
      total += time;
    });
    if (flag) return "문제당 최대 3시간으로 설정해주세요";
    return getTime(total * 60);
  }, [times]);

  const handleTimes = useCallback(
    (id: number, time: number) => setTimes(prev => new Map(prev).set(id, time)),
    []
  );

  useEffect(() => {
    const newTimesMap = new Map();
    (async () => {
      const res = await getRecommendTimes(
        selectedProblems.map(problem => problem.problemInfo.problemId)
      );
      const recommendTimes = res.data.time;
      const newTimes = new Map();
      // eslint-disable-next-line no-restricted-syntax
      for (const id in recommendTimes) {
        if (Object.prototype.hasOwnProperty.call(recommendTimes, id)) {
          console.log(id, recommendTimes[id]);
          newTimes.set(id, recommendTimes[id]);
        }
      }
      setProblems(prev =>
        prev.map(p => {
          return { ...p, recommendTime: newTimes.get(`${p.problemId}`) };
        })
      );
      setTimes(newTimes);
    })();
  }, []);

  useEffect(() => {
    console.log("useEffect", problems);
  }, [problems]);
  return (
    <Center w="1200px" m="auto" flexDir="column">
      <Box w="800px" pos="absolute" top="108px">
        <ArrowBackIcon
          w="32px"
          h="32px"
          cursor="pointer"
          onClick={onPrevBtnClick}
        />
      </Box>

      <ViewTitle
        main="문제 풀이 시간"
        mt={60}
        mb={10}
        des={`${studyName} 과 함께 풀 문제 개수를 선택해주세요`}
        highLight={`${studyName}`}
      />
      <ParticipantContainer users={participants} />
      <Box mt="16px">
        {problems.map(problem => (
          <MemoProblemContainer
            key={problem.problemId}
            title={problem.title}
            id={problem.problemId}
            recommendTime={problem.recommendTime}
            setTimes={handleTimes}
          />
        ))}
      </Box>

      <Center h="90px" mb="12px">
        <Text
          fontSize={
            `${totalTime}` === "문제당 최대 3시간으로 설정해주세요"
              ? "40px"
              : "60px"
          }
        >
          {totalTime}
        </Text>
      </Center>
      <NextBtn text="다음" mt={0} onBtnClick={onBtnClick} />
    </Center>
  );
}

export default TimeSetView;
