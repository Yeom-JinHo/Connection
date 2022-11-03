/* eslint-disable no-shadow */
export interface ServerToClientEvents {
  newParticipant: (name: string) => void;
}

export interface ClientToServerEvents {
  chat: (msg: string) => void;
  enter: (studyId: number, name: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export enum PageViewState {
  NumberSet,
  ProblemSet,
  TimeSet,
  Solving,
  Result,
  Review
}
