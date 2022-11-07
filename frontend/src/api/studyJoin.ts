import axios, { AxiosError, AxiosResponse } from "axios";
import { api } from "./api";

export type ErrMsgType = {
  message: string;
};

export interface GetStudyInfoRes {
  studyCode: string;
  studyId: number;
  studyLeaderName: string;
  studyName: string;
  studyPersonnel: number;
  studyRepository: string;
}

export interface createStudyRes {
  studyId: number;
  studyName: string;
  studyRepository: string;
  studyCode: string;
}

export const createStudy = async (
  name: string
): Promise<
  AxiosResponse<createStudyRes, null> | AxiosError<ErrMsgType, null>
> => {
  try {
    const res = await api.post(`/study?study_name=${name}`);
    return res;
  } catch (error) {
    const e = error as AxiosError | Error;
    if (axios.isAxiosError(e)) {
      return e;
    }
    throw e;
  }
};

export const dupliChkStudy = async (
  name: string
): Promise<AxiosResponse<string, null> | AxiosError<ErrMsgType, null>> => {
  try {
    const res = await api.get(`/study?study_name=${name}`);
    return res;
  } catch (error) {
    const e = error as AxiosError | Error;
    if (axios.isAxiosError(e)) {
      return e;
    }
    throw e;
  }
};

export const getStudyInfo = async (
  code: string
): Promise<
  AxiosResponse<GetStudyInfoRes, null> | AxiosError<ErrMsgType, null>
> => {
  try {
    const res = await api.get(`/study/join/${code}`);
    return res;
  } catch (error) {
    const e = error as AxiosError | Error;
    if (axios.isAxiosError(e)) {
      return e;
    }
    throw e;
  }
};

export const joinStudy = async (
  code: string
): Promise<AxiosResponse<string, null> | AxiosError<ErrMsgType, null>> => {
  try {
    const res = await api.post(`/study/join/${code}`);
    return res;
  } catch (error) {
    const e = error as AxiosError | Error;
    if (axios.isAxiosError(e)) {
      return e;
    }
    throw e;
  }
};
