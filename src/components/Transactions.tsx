"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setTransaction } from "@/features/transactionslice";
import Income from "@/components/Income";
import Expense from "@/components/Expence";
import { FcSearch } from "react-icons/fc";

interface Transaction {
  _id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  notes: string;
  createdAt: string;
}

interface FormState {
  title: string;
  amount: number | "";
  type: string;
  category: string;
  notes: string;
}

export default function Transactions() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const dispatch = useDispatch<AppDispatch>();

  const [tran, setTran] = useState<Transaction[]>([]);
  const [form, setForm] = useState<FormState>({
    title: "",
    amount: "",
    type: "",
    category: "",
    notes: "",
  });
  const [filteredTran, setFilteredTran] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async () => {
    if (!userId) return;
    const res = await fetch(`/api/transactions?userId=${userId}`);
    const json = await res.json();
    setTran(json.transactiondata || []);
    setFilteredTran(json.transactiondata || []);
    dispatch(setTransaction(json.transactiondata));
  }, [userId, dispatch]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId }),
    });

    if (res.ok) {
      setForm({ title: "", amount: "", type: "", category: "", notes: "" });
      fetchTransactions();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions?transactionId=${id}`, { method: "DELETE" });
    fetchTransactions();
  };

  const handlesearch = (value: string) => {
    if (!tran.length) return;
    if (!value) {
      setFilteredTran(tran);
      return;
    }
    const filtered = tran.filter((item) => {
      const itemDate = new Date(item.createdAt).toISOString().slice(0, 10);
      return itemDate === value;
    });
    setFilteredTran(filtered);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 lg:h-screen bg-black text-white">
      {/* Left Side */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:justify-evenly gap-4">
          <Income />
          <Expense />
        </div>

        <div className="flex items-center gap-2 bg-[#1f1f1f] p-2 rounded-md">
          <FcSearch className="h-8 w-8" />
          <input
            type="date"
            onChange={(e) => handlesearch(e.target.value)}
            className="bg-gray-400 text-black rounded-md h-10 px-3 w-full sm:w-auto"
          />
        </div>

        <div className="overflow-x-auto rounded-xl bg-[#1f1f1f]">
          <table className="min-w-full table-auto text-sm">
            <thead className="sticky top-0 bg-[#1f1f1f]">
              <tr>
                <th className="px-4 py-2 text-left">TITLE</th>
                <th className="px-4 py-2 text-left">AMOUNT</th>
                <th className="px-4 py-2 text-left">TYPE</th>
                <th className="px-4 py-2 text-left">CATEGORY</th>
                <th className="px-4 py-2 text-left">NOTES</th>
                <th className="px-4 py-2 text-left">DATE</th>
                <th className="px-2 py-2" />
              </tr>
            </thead>
            <tbody>
              {filteredTran.map((t) => (
                <tr key={t._id} className="odd:bg-[#222]">
                  <td className="px-4 py-1 break-words max-w-[150px]">{t.title}</td>
                  <td className="px-4 py-1">{t.amount}</td>
                  <td className="px-4 py-1">{t.type}</td>
                  <td className="px-4 py-1">{t.category}</td>
                  <td className="px-4 py-1 break-words max-w-[200px]">{t.notes}</td>
                  <td className="px-4 py-1">{t.createdAt.slice(0, 10)}</td>
                  <td className="px-2 py-1">
                    <button onClick={() => handleDelete(t._id)}>
                      <TiDeleteOutline className="h-6 w-6 text-red-500 hover:text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Side Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-96 p-6 bg-[#1f1f1f] rounded-xl flex flex-col gap-5"
      >
        <h2 className="text-center text-xl font-bold">
          ADD A FINMATE TRANSACTION
        </h2>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="h-12 rounded bg-slate-700 px-4 text-white"
        />
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="h-12 rounded bg-slate-700 px-4 text-white"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="h-12 rounded bg-slate-700 px-4 text-white"
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="h-12 rounded bg-slate-700 px-4 text-white"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Rent">Rent</option>
          <option value="Shopping">Shopping</option>
          <option value="Salary">Salary</option>
          <option value="Others">Others</option>
        </select>
        <input
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="h-12 rounded bg-slate-700 px-4 text-white"
        />

        <button
          type="submit"
          className="mx-auto mt-2 h-12 w-full sm:w-40 rounded-2xl bg-green-500 font-bold hover:bg-green-600"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
