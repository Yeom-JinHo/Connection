import { Box, Center, Flex, Text, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { getRank } from "../../api/study";
import { useAppSelector } from "../../store/hooks";

type RankingProps = {
  homeworkScore: number;
  ranking: number;
  studyId: number;
  studyName: string;
  studyScore: number;
  totalScore: number;
};

const datas = [
  {
    studyId: 1,
    studyName: "스터디명",
    ranking: 1,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 2,
    studyName: "스터디명",
    ranking: 2,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 3,
    studyName: "스터디명",
    ranking: 3,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 4,
    studyName: "스터디명",
    ranking: 4,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 5,
    studyName: "스터디명",
    ranking: 5,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 6,
    studyName: "스터디명",
    ranking: 6,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 7,
    studyName: "스터디명",
    ranking: 7,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 8,
    studyName: "스터디명",
    ranking: 8,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 9,
    studyName: "스터디명",
    ranking: 9,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 10,
    studyName: "스터디명",
    ranking: 10,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 11,
    studyName: "스터디명",
    ranking: 11,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 12,
    studyName: "스터디명",
    ranking: 12,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 13,
    studyName: "스터디명",
    ranking: 13,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 14,
    studyName: "스터디명",
    ranking: 14,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 15,
    studyName: "스터디명",
    ranking: 15,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 16,
    studyName: "스터디명",
    ranking: 16,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 17,
    studyName: "스터디명",
    ranking: 17,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 18,
    studyName: "스터디명",
    ranking: 18,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  {
    studyId: 19,
    studyName: "스터디명",
    ranking: 19,
    homeworkScore: 10,
    studyScore: 2,
    totalScore: 12
  },
  { studyId: 20, studyName: "스터디명", ranking: 20 }
];
function Ranking() {
  const id = useAppSelector(state => state.auth.information?.studyId);
  // const id = 8;
  const [ranks, setRanks] = useState<RankingProps[]>([]);
  const myStudyRef = useRef<null | HTMLDivElement>(null);
  const parentRef = useRef<null | HTMLDivElement>(null);

  const getRanking = async () => {
    const {
      data: { data }
    } = await getRank();
    setRanks(data);
  };

  useEffect(() => {
    getRanking();
    if (myStudyRef.current && parentRef.current) {
      const test = myStudyRef.current.offsetTop;
      // 가운데로 포커싱하기 위해 빼주는 값
      const centerHeight =
        parentRef.current.clientHeight / 2 -
        myStudyRef.current.clientHeight / 2;
      parentRef.current.scrollTo({
        top: test - centerHeight,
        behavior: "smooth"
      });
    }
  }, [parentRef.current]);

  return (
    <Box
      h="100%"
      w="100%"
      overflowY="auto"
      display="flex"
      flexDir="column"
      alignItems="center"
      p="26px 0 10px"
      ref={parentRef}
    >
      {ranks.map(study => {
        return (
          <Tooltip
            label={
              <div>
                {study.studyName}
                <br />
                과제 점수 : {study.homeworkScore} <br />
                문제 풀이 점수 : {study.studyScore} <br /> 총 점수 :
                {study.totalScore}
              </div>
            }
            key={v4()}
          >
            <Flex
              bg={id === study.studyId ? "gra" : "white"}
              borderRadius="15px"
              boxShadow="md"
              p="8px 16px"
              m="3px 0"
              w="200px"
              _dark={id === study.studyId ? {} : { bg: "dep_3" }}
              ref={id === study.studyId ? myStudyRef : null}
            >
              <Text w="40px">{study.ranking}</Text>
              <Text
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {study.studyName}
              </Text>
            </Flex>
          </Tooltip>
        );
      })}
    </Box>
  );
}

export default Ranking;
