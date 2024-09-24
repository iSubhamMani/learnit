import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quiz: [],
  },
  reducers: {
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    removeQuiz: (state) => {
      state.quiz = [];
    },
  },
});

export const { setQuiz, removeQuiz } = quizSlice.actions;
export default quizSlice.reducer;
