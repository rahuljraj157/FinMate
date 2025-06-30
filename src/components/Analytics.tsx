
'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setTransaction } from '@/features/transactionslice';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28', '#AF19FF'];

export default function AnalyticsPage() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const transactions = useSelector((state: RootState) => state.transaction);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userId) return;
      const res = await fetch(`/api/transactions?userId=${userId}`);
      const json = await res.json();
      dispatch(setTransaction(json.transactiondata));
    };

    fetchTransactions();
  }, [userId, dispatch]);

  const expenseTotals = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc: Record<string, number>, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const data = Object.entries(expenseTotals).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <motion.div
      className="p-4 md:p-8 text-white min-h-screen bg-black"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">📊 Expense Analytics</h2>

      {data.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
         
        </motion.p>
      ) : (
        <>
          {/* Pie Chart Section */}
          <motion.div
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-[#1f1f1f] p-4 sm:p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl mb-4 font-semibold">Category-wise Breakdown</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Boxes */}
          <motion.div
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {data.map((item, index) => (
              <motion.div
                key={index}
                className="min-w-0 bg-[#2a2a2a] p-4 rounded-xl shadow-md text-center hover:shadow-green-400 transition-transform duration-300"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                <p className="text-sm text-gray-400 capitalize break-words">{item.name}</p>
                <p className="text-xl font-bold mt-2 break-words">₹{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
