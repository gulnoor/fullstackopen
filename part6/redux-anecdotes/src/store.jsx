import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
anecdoteReducer
const reduxStore = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
  },
});

export default reduxStore;
