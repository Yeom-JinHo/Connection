import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  keyframes,
  Select,
  Stack,
  Text
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";

const animation = keyframes`
0%{
  transform: translateY(-10%);
  opacity: 0;
}
100% {
    transform: translateY(0%);
}
`;

function Filter() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeFilter = () => {
    ref.current?.animate(
      [
        { transform: "translateY(0%)" },
        { transform: "translateY(-10%)", opacity: 0 }
      ],
      {
        duration: 500,
        easing: "ease-out"
      }
    );
    setTimeout(() => {
      setOpen(prev => false);
    }, 500);
  };
  const openFilter = () => {
    setOpen(true);
  };
  const toggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "filter") {
      if (open) closeFilter();
      else openFilter();
    }
  };
  return (
    <Box>
      <Flex
        h={10}
        p={2}
        px={3}
        bg="dep_1"
        position="absolute"
        borderRadius="10px"
        shadow="2px 4px 4px rgba(0, 0, 0, 0.25)"
        top={10}
        right={12}
        cursor="pointer"
        justifyContent="center"
        alignItems="center"
        id="filter"
        onClick={toggle}
      >
        추천 필터
        {open ? (
          <ChevronUpIcon onClick={closeFilter} w={6} h={6} />
        ) : (
          <ChevronDownIcon onClick={openFilter} w={6} h={6} />
        )}
        {open && (
          <Flex
            position="absolute"
            direction="column"
            gap="20px"
            top="50px"
            right="0"
            w="300px"
            bg="dep_2"
            p={6}
            borderRadius="20px"
            zIndex="1"
            cursor="default"
            shadow="2px 4px 4px rgba(0, 0, 0, 0.25)"
            animation={`${animation} 1s`}
            ref={ref}
          >
            <Flex alignItems="center" justifyContent="space-around">
              <Text>태그</Text>
              <Stack>
                <Select placeholder="상관없음" borderColor="dep_3" />
              </Stack>
            </Flex>
            <Flex alignItems="center" justifyContent="space-around">
              <Text>레벨</Text>
              <Stack>
                <Select placeholder="상관없음" borderColor="dep_3" />
              </Stack>
            </Flex>
            <Flex justifyContent="space-around">
              <Button onClick={closeFilter} bg="dep_3">
                닫기
              </Button>
              <Button bg="dep_3">적용</Button>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default Filter;
