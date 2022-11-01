import React, { useRef, useState } from "react";

import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import StudyLayout from "../../components/layout/StudyLayout";
import BackButton from "../../components/common/BackButton";
import ProblemSelect from "../../components/common/ProblemSelect/ProblemSelect";
import SearchModal from "../../components/common/SearchModal";
import getDate from "../../utils/getDate";

function Assignment() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startDate, setStartDate] = useState(getDate(new Date()));
  const [endDate, setEndDate] = useState(getDate(new Date()));
  const startDateRef = useRef<HTMLInputElement>(null);
  const checkDate = (start: string, end: string) => {
    if (new Date(start) > new Date(end)) {
      alert("날짜를 똑바로 선택해주세요");
      return false;
    }
    return true;
  };
  const onStartDateChange = (date: string) => {
    if (!checkDate(date, endDate)) {
      startDateRef?.current?.focus();
      return;
    }
    setStartDate(date);
  };
  const onEndDateChange = (date: string) => {
    if (!checkDate(startDate, date)) {
      return;
    }
    setEndDate(date);
  };
  return (
    <>
      <StudyLayout
        sideComponent={<BackButton />}
        title="과제 등록"
        description="스터디원들과 같이 풀 문제와 기간을 설정해주세요."
        bg="bg"
      >
        <Flex justifyContent="space-between" alignItems="center" mb={8}>
          <Flex alignItems="center" gap={4}>
            <Text fontSize="lg" fontWeight="bold" flexShrink={0}>
              과제 기간
            </Text>
            <Input
              type="date"
              bg="dep_1"
              cursor="pointer"
              value={startDate}
              onChange={e => onStartDateChange(e.target.value)}
            />
            <Text fontWeight="bold">~</Text>
            <Input
              type="date"
              bg="dep_1"
              cursor="pointer"
              value={endDate}
              onChange={e => onEndDateChange(e.target.value)}
            />
          </Flex>
          <Box
            bg="dep_1"
            p={2}
            borderRadius="10px"
            cursor="pointer"
            onClick={onOpen}
          >
            <Search2Icon w={6} h={6} />
          </Box>
        </Flex>
        <ProblemSelect maxCnt={5} />
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
      <SearchModal isOpen={isOpen} onClose={onClose} maxCnt={5} />
    </>
  );
}

export default Assignment;
