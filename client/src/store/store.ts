import { configureStore } from "@reduxjs/toolkit";
import summaryReducer from "../features/analytics/reducers/summarySlice";
import billsReducer from "../features/bills/reducers/billsSlice";
import { Bill } from "../types/bills";
import { Subscription } from "../types/Subscription";
import subscriptionReducer from "../features/subscription/reducers/subscriptionSlice";

export type RootState = {
  bills: {
    bills: Bill[];
  };
  subscriptions: {
    subscriptions: Subscription[];
  };
};

export default configureStore({
  reducer: {
    summary: summaryReducer,
    bills: billsReducer,
    subscription: subscriptionReducer,
  },
});
