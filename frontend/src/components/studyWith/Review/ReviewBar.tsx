import { Center, Flex, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import BOJ_LEVEL from "../../../asset/data/baekjoon";

type ReviewBarProps = {
  title: string;
  problemId: number;
  level: number;
  setTiers: (problemId: number, tier: string) => void;
};

function ReviewBar({ problemId, title, level, setTiers }: ReviewBarProps) {
  const defaultLevel = level < 3 ? 3 : level > 29 ? 29 : level;
  const optArr = Array(5)
    .fill(defaultLevel - 2)
    .map((n, idx) => n + idx);
  const [defaultValue, setDefaultValue] = useState(level);

  return (
    <Flex
      w="640px"
      h="64px"
      bg="dep_1"
      p="0 24px"
      borderRadius="20px"
      shadow="2px 4px 4px rgba(0, 0, 0, 0.25)"
      fontSize="20px"
      mb="20px"
      justifyContent="space-between"
    >
      <Center>
        <Text w="60px" mr="12px" borderRight="1px solid #b8b8b8">
          {problemId}
        </Text>
        <Text>{title}</Text>
      </Center>
      <Center>
        <Select
          w="120px"
          bg="dep_2"
          borderRadius="12px"
          cursor="pointer"
          value={defaultValue}
          onChange={e => {
            setTiers(problemId, e.target.value);
            setDefaultValue(+e.target.value);
          }}
        >
          {optArr.map(opt => (
            <option value={opt} key={opt}>
              {BOJ_LEVEL[opt]}
            </option>
          ))}
        </Select>
      </Center>
    </Flex>
  );
}

export default ReviewBar;
