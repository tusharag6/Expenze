import { createSlice } from "@reduxjs/toolkit";

export const billsSlice = createSlice({
  name: "bills",
  initialState: {
    bills: [],
  },
  reducers: {
    setBills: (state, action) => {
      state.bills = action.payload;
    },
  },
});

export const { setBills } = billsSlice.actions;

export default billsSlice.reducer;
