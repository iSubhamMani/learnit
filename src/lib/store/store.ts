import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "./features/quiz.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      quiz: quizSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
