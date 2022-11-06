import { UserInfoType } from "../../store/ducks/auth/auth.type";
/* eslint-disable no-shadow */

export type UserProfileType = Pick<UserInfoType, "name" | "imageUrl">;

export interface ServerToClientEvents {
  initParticipant: (
    newName: UserInfoType["name"][],
    newImageUrl: UserInfoType["imageUrl"][]
  ) => void;
  addParticipant: (
    newName: UserInfoType["name"],
    newImageUrl: UserInfoType["imageUrl"]
  ) => void;
  removeParticipant: (targetName: UserInfoType["name"]) => void;
  endStudy: () => void;
  startSolve: () => void;
}

export interface ClientToServerEvents {
  enter: (
    studyId: UserInfoType["studyId"],
    name: UserInfoType["name"],
    imageUrl: UserInfoType["imageUrl"],
    initParticipant: (userList: UserProfileType[]) => void
  ) => void;
  startStudy: (
    studyId: UserInfoType["studyId"],
    problemList: number[],
    time: number,
    callback: () => void
  ) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  name: UserInfoType["name"];
  imageUrl: UserInfoType["imageUrl"];
}

export enum PageViewState {
  NumberSet,
  ProblemSet,
  TimeSet,
  Solving,
  Result,
  Review
}
