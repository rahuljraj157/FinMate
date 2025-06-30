'use client';

import { setBudget } from '@/features/budgetSlice';
import { setTransaction } from '@/features/transactionslice';
import { RootState } from '@/redux/store';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface BudgetType {
  food: string;
  travel: string;
  rent: string;
  shopping: string;
  other: string;
}



export interface Budget {
  [key: string]: number;
}

const Budgets = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [bud, setBud] = useState<BudgetType>({
    food: '',
    travel: '',
    rent: '',
    shopping: '',
    other: '',
  });

  const transaction = useSelector((state: RootState) => state.transaction);
  const budgetData: Budget = useSelector((state: RootState) => state.budget.data || {});

  const expenseTotals: Record<string, number> = transaction
    .filter((item) => item.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBud((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;

    const res = await fetch('/api/budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...bud, userId }),
    });

    const data = await res.json();
    console.log(data);
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;

    const res = await fetch(`/api/budget?userId=${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...bud, userId }),
    });

    const data = await res.json();
    console.log(data, '✅ Budget updated');
  };

  const totalBudget = Object.keys(budgetData).reduce((sum, key) => {
    return sum + (Number(budgetData[key]) || 0);
  }, 0);

  const totalExpense = Object.values(expenseTotals).reduce((sum, val) => sum + val, 0);
  const totalBalance = totalBudget - totalExpense;

  const fetchTransactions = useCallback(async () => {
    if (!userId) return;
    const res = await fetch(`/api/transactions?userId=${userId}`);
    const json = await res.json();
    dispatch(setTransaction(json.transactiondata));
  }, [userId, dispatch]);

  useEffect(() => {
    const fetchBudget = async () => {
      if (!userId) return;
      const data = await fetch(`/api/budget?userId=${userId}`);
      const Data = await data.json();
      dispatch(setBudget(Data.data));
      setBud({
        food: Data.data.food,
        travel: Data.data.travel,
        rent: Data.data.rent,
        shopping: Data.data.shopping,
        other: Data.data.other,
      });
    };
    fetchBudget();
    fetchTransactions();
  }, [userId, dispatch,fetchTransactions]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 w-full bg-black text-white min-h-screen">
      {/* Summary + Table */}
      <div className="w-full bg-[#1f1f1f] p-4 rounded-xl overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-black font-bold">
          <div className="h-20 bg-blue-400 rounded-2xl flex items-center justify-center">
            Budget: ₹{totalBudget}
          </div>
          <div className="h-20 bg-blue-400 rounded-2xl flex items-center justify-center">
            Expense: ₹{totalExpense}
          </div>
          <div className="h-20 bg-blue-400 rounded-2xl flex items-center justify-center">
            Balance: ₹{totalBalance}
          </div>
        </div>

        <div className="overflow-auto rounded-xl">
          <table className="min-w-full table-auto text-sm text-white">
            <thead className="bg-[#2a2a2a]">
              <tr>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Budget</th>
                <th className="px-4 py-2 text-left">Expense</th>
                <th className="px-4 py-2 text-left">Balance</th>
              </tr>
            </thead>
            <tbody>
              {budgetData &&
                Object.keys(bud).map((key) => {
                  const budget = Number(budgetData[key]) || 0;
                  const match = Object.keys(expenseTotals).find(
                    (k) => k.toLowerCase() === key.toLowerCase()
                  );
                  const expense = match ? expenseTotals[match] : 0;
                  const remaining = budget - expense;

                  return (
                    <tr key={key} className="border-t border-gray-600">
                      <td className="px-4 py-2 capitalize">{key}</td>
                      <td className="px-4 py-2">₹{budget}</td>
                      <td className="px-4 py-2">₹{expense}</td>
                      <td className="px-4 py-2">₹{remaining}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Form */}
      <form
        onSubmit={Object.keys(budgetData).length !== 0 ? handleEdit : handleSubmit}
        className="w-full lg:w-[400px] bg-[#1f1f1f] p-5 flex flex-col gap-5 rounded-xl"
      >
        {Object.keys(bud).map((key) => (
          <div key={key} className="flex w-full">
            <label className="bg-gray-500 p-2 font-bold w-1/3 rounded-l-lg capitalize text-center">
              {key}
            </label>
            <input
              type="number"
              name={key}
              value={bud[key as keyof BudgetType]}
              onChange={handleChange}
              className="bg-white text-black p-3 rounded-r-lg w-2/3"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-500 h-12 w-full hover:bg-green-600 rounded-2xl font-bold mt-4"
        >
          {Object.keys(budgetData).length !== 0 ? 'Edit' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Budgets;

