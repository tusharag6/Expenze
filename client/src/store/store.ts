import { configureStore } from "@reduxjs/toolkit";
import summaryReducer from "../features/analytics/reducers/summarySlice";

export default configureStore({
  reducer: {
    summary: summaryReducer,
  },
});
