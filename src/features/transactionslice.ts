// import { createSlice,PayloadAction } from "@reduxjs/toolkit";

// export interface Transaction {
//   _id: string;
//   title: string;
//   amount: number;
//   type: 'income' | 'expense';
//   category: string;
//   notes: string;
//   userId: string;
//   createdAt: string; // ISO date string
//   updatedAt: string;
//   __v: number;
// }


// const initialState:Transaction[]=[]

// const transactionSlice=createSlice({name:"transaction",initialState,reducers:{
//   addTransaction:(state,action:PayloadAction<Transaction>)=>{
//     state.push(action.payload)
    

//     },
//     removeTransaction:(state,action:PayloadAction<String>)=>{
//         state=state.filter((x)=>x._id!==action.payload)

//     },
//     setTransaction:(state,action:PayloadAction<Transaction[]>)=>{
//         state=action.payload;

//     }





// }})

// export const { addTransaction, removeTransaction,setTransaction}= transactionSlice.actions;
// export default  transactionSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* ────────────── */
/*  Types         */
/* ────────────── */
export interface Transaction {
  _id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  notes: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

/* ────────────── */
/*  Initial State */
/* ────────────── */
const initialState: Transaction[] = [];

/* ────────────── */
/*  Slice         */
/* ────────────── */
const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    // ✅ Add one transaction
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.push(action.payload);
    },

    // ✅ Remove transaction by ID
    removeTransaction: (state, action: PayloadAction<string>) => {
      return state.filter((t) => t._id !== action.payload);
    },

    // ✅ Replace all transactions (e.g., after fetch)
    setTransaction: (_state, action: PayloadAction<Transaction[]>) => {
      return action.payload;
    },
  },
});

/* ────────────── */
/*  Exports       */
/* ────────────── */
export const { addTransaction, removeTransaction, setTransaction } =
  transactionSlice.actions;

export default transactionSlice.reducer;
