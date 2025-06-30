
import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

const Expense = () => {

    const trandata=useSelector((state:RootState)=>state.transaction)
    console.log(trandata)
  return (
    
      <div className="w-60 rounded-xl bg-[#fbf30a]  flex flex-col items-center justify-center text-black font-bold">
        <div>EXPENSE</div>
           <div className='text-3xl'>
  ₹{trandata.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0)}

</div> 
          </div>
    
  )
}

export default Expense;

