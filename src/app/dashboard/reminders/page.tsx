// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useSession } from 'next-auth/react';

// interface Reminder {
//   _id: string;
//   title: string;
//   date: string;
//   repeat: string;
//   isDone: boolean;
// }

// export default function RemindersPage() {
//   const [reminders, setReminders] = useState<Reminder[]>([]);
//   const [form, setForm] = useState({
//     title: '',
//     date: '',
//     repeat: 'none',
//   });
//   const [loading, setLoading] = useState(false);

//   const { data: session } = useSession();
//   const userId = session?.user?.id;

//   const fetchReminders = async () => {
//     try {
//       const res = await fetch('/api/reminders');
//       const data = await res.json();
//       setReminders(data.reminders);
//     } catch (err) {
//       console.error('Error fetching reminders:', err);
//     }
//   };

//   useEffect(() => {
//     fetchReminders();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userId) return;

//     setLoading(true);
//     try {
//       await fetch('/api/reminders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...form, userId }),
//       });
//       setForm({ title: '', date: '', repeat: 'none' });
//       await fetchReminders();
//     } catch (err) {
//       console.error('Error adding reminder:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAsDone = async (id: string) => {
//     try {
//       await fetch(`/api/reminders?id=${id}`, { method: 'PUT' });
//       fetchReminders();
//     } catch (err) {
//       console.error('Error marking as done:', err);
//     }
//   };

//   const deleteReminder = async (id: string) => {
//     try {
//       await fetch(`/api/reminders?id=${id}`, { method: 'DELETE' });
//       fetchReminders();
//     } catch (err) {
//       console.error('Error deleting reminder:', err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto text-white">
//       <h1 className="text-3xl font-bold mb-4">📅 Reminders</h1>

//       {/* Form */}
//       <motion.form
//         onSubmit={handleSubmit}
//         className="bg-[#1f1f1f] p-4 rounded-lg mb-6 flex flex-col gap-4"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <input
//           type="text"
//           placeholder="Reminder title"
//           className="p-2 rounded bg-[#2b2b2b] text-white"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           required
//         />
//         <input
//           type="datetime-local"
//           className="p-2 rounded bg-[#2b2b2b] text-white"
//           value={form.date}
//           onChange={(e) => setForm({ ...form, date: e.target.value })}
//           required
//         />
//         <select
//           className="p-2 rounded bg-[#2b2b2b] text-white"
//           value={form.repeat}
//           onChange={(e) => setForm({ ...form, repeat: e.target.value })}
//         >
//           <option value="none">No Repeat</option>
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//         </select>
//         <button
//           type="submit"
//           disabled={!userId || loading}
//           className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
//         >
//           {loading ? 'Adding...' : 'Add Reminder'}
//         </button>
//       </motion.form>

//       {/* Reminders List */}
//       <div className="space-y-4">
//         {reminders.map((reminder) => (
//           <motion.div
//             key={reminder._id}
//             className={`p-4 rounded-lg flex justify-between items-center ${
//               reminder.isDone ? 'bg-gray-600' : 'bg-[#2a2a2a]'
//             }`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <div>
//               <h2 className="text-lg font-semibold">{reminder.title}</h2>
//               <p className="text-sm text-gray-400">
//                 {new Date(reminder.date).toLocaleString()}
//               </p>
//               <p className="text-xs text-gray-500">Repeat: {reminder.repeat}</p>
//             </div>
//             <div className="space-x-2">
//               {!reminder.isDone && (
//                 <button
//                   onClick={() => markAsDone(reminder._id)}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//                 >
//                   Done
//                 </button>
//               )}
//               <button
//                 onClick={() => deleteReminder(reminder._id)}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useSession } from 'next-auth/react';

// interface Reminder {
//   _id: string;
//   title: string;
//   date: string;
//   repeat: string;
//   isDone: boolean;
// }

