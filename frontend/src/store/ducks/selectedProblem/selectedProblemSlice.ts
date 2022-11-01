import { createSlice } from "@reduxjs/toolkit";

interface SelectedProblemType {
  no: number;
  title: string;
}
interface InitialStateType {
  selectedProblemList: SelectedProblemType[];
}

const initialState: InitialStateType = {
  selectedProblemList: []
};

export const selectedProblemSlice = createSlice({
  name: "selectedProblem",
  initialState,
  reducers: {
    addProblem: (state, action) => {
      state.selectedProblemList = [
        ...state.selectedProblemList,
        action.payload
      ];
    },
    removeProblem: (state, action) => {
      state.selectedProblemList = [
        ...state.selectedProblemList.filter(
          problem => problem.no !== action.payload
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
