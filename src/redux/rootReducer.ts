
import { combineReducers } from '@reduxjs/toolkit'
import transactionReducer from "@/features/transactionslice"
import budgetReducer from "@/features/budgetSlice";



const rootReducer=combineReducers({transaction:transactionReducer,budget:budgetReducer});

export default rootReducer;
export type RootState=ReturnType<typeof rootReducer>