// export default function RemindersPage() {
//   const [reminders, setReminders] = useState<Reminder[]>([]);
//   const [form, setForm] = useState({
//     title: '',
//     date: '',
//     repeat: 'none',
//   });
//   const [loading, setLoading] = useState(false);

//   const { data: session } = useSession();
//   const userId = session?.user?.id;

//   const fetchReminders = async () => {
//     try {
//       const res = await fetch('/api/reminders');
//       const data = await res.json();
//       setReminders(data.reminders);
//     } catch (err) {
//       console.error('Error fetching reminders:', err);
//     }
//   };

//   useEffect(() => {
//     fetchReminders();
//   }, []);

//   // Ask for notification permission once
//   useEffect(() => {
//     if (Notification.permission !== 'granted') {
//       Notification.requestPermission();
//     }
//   }, []);

//   // Schedule browser notifications for upcoming reminders
//   useEffect(() => {
//     if (Notification.permission !== 'granted') return;

//     const now = new Date().getTime();

//     reminders.forEach((reminder) => {
//       if (reminder.isDone) return;

//       const reminderTime = new Date(reminder.date).getTime();
//       const delay = reminderTime - now;

//       if (delay > 0 && delay <= 86400000) {
//         setTimeout(() => {
//           new Notification('🔔 Reminder', {
//             body: `${reminder.title} is due now!`,
//             icon: '/icon.png', // Optional icon
//           });
//         }, delay);
//       }
//     });
//   }, [reminders]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userId) return;

//     setLoading(true);
//     try {
//       await fetch('/api/reminders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...form, userId }),
//       });
//       setForm({ title: '', date: '', repeat: 'none' });
//       await fetchReminders();
//     } catch (err) {
//       console.error('Error adding reminder:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAsDone = async (id: string) => {
//     try {
//       await fetch(`/api/reminders?id=${id}`, { method: 'PUT' });
//       fetchReminders();
//     } catch (err) {
//       console.error('Error marking as done:', err);
//     }
//   };

//   const deleteReminder = async (id: string) => {
//     try {
//       await fetch(`/api/reminders?id=${id}`, { method: 'DELETE' });
//       fetchReminders();
//     } catch (err) {
//       console.error('Error deleting reminder:', err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto text-white">
//       <h1 className="text-3xl font-bold mb-4">📅 Reminders</h1>

//       {/* Form */}
//       <motion.form
//         onSubmit={handleSubmit}
//         className="bg-[#1f1f1f] p-4 rounded-lg mb-6 flex flex-col gap-4"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <input
//           type="text"
//           placeholder="Reminder title"
//           className="p-2 rounded bg-[#2b2b2b] text-white"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           required
//         />
//         <input
//           type="datetime-local"
//           className="p-2 rounded bg-[#2b2b2b] text-white"
//           value={form.date}
//           onChange={(e) => setForm({ ...form, date: e.target.value })}
//           required
//         />
//         <select
//           className="p-2 rounded bg-[#2b2b2b] text-white"
//           value={form.repeat}
//           onChange={(e) => setForm({ ...form, repeat: e.target.value })}
//         >
//           <option value="none">No Repeat</option>
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//         </select>
//         <button
//           type="submit"
//           disabled={!userId || loading}
//           className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
//         >
//           {loading ? 'Adding...' : 'Add Reminder'}
//         </button>
//       </motion.form>

//       {/* Reminders List */}
//       <div className="space-y-4">
//         {reminders.map((reminder) => (
//           <motion.div
//             key={reminder._id}
//             className={`p-4 rounded-lg flex justify-between items-center ${
//               reminder.isDone ? 'bg-gray-600' : 'bg-[#2a2a2a]'
//             }`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <div>
//               <h2 className="text-lg font-semibold">{reminder.title}</h2>
//               <p className="text-sm text-gray-400">
//                 {new Date(reminder.date).toLocaleString()}
//               </p>
//               <p className="text-xs text-gray-500">Repeat: {reminder.repeat}</p>
//             </div>
//             <div className="space-x-2">
//               {!reminder.isDone && (
//                 <button
//                   onClick={() => markAsDone(reminder._id)}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//                 >
//                   Done
//                 </button>
//               )}
//               <button
//                 onClick={() => deleteReminder(reminder._id)}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useSession } from 'next-auth/react';

