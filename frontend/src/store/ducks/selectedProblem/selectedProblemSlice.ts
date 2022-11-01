import { createSlice } from "@reduxjs/toolkit";
import { Problem } from "../../../pages/Recommend";

interface InitialStateType {
  selectedProblemList: Problem[];
  cnt: number;
}

const initialState: InitialStateType = {
  selectedProblemList: [],
  cnt: 0
};

export const selectedProblemSlice = createSlice({
  name: "selectedProblem",
  initialState,
  reducers: {
    addProblem: (state, action) => {
      if (
        state.selectedProblemList.findIndex(
          problem =>
            problem.problemInfo.problemId ===
            action.payload.problemInfo.problemId
        ) >= 0
      )
        return;
      state.selectedProblemList = [
        ...state.selectedProblemList,
        action.payload
      ];
      state.cnt = state.selectedProblemList.length;
    },
    removeProblem: (state, action) => {
      state.selectedProblemList = [
        ...state.selectedProblemList.filter(
          problem =>
            problem.problemInfo.problemId !==
            action.payload.problemInfo.problemId
        )
      ];
      state.cnt = state.selectedProblemList.length;
    },
    resetSelectedProblem: state => {
      state.selectedProblemList = [];
    }
  }
});

export const { addProblem, removeProblem, resetSelectedProblem } =
  selectedProblemSlice.actions;

export default selectedProblemSlice.reducer;
