/* eslint-disable import/no-relative-packages */
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  UserProfileType,
} from "./socket.type";
import moment from "moment";

const app = express();
app.use(
  cors({
    origin: "https://www.acmicpc.net",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded());

const httpServer = http.createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
  transports: ["websocket"],
});

instrument(io, { auth: false });

httpServer.listen(8000, () => {
  console.log("listening!!");
});

interface ProblemInfoType {
  title: string;
  problemId: number;
  solvedUser: string[];
  level: number;
}
interface StudyInfoType {
  startTime: moment.Moment;
  problems: ProblemInfoType[];
  duringMinute: number;
  finishedUser: {
    name: string;
    imageUrl: string;
    problem: number;
    time: number | null;
  }[];
  notFinishedUser: {
    name: string;
    imageUrl: string;
    problem: number;
    time: number | null;
  }[];
}
interface UserInfoType {
  name: string;
  studyId: string;
  imageUrl: string;
}

const studyInfos = new Map<string, StudyInfoType>();
const userInfos = new Map<string, UserInfoType>();

const getUserList = async (studyId: string): Promise<UserProfileType[]> => {
  const Users = await io.in(studyId).fetchSockets();
  return Users.map((user) => ({
    name: user.data.name,
    imageUrl: user.data.imageUrl,
  }));
};

app.post("/problem/submit", (req, res) => {
  const { userId, problemNo, submitNo } = req.body;
  const problemId = +`${problemNo}`.trim();
  console.log(userId, problemNo, +problemNo, submitNo);
  const userInfo = userInfos.get(userId);
  if (userInfo) {
    const { studyId, name, imageUrl } = userInfo;
    const problems = studyInfos.get(studyId)?.problems;
    if (problems) {
      let cnt = 0;
      problems.forEach((problem) => {
        if (problemId === problem.problemId) {
          problem.solvedUser.push(userId);
        }
        if (problem.solvedUser.includes(userId)) {
          cnt += 1;
        }
      });

      const allSol = cnt === problems.length;
      io.to(studyId).emit("solvedByExtension", userId, problemId, allSol);

      if (allSol) {
        const studyInfo = studyInfos.get(studyId);
        if (studyInfo) {
          console.log(studyInfo.startTime.diff(moment(), "seconds"));
          studyInfo.finishedUser.push({
            name,
            imageUrl,
            problem: cnt,
            time: moment().diff(studyInfo.startTime, "seconds"),
          });

          studyInfo.notFinishedUser = studyInfo.notFinishedUser.filter(
            (user) => user.name !== name
          );
        }
      }
    }
  }
  res.send(200);
});

io.on("connection", (socket) => {
  socket.on("enter", async (studyId, name, imageUrl, bojId, cb) => {
    console.log(`${studyId}방에 ${name}님이 입장하셨어 boj ${bojId}`);
    socket.data.name = name;
    socket.data.bojId = bojId;
    socket.data.imageUrl = imageUrl;
    userInfos.set(bojId, { studyId, name, imageUrl });
    socket.join(studyId);
    socket.to(studyId).emit("addParticipant", name, imageUrl);
    cb(await getUserList(studyId));
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("removeParticipant", socket.data.name as string);
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected-123--!!");
  });

  socket.on("startStudy", async (studyId, problemList, time, callback) => {
    console.log("startStudy", studyId, problemList, time, getTime(Date.now()));
    const loginedUser = await getUserList(studyId);
    studyInfos.set(studyId, {
      startTime: moment(),
      problems: problemList.map((problem) => ({ ...problem, solvedUser: [] })),
      duringMinute: time,
      finishedUser: [],
      notFinishedUser: loginedUser.map((user) => ({
        ...user,
        problem: 0,
        time: null,
      })),
    });

    io.to(`${studyId}`).emit("startSolve");

    setTimeout(() => {
      io.to(`${studyId}`).emit("endStudy");
    }, time * 1000 * 60);
  });

  socket.on("getSolvingInfo", (callback) => {
    console.log("getSolvingInfo");
    const bojId = socket.data.bojId as string;
    const userInfo = userInfos.get(socket.data.bojId as string);
    const studyInfo = studyInfos.get(userInfo!.studyId);
    const problemInfo = studyInfo!.problems.map((problem) => ({
      ...problem,
      isSolved: problem.solvedUser.includes(bojId),
    }));
    callback(
      problemInfo,
      studyInfo!.duringMinute * 60 -
        moment().diff(studyInfo!.startTime, "seconds")
    );
  });

  socket.on("getResult", (callback) => {
    const userInfo = userInfos.get(socket.data.bojId as string);
    const studyInfo = studyInfos.get(userInfo!.studyId);
    callback([...studyInfo!.finishedUser, ...studyInfo!.notFinishedUser]);
  });
});
