import { Center, CircularProgress } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { v4 } from "uuid";
import { io, Socket } from "socket.io-client";
import NumberSetView from "../components/studyWith/NumberSetView";
import ProblemSetView from "../components/studyWith/ProblemSetView";
import ResultView from "../components/studyWith/ResultView";
import ReviewView from "../components/studyWith/ReviewView";
import SolvingView from "../components/studyWith/SolvingView";
import TimeSetView from "../components/studyWith/TimeSetView";
import {
  ClientToServerEvents,
  PageViewState,
  ServerToClientEvents
} from "../asset/data/socket.type";
import { useAppSelector } from "../store/hooks";

function StudyWith() {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    process.env.NODE_ENV === "development"
      ? io("ws://localhost:8000", {
          autoConnect: false,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 3,
          transports: ["websocket"]
        })
      : io("wss://k7c202.p.ssafy.io", {
          path: "/node/socket.io",
          autoConnect: false,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 3,
          transports: ["websocket"]
        });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isBoss, setIsBoss] = useState(false);
  const [participants, setPartcipants] = useState<string[]>([]);

  const { studyId, name } = useAppSelector(
    ({ auth: { information } }) => information
  );
  const bossView: React.FunctionComponentElement<undefined>[] = [
    <NumberSetView
      key={v4()}
      onBtnClick={() => setStep(PageViewState.ProblemSet)}
    />,
    <ProblemSetView
      key={v4()}
      onBtnClick={() => setStep(PageViewState.TimeSet)}
    />,
    <TimeSetView
      key={v4()}
      onBtnClick={() => setStep(PageViewState.Solving)}
      onPrevBtnClick={() => setStep(PageViewState.ProblemSet)}
    />,
    <SolvingView key={v4()} onBtnClick={() => setStep(PageViewState.Result)} />,
    <ResultView key={v4()} onBtnClick={() => setStep(PageViewState.Review)} />,
    <ReviewView key={v4()} onBtnClick={() => setStep(1)} />
  ];

  useEffect(() => {
    socket.connect();
    socket.emit("enter", studyId, name);

    return () => {
      socket.disconnect();
    };
  }, []);

  const test = (e: ChangeEvent<HTMLInputElement>) => {
    socket.emit("chat", e.target.value);
  };
  return (
    <Center>
      <input onChange={test} />
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
