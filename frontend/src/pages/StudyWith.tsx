import React, { useState } from "react";
import NumberSetView from "../components/studyWith/NumberSetView";

function StudyWith() {
  const [step, setStep] = useState(0);
  return <NumberSetView onBtnClick={() => setStep(1)} />;
}

export default StudyWith;
