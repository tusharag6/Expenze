import { configureStore } from "@reduxjs/toolkit";
import summaryReducer from "../features/analytics/reducers/summarySlice";
import billsReducer from "../features/bills/reducers/billsSlice";
import { Bill } from "../types/bills";

export type RootState = {
  bills: {
    bills: Bill[];
  };
};

export default configureStore({
  reducer: {
    summary: summaryReducer,
    bills: billsReducer,
  },
});