// interface Reminder {
//   _id: string;
//   title: string;
//   date: string;
//   repeat: string;
//   isDone: boolean;
// }

// export default function RemindersPage() {
//   const [reminders, setReminders] = useState<Reminder[]>([]);
//   const [form, setForm] = useState({
//     title: '',
//     date: '',
//     repeat: 'none',
//   });
//   const [loading, setLoading] = useState(false);

//   const { data: session } = useSession();
//   const userId = session?.user?.id;

//   const fetchReminders = async () => {
//     try {
//       const res = await fetch('/api/reminders');
//       const data = await res.json();
//       setReminders(data.reminders);
//     } catch (err) {
//       console.error('Error fetching reminders:', err);
//     }
//   };

//   useEffect(() => {
//     fetchReminders();
//   }, []);

//   // Request Notification Permission Once
//   useEffect(() => {
//     if (typeof window !== 'undefined' && 'Notification' in window) {
//       if (Notification.permission === 'default') {
//         Notification.requestPermission();
//       }
//     }
//   }, []);

//   // Schedule Notifications
//   useEffect(() => {
//     if (!('Notification' in window) || Notification.permission !== 'granted') return;

//     const now = new Date().getTime();

//     reminders.forEach((reminder) => {
//       if (reminder.isDone) return;

//       const reminderTime = new Date(reminder.date).getTime();
//       const delay = reminderTime - now;

//       if (delay > 0 && delay <= 86400000) {
//         setTimeout(() => {
//           new Notification('🔔 Reminder Alert', {
//             body: `${reminder.title} is due now!`,
//           });
//         }, delay);
//       }
//     });
//   }, [reminders]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userId) return;

//     setLoading(true);
//     try {
//       await fetch('/api/reminders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...form, userId }),
//       });
//       setForm({ title: '', date: '', repeat: 'none' });
//       await fetchReminders();
//     } catch (err) {
//       console.error('Error adding reminder:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAsDone = async (id: string) => {
//     try {
//       await fetch(`/api/reminders?id=${id}`, { method: 'PUT' });
//       fetchReminders();
//     } catch (err) {
//       console.error('Error marking as done:', err);
//     }
//   };

//   const deleteReminder = async (id: string) => {
//     try {
//       await fetch(`/api/reminders?id=${id}`, { method: 'DELETE' });
//       fetchReminders();
//     } catch (err) {
//       console.error('Error deleting reminder:', err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto text-white">
//       <h1 className="text-3xl font-bold mb-4">📅 Reminders</h1>

//       {/* Form */}
//       <motion.form
//         onSubmit={handleSubmit}
//         className="bg-[#1f1f1f] p-4 rounded-lg mb-6 flex flex-col gap-4"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <input
//           type="text"
//           placeholder="Reminder title"
//           className="p-2 rounded bg-[#2b2b2b] text-white"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           required
//         />
//         <input
//           type="datetime-local"
//           className="p-2 rounded bg-[#2b2b2b] text-white"
//           value={form.date}
//           onChange={(e) => setForm({ ...form, date: e.target.value })}
//           required
//         />
//         <select
//           className="p-2 rounded bg-[#2b2b2b] text-white"
//           value={form.repeat}
//           onChange={(e) => setForm({ ...form, repeat: e.target.value })}
//         >
//           <option value="none">No Repeat</option>
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//         </select>
//         <button
//           type="submit"
//           disabled={!userId || loading}
//           className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
//         >
//           {loading ? 'Adding...' : 'Add Reminder'}
//         </button>
//       </motion.form>

