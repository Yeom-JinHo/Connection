import { Center, Progress, Text } from "@chakra-ui/react";
import React from "react";
import { UserProfileType } from "../../asset/data/socket.type";
import ParticipantContainer from "./ParticipantContainer";

interface WaitingViewProps {
  participants: UserProfileType[];
}

function WaitingView({ participants }: WaitingViewProps) {
  return (
    <Center flexDirection="column">
      <Text fontSize="48px" fontWeight="700" m="240px 0 32px 0">
        문제 설정 중입니다.
      </Text>
      <ParticipantContainer users={participants} />
      <Text mb="60px" fontSize="20px">
        스터디장이 문제를 설정하고 있습니다. 대기해주세요.
      </Text>

      <Progress w="720px" h="24px" borderRadius="16px" isIndeterminate />
    </Center>
  );
}

export default WaitingView;
