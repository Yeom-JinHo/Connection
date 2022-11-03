import { Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Center, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import ProblemSelect from "../common/ProblemSelect/ProblemSelect";
import SearchModal from "../common/SearchModal";
import NextBtn from "./NextBtn";
import ViewTitle from "./ViewTitle";

type ProblemSetViewProps = {
  onBtnClick: () => void;
};

function ProblemSetView({ onBtnClick }: ProblemSetViewProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const studyName = useAppSelector(
    ({ auth: { information } }) => information.studyName
  );
  return (
    <Center w="1200px" m="auto" flexDir="column">
      <ViewTitle
        main="문제 선택"
        mt={40}
        mb={0}
        des={`${studyName} 과 함께 풀 문제 개수를 선택해주세요`}
        highLight={`${studyName}`}
      />
      <Box w="880px">
        <Center mb="12px">
          <Button
            bg="dep_2"
            ml="auto"
            borderRadius="12px"
            p="4px"
            onClick={onOpen}
          >
            <Search2Icon w="20px" h="20px" />
          </Button>
        </Center>
        <ProblemSelect maxCnt={3} />
      </Box>
      <NextBtn mt={20} onBtnClick={onBtnClick} text="다음" />
      <SearchModal isOpen={isOpen} onClose={onClose} maxCnt={3} />
    </Center>
  );
}

export default ProblemSetView;
