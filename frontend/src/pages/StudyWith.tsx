import { Center, CircularProgress } from "@chakra-ui/react";
import React, { useState } from "react";
import { v4 } from "uuid";
import NumberSetView from "../components/studyWith/NumberSetView";
import ProblemSetView from "../components/studyWith/ProblemSetView";
import TimeSetView from "../components/studyWith/TimeSetView";

function StudyWith() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBoss, setIsBoss] = useState(false);

  const bossView: React.FunctionComponentElement<undefined>[] = [
    <NumberSetView key={v4()} onBtnClick={() => setStep(1)} />,
    <ProblemSetView key={v4()} onBtnClick={() => setStep(2)} />,
    <TimeSetView key={v4()} onBtnClick={() => setStep(3)} />
  ];

  return (
    <Center>
      {isLoading ? (
        <CircularProgress size="120px" mt="30vh" isIndeterminate color="main" />
      ) : (
        <Center>
          {bossView.map((view, ind) => {
            return ind === step && view;
          })}
        </Center>
      )}
    </Center>
  );
}

export default StudyWith;
