// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /* ─── Types ──────────────────────────────────────────────── */
// export interface Budget {
//   food: number;
//   travel: number;
//   rent: number;
//   shopping: number;
//   other: number;
// }


// interface BudgetState {
//   data: Budget | null;       
// }

// /* ─── Initial State ──────────────────────────────────────── */
// const initialState: BudgetState = {
//   data: null,
// };

// /* ─── Slice ──────────────────────────────────────────────── */
// const budgetSlice = createSlice({
//   name: 'budget',
//   initialState,
//   reducers: {
    
//     setBudget(state, action: PayloadAction<Budget>) {
//       state.data = action.payload;         
//     },

  
//   },
// });

// /* ─── Exports ────────────────────────────────────────────── */
// export const { setBudget } = budgetSlice.actions;
// export default budgetSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BudgetState {
  data: {
    [key: string]: number;
  } | null;
}

const initialState: BudgetState = {
  data: null,
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setBudget: (
      state,
      action: PayloadAction<BudgetState['data']>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
