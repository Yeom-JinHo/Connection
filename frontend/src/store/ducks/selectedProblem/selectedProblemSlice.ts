import { createSlice } from "@reduxjs/toolkit";
import { Problem } from "../../../pages/Recommend";

interface InitialStateType {
  selectedProblemList: Problem[];
}

const initialState: InitialStateType = {
  selectedProblemList: []
};

export const selectedProblemSlice = createSlice({
  name: "selectedProblem",
  initialState,
  reducers: {
    addProblem: (state, action) => {
      if (
        state.selectedProblemList.findIndex(
          problem => problem.problemInfo.problemId === action.payload.problemId
        ) >= 0
      )
        return;
      state.selectedProblemList = [
        ...state.selectedProblemList,
        action.payload
      ];
    },
    removeProblem: (state, action) => {
      state.selectedProblemList = [
        ...state.selectedProblemList.filter(
          problem => problem.problemInfo.problemId !== action.payload.problemId
        )
      ];
    },
    resetSelectedProblem: state => {
      state.selectedProblemList = [];
    }
  }
});

export const { addProblem, removeProblem, resetSelectedProblem } =
  selectedProblemSlice.actions;

export default selectedProblemSlice.reducer;
