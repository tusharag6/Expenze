import { createSlice } from "@reduxjs/toolkit";

export const summarySlice = createSlice({
  name: "summary",
  initialState: {
    income: 0,
    expenses: 0,
    balance: 0,
    transactions: [],
    categories: [],
    recentTransactions: [],
  },
  reducers: {
    setSummary: (state, action) => {
      state.income = action.payload.income;
      state.expenses = action.payload.expenses;
      state.balance = action.payload.balance;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setRecentTransactions: (state, action) => {
      state.recentTransactions = action.payload;
    },
  },
});

export const {
  setSummary,
  setTransactions,
  setCategories,
  setRecentTransactions,
} = summarySlice.actions;

export default summarySlice.reducer;
