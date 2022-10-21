import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { Box, Grid, Text } from "@chakra-ui/react";

import ProblemCard from "../components/common/ProblemCard";
import StudyLayout from "../components/layout/StudyLayout";
import SideComponent from "../components/recommend/SideComponent";

const TABS = [
  {
    id: 0,
    label: "많이 푼 유형",
    isSelected: true,
    msg: "자주 출제되는 유형 중/가장 많이 푼 유형의 문제들을 추천해 줍니다. "
  },
  {
    id: 1,
    label: "푼지 오래된 유형",
    isSelected: false,
    msg: "자주 출제되는 유형 중/가장 푼지 오래된 유형의 문제들을 추천해 줍니다. "
  },
  {
    id: 2,
    label: "많이 담은 문제",
    isSelected: false,
    msg: "자주 출제되는 유형 중/다른 스터디가 많이 담아놓은 문제들을 추천해 줍니다. "
  }
];

export interface Tab {
  id: number;
  label: string;
  isSelected: boolean;
}

function Recommend() {
  const [tabs, setTabs] = useState(TABS);
  const [selectedTap, setSelectedTap] = useState(0);
  const onTabClick: React.MouseEventHandler<HTMLDivElement> = e => {
    if (e.target instanceof HTMLDivElement && e.target.dataset.id) {
      const targetId = Number(e.target.dataset.id);
      setTabs(prevTabs =>
        prevTabs.map(prevTab =>
          prevTab.id === targetId
            ? { ...prevTab, isSelected: true }
            : { ...prevTab, isSelected: false }
        )
      );
      setSelectedTap(Number(e.target.dataset.id));
    }
  };
  return (
    <StudyLayout
      sideComponent={<SideComponent tabs={tabs} onTabClick={onTabClick} />}
    >
      <Box mb="40px">
        <Text fontSize="2xl" fontWeight="bold" mt="20px" mb="20px">
          {tabs[selectedTap].label}
        </Text>
        {tabs[selectedTap].msg.split("/").map(text => (
          <Text key={uuid()} mt="10px" mb="10px">
            {text}
          </Text>
        ))}
      </Box>
      <Grid templateColumns="repeat(2,1fr)" gap="32px">
        <ProblemCard />
        <ProblemCard />
        <ProblemCard />
        <ProblemCard />
      </Grid>
    </StudyLayout>
  );
}
export default Recommend;
