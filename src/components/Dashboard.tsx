'use client';

import { setBudget } from '@/features/budgetSlice';
import { setTransaction } from '@/features/transactionslice';
import { signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export interface Transaction {
  _id: string;
  userId: string;
  title: string;
  amount: number;
  type: string;        // e.g., 'expense' or 'income'
  category: string;
  notes: string;
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
  __v: number;
}


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', spending: 4000 },
  { month: 'Feb', spending: 6000 },
  { month: 'Mar', spending: 3500 },
  { month: 'Apr', spending: 8000 },
  { month: 'May', spending: 5000 },
  { month: 'Jun', spending: 7500 },
];


export default function Dashboard() {
  const [transactiondata,setTransactiondata]=useState([]);
 const [groupedResult, setGroupedResult] = useState<{ month: string; spending: number }[]>([]);

  
  const { data: session } = useSession();
    const userId = session?.user?.id;
  const dispatch=useDispatch();
      const fetchTransactions = useCallback(async () => {
      if (!userId) return;
      const res = await fetch(`/api/transactions?userId=${userId}`);
      const json = await res.json();
      console.log(json,40000)
      dispatch(setTransaction(json.transactiondata));
      setTransactiondata(json.transactiondata)
    }, [userId, dispatch]);
  useEffect(()=>{
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbb")
    const fetchBudget=async()=>{
      if(!userId) return;
      
      const data=await fetch(`/api/budget?userId=${userId}`);
      const Data=await data.json();
      console.log(Data);
      dispatch(setBudget(Data.data));

    }
    fetchBudget();
    fetchTransactions();

  },[userId, dispatch,fetchTransactions])



useEffect(() => {
  const monthMap = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const grouped: { [key: string]: number } = {};
  console.log(transactiondata,100000000000)

  transactiondata.forEach((item: Transaction) => {
    const date = new Date(item.createdAt);
    const month = monthMap[date.getMonth()];
    console.log(month,70000000000000)
    if (!grouped[month]) {
      grouped[month] = 0;
    }
    if (item.type === 'expense') {
      grouped[month] += item.amount;
    }
  });

  const result = Object.keys(grouped).map(month => ({
    month,
    spending: grouped[month]
  }));
 
  setGroupedResult(result);
   console.log(result,90000000000)
}, [transactiondata]);

const expense=transactiondata.reduce((acc:any,curr:Transaction)=>{

  if(curr.type==="expense"){
    acc+=curr.amount

  }
  return acc;

},0
)
const income=transactiondata.reduce((acc:any,curr:Transaction)=>{

  if(curr.type==="income"){
    acc+=curr.amount

  }
  return acc;

},0
)




  return (
    
     
     <div>


    

      {/* Main Content */}
      <main className="flex-1 ">
        <div className='flex justify-between w-full'>
           <h2 className="text-3xl font-bold mb-6 m-4">Welcome back 👋</h2>
        <button className='bg-green-500 w-40 rounded-3xl font-bold m-2.5' onClick={()=>signOut()} >LOGOUT</button>

        </div>
       

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard title="Total Balance" amount={(income - expense).toString()} />

          <SummaryCard title="Income" amount={income} />
          <SummaryCard title="Expenses" amount={expense} />
        </div>

        {/* Green Themed Chart */}
        <div className="bg-[#1f1f1f] rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={groupedResult}>
              <CartesianGrid stroke="#2d2d2d" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', color: '#00ff88' }} />
              <Line type="monotone" dataKey="spending" stroke="#00ff88" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
       </div>
   
  );
}



function SummaryCard({ title, amount }: { title: string; amount: string }) {
  return (
    <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg">
      <h4 className="text-gray-400 text-sm">{title}</h4>
      <p className="text-2xl font-bold mt-2">{amount}</p>
    </div>
  );
}
