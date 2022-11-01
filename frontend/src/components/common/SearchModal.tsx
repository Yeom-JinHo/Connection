import {
  Box,
  Flex,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";

import ProblemCard from "./ProblemCard";
import useDebounce from "../../hooks/useDebounce";
import { searchProblem } from "../../api/problem";
import { Problem } from "../../pages/Recommend";
import { addProblem } from "../../store/ducks/selectedProblem/selectedProblemSlice";
import { useAppDispatch } from "../../store/hooks";

interface SearchModalTypes {
  isOpen: boolean;
  onClose: () => void;
}

function SearchModal({ isOpen, onClose }: SearchModalTypes) {
  const [problemList, setProblemList] = useState<Problem[]>([]);
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 200);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetch = async () => {
      const res = await searchProblem(debouncedKeyword);
      console.log(res);
      setProblemList(res.data);
    };
    fetch();
  }, [debouncedKeyword]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent p={8} bg="dep_1">
        <Box mb={8} position="relative">
          <Search2Icon
            position="absolute"
            zIndex={100}
            w={5}
            h={5}
            transform="translateX(50%) translateY(50%)"
          />
          <Input
            focusBorderColor="#1581FF"
            bg="dep_2"
            fontSize="xl"
            placeholder="검색어를 입력하세요"
            paddingLeft={10}
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        </Box>
        <Grid
          templateColumns="repeat(2,1fr)"
          gap="32px"
          height="500px"
          overflowY="scroll"
          p={4}
        >
          {problemList.map(problem => (
            <ProblemCard
              bg="dep_2"
              key={problem.problemInfo.problemId}
              problem={problem}
              btnType="add"
              onBtnClick={() => {
                dispatch(
                  addProblem({
                    no: problem.problemInfo.problemId,
                    title: problem.problemInfo.title
                  })
                );
              }}
            />
          ))}
        </Grid>
        <ModalBody />
      </ModalContent>
    </Modal>
  );
}

export default SearchModal;
