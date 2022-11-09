import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { deleteStudy, getMember, quitStudy } from "../../../api/study";
import BackButton from "../../../components/common/BackButton";
import Confirm from "../../../components/common/Confirm";
import StudyLayout from "../../../components/layout/StudyLayout";
import MemberTable from "../../../components/management/MemberTable";
import { getUserInfo } from "../../../store/ducks/auth/authThunk";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Style from "./index.style";

interface StatSeriesType {
  date: string;
  count: number;
  total: number;
  avg: number;
}
export interface MemberType {
  userId: number;
  name: string;
  series: StatSeriesType[];
}
interface ConfirmStateType {
  msg: string;
  onConfirmHandler: () => void;
}

function Management() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmState, setConfirmState] = useState<ConfirmStateType>({
    msg: "",
    onConfirmHandler() {
      return null;
    }
  });
  const [members, setMembers] = useState<MemberType[]>([]);
  const auth = useAppSelector(state => state.auth);
  const isBoss = auth.information?.studyRole === "LEADER";

  const getAndSetMembers = async () => {
    const res = await getMember();
    console.log(res.data);
    setMembers(res.data);
  };
  useEffect(() => {
    getAndSetMembers();
  }, []);
  const onExitBtnClick = () => {
    setConfirmState({
      msg: `정말 ${isBoss ? "해체" : "탈퇴"}하시겠습니까?`,
      async onConfirmHandler() {
        if (isBoss) {
          const res = await deleteStudy();
          console.log(res);
        } else {
          const res = await quitStudy();
          console.log(res);
        }
        dispatch(getUserInfo());
        navigate("/study");
      }
    });
    onOpen();
  };
  const onBanBtnClick = (name: string, id: number) => {
    setConfirmState({
      msg: `정말 ${name}님을 추방하시겠습니까?`,
      async onConfirmHandler() {
        const res = await quitStudy(id);
        console.log(res);
        getAndSetMembers();
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
      <Style.BtnBox>
        <Style.Btn onClick={onExitBtnClick}>
          {isBoss ? "스터디 해체" : "스터디 탈퇴"}
        </Style.Btn>
      </Style.BtnBox>
      <MemberTable
        members={members}
        onBanBtnClick={onBanBtnClick}
        isBoss={isBoss}
      />
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
