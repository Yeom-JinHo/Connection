import { Box, Button, Flex, Grid, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { deleteStudy, quitStudy } from "../../api/study";
import BackButton from "../../components/common/BackButton";
import Confirm from "../../components/common/Confirm";
import StudyLayout from "../../components/layout/StudyLayout";
import { useAppSelector } from "../../store/hooks";

interface ConfirmStateType {
  msg: string;
  onConfirmHandler: () => void;
}

function Management() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmState, setConfirmState] = useState<ConfirmStateType>({
    msg: "",
    onConfirmHandler() {
      return null;
    }
  });
  const auth = useAppSelector(state => state.auth);
  const studyCode = auth.information?.studyCode;
  const isBoss = auth.information?.studyRole === "LEADER";

  const onExitBtnClick = () => {
    setConfirmState({
      msg: `정말 ${isBoss ? "해체" : "탈퇴"}하시겠습니까?`,
      async onConfirmHandler() {
        if (isBoss) {
          await deleteStudy();
          return;
        }
        if (auth.information?.userId) await quitStudy(auth.information?.userId);
      }
    });
    onOpen();
  };
  const onBanBtnClick = (name: string, id: number) => {
    setConfirmState({
      msg: `정말 ${name}님을 추방하시겠습니까?`,
      async onConfirmHandler() {
        await quitStudy(id);
      }
    });
    onOpen();
  };
  return (
    <StudyLayout
      title="스터디 관리"
      description="스터디원들의 활동 내역을 확인할 수 있어요"
      sideComponent={<BackButton />}
    >
      <Box ml="auto" w="fit-content" mb="8">
        <Button
          ml="auto"
          bg="dep_1"
          _hover={{ bg: "dep_1", transform: "scale(1.05)" }}
          _active={{ bg: "dep_1", transform: "scale(1.05)" }}
          onClick={onExitBtnClick}
        >
          {isBoss ? "스터디 해체" : "스터디 탈퇴"}
        </Button>
      </Box>
      <Grid templateColumns="repeat(2,1fr)" gap="32px">
        <Box bg="dep_1">
          <Flex bg="dep_2" p={2} textAlign="center">
            <Text flexGrow={1} borderRight="1px" borderColor="border_gray">
              No 1
            </Text>
            <Text flexGrow={3}>진호</Text>
            {/* {isBoss && ( */}
            <Text
              flexGrow={1}
              color="red"
              cursor="pointer"
              borderLeft="1px"
              borderColor="border_gray"
              onClick={() => {
                onBanBtnClick("진호", 2);
              }}
            >
              추방
            </Text>
            {/* )} */}
          </Flex>
          <Box h="200px" />
        </Box>
      </Grid>
      <Confirm
        isOpen={isOpen}
        onClose={onClose}
        msg={confirmState.msg}
        onConfirmHandler={confirmState.onConfirmHandler}
      />
    </StudyLayout>
  );
}

export default Management;