//       {/* Reminders List */}
//       <div className="space-y-4">
//         {reminders.map((reminder) => (
//           <motion.div
//             key={reminder._id}
//             className={`p-4 rounded-lg flex justify-between items-center ${
//               reminder.isDone ? 'bg-gray-600' : 'bg-[#2a2a2a]'
//             }`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <div>
//               <h2 className="text-lg font-semibold">{reminder.title}</h2>
//               <p className="text-sm text-gray-400">
//                 {new Date(reminder.date).toLocaleString()}
//               </p>
//               <p className="text-xs text-gray-500">Repeat: {reminder.repeat}</p>
//             </div>
//             <div className="space-x-2">
//               {!reminder.isDone && (
//                 <button
//                   onClick={() => markAsDone(reminder._id)}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//                 >
//                   Done
//                 </button>
//               )}
//               <button
//                 onClick={() => deleteReminder(reminder._id)}
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface Reminder {
  _id: string;
  title: string;
  date: string;
  repeat: string;
  isDone: boolean;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [form, setForm] = useState({
    title: '',
    date: '',
    repeat: 'none',
  });
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const fetchReminders = async () => {
    try {
      const res = await fetch('/api/reminders');
      const data = await res.json();
      setReminders(data.reminders);
    } catch (err) {
      console.error('Error fetching reminders:', err);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  // Request Notification Permission Once
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          console.log('Notification permission:', permission);
        });
      }
    }
  }, []);

  // Schedule Notifications
  useEffect(() => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const now = new Date().getTime();

    reminders.forEach((reminder) => {
      if (reminder.isDone) return;

      const reminderTime = new Date(reminder.date).getTime();
      const delay = reminderTime - now;

      if (delay > 0 && delay <= 86400000) {
        setTimeout(() => {
          console.log('🔔 Sending Notification:', reminder.title);
          new Notification('🔔 Reminder Alert', {
            body: `${reminder.title} is due now!`,
            // icon: '/icon.png', // Optional icon (place in /public folder if needed)
          });
        }, delay);
      }
    });
  }, [reminders]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    try {
      await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, userId }),
      });
      setForm({ title: '', date: '', repeat: 'none' });
      await fetchReminders();
    } catch (err) {
      console.error('Error adding reminder:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsDone = async (id: string) => {
    try {
      await fetch(`/api/reminders?id=${id}`, { method: 'PUT' });
      fetchReminders();
    } catch (err) {
      console.error('Error marking as done:', err);
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      await fetch(`/api/reminders?id=${id}`, { method: 'DELETE' });
      fetchReminders();
    } catch (err) {
      console.error('Error deleting reminder:', err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">📅 Reminders</h1>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-[#1f1f1f] p-4 rounded-lg mb-6 flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <input
          type="text"
          placeholder="Reminder title"
          className="p-2 rounded bg-[#2b2b2b] text-white"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          className="p-2 rounded bg-[#2b2b2b] text-white"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <select
          className="p-2 rounded bg-[#2b2b2b] text-white"
          value={form.repeat}
          onChange={(e) => setForm({ ...form, repeat: e.target.value })}
        >
          <option value="none">No Repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button
          type="submit"
          disabled={!userId || loading}
          className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Reminder'}
        </button>
      </motion.form>

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.map((reminder) => (
          <motion.div
            key={reminder._id}
            className={`p-4 rounded-lg flex justify-between items-center ${
              reminder.isDone ? 'bg-gray-600' : 'bg-[#2a2a2a]'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div>
              <h2 className="text-lg font-semibold">{reminder.title}</h2>
              <p className="text-sm text-gray-400">
                {new Date(reminder.date).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Repeat: {reminder.repeat}</p>
            </div>
            <div className="space-x-2">
              {!reminder.isDone && (
                <button
                  onClick={() => markAsDone(reminder._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Done
                </button>
              )}
              <button
                onClick={() => deleteReminder(reminder._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
