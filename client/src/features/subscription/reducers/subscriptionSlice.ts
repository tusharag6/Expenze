import { createSlice } from "@reduxjs/toolkit";

export const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState: {
    subscription: [],
  },
  reducers: {
    setSubscriptions: (state, action) => {
      state.subscription = action.payload;
    },
  },
});

export const { setSubscriptions } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
