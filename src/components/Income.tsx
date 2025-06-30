
import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

const Income = () => {

    const trandata=useSelector((state:RootState)=>state.transaction)
    console.log(trandata)
  return (
    
      <div className="w-60 rounded-xl bg-[#36c241] flex flex-col gap-0.5 items-center justify-center text-black font-bold ">
        <div>INCOME</div>
            <div className='text-3xl'>

           
   ₹{trandata.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0)}
   </div>


          </div>
    
  )
}

export default Income;

