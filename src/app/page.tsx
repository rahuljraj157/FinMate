// 'use client';

// import { motion } from 'framer-motion';

// export default function Home() {
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-[#0e0e0e] text-center px-4">
//       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
//         Hey, I am your personal finance management friend! 💰<br />
//         I will help you manage your money and save it for later.
//       </h1>

//       <motion.a
//         href="/auth/signup"
//         className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition rotating"
//         animate={{
//           x: [0, -5, 5, -5, 5, 0], // shake left-right
//         }}
//         transition={{
//           duration: 0.6,
//           repeat: Infinity,
//           ease: 'easeInOut',
//         }}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         Join Now
//       </motion.a>

//       {/* Add global style for rotation */}
//       <style jsx global>{`
//         @keyframes rotatePause {
//           0% { transform: rotate(0deg); }
//           50% { transform: rotate(360deg); }
//           100% { transform: rotate(360deg); } /* pause */
//         }

//         .rotating {
//           animation: rotatePause 4s linear infinite;
//         }
//       `}</style>
//     </main>
//   );
// }

// 'use client';

// import { motion } from 'framer-motion';

// export default function Home() {
//   return (
//     <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
//       {/* 🌆 Background Image */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src="https://media.istockphoto.com/id/2176574609/photo/stock-market-financial-analysis-technology-graph-concept-background-image.webp?a=1&b=1&s=612x612&w=0&k=20&c=XspQlGzjrwDOYw-4OJ8X41hdB3rt57TXswSY82bluXg="
//           alt="Money Background"
//           className="w-full h-full object-cover opacity-30"
//         />
//         {/* 💚 Green overlay gradient */}
//         <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-black to-green-900 opacity-60" />
//       </div>

//       {/* 💬 Main Content */}
//       <div className="relative z-10 text-white">
//         <h1 className="text-2xl md:text-3xl font-bold mb-6">
//           Hey, I am your personal finance management friend! 💰<br />
//           I will help you manage your money and save it for later.
//         </h1>

//         <motion.a
//           href="/auth/signup"
//           className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition rotating inline-block"
//           animate={{ x: [0, -5, 5, -5, 5, 0] }}
//           transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Join Now
//         </motion.a>
//       </div>

//       {/* 🔄 Rotate animation */}
//       <style jsx global>{`
//         @keyframes rotatePause {
//           0% { transform: rotate(0deg); }
//           50% { transform: rotate(360deg); }
//           100% { transform: rotate(360deg); }
//         }
//         .rotating {
//           animation: rotatePause 4s linear infinite;
//         }
//       `}</style>
//     </main>
//   );
// }

// 'use client';

// import { motion } from 'framer-motion';

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
//       {/* ✨ Background metal gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0a0a0a] opacity-100 z-0" />

//       {/* 🌟 Glowing circle effect */}
//       <motion.div
//         className="absolute w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20"
//         initial={{ scale: 0 }}
//         animate={{ scale: 1.5 }}
//         transition={{ duration: 4, ease: 'easeOut' }}
//       />

//       {/* ✨ Main Content */}
//       <div className="z-10 max-w-3xl text-center">
//         <motion.h1
//           className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           Welcome to <span className="text-green-400">FINMATE</span>
//         </motion.h1>

//         <motion.p
//           className="text-lg text-gray-400 mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 1 }}
//         >
//           Your intelligent finance buddy. Budget smarter, track easier, and save faster.
//         </motion.p>

//         <motion.ul
//           className="text-left text-gray-500 text-sm sm:text-base space-y-2 mb-10 mx-auto max-w-md"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6, duration: 1 }}
//         >
//           <li>🚀 Track daily spending with beautiful charts</li>
//           <li>📅 Set reminders for bills & goals</li>
//           <li>📊 Visualize your budget in real-time</li>
//           <li>🔐 Secure login and personal dashboard</li>
//         </motion.ul>

//         <motion.a
//           href="/auth/signup"
//           className="inline-block bg-green-500 text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-600 transition-transform"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Join FINMATE Now
//         </motion.a>
//       </div>
//     </main>
//   );
// }

// 'use client';

// import { motion } from 'framer-motion';

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
//       {/* 🌑 Background gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0a0a0a] opacity-100 z-0" />

//       {/* 💫 Glowing effect */}
//       <motion.div
//         className="absolute w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20"
//         initial={{ scale: 0 }}
//         animate={{ scale: 1.5 }}
//         transition={{ duration: 4, ease: 'easeOut' }}
//       />

//       {/* 🧠 Content */}
//       <div className="z-10 max-w-3xl text-center">
//         <motion.h1
//           className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           Welcome to <span className="text-green-400">FINMATE</span>
//         </motion.h1>

//         <motion.p
//           className="text-lg text-gray-400 mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 1 }}
//         >
//           Your intelligent finance buddy. Budget smarter, track easier, and save faster.
//         </motion.p>

//         {/* 💲 Replaced list with dollar symbol */}
//         <motion.ul
//           className="text-left text-gray-400 text-sm sm:text-base space-y-3 mb-10 mx-auto max-w-md"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6, duration: 1 }}
//         >
//           {[
//             'Track daily spending with beautiful charts',
//             'Set reminders for bills & goals',
//             'Visualize your budget in real-time',
//             'Secure login and personal dashboard',
//           ].map((text, i) => (
//             <li key={i}>
//               <span className="text-silver mr-2 font-bold">$</span>
//               {text}
//             </li>
//           ))}
//         </motion.ul>

//         {/* CTA Button */}
//         <motion.a
//           href="/auth/signup"
//           className="inline-block bg-green-500 text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-600 transition-transform"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Join FINMATE Now
//         </motion.a>
//       </div>

//       {/* Custom silver text color */}
//       <style jsx>{`
//         .text-silver {
//           color: #c0c0c0;
//         }
//       `}</style>
//     </main>
//   );
// }

'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* 🪙 Top-left Icon */}
      <img
        src="/logo.png"
        alt="App Icon"
        className="absolute top-4 left-4 w-10 h-10 z-20 rounded-full"
      />

      {/* 🌑 Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0a0a0a] opacity-100 z-0" />

      {/* 💫 Glowing effect */}
      <motion.div
        className="absolute w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1.5 }}
        transition={{ duration: 4, ease: 'easeOut' }}
      />

      {/* 🧠 Content */}
      <div className="z-10 max-w-3xl text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-green-400">FINMATE</span>
        </motion.h1>

        <motion.p
          className="text-lg text-gray-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Your intelligent finance buddy. Budget smarter, track easier, and save faster.
        </motion.p>

        {/* 💲 Replaced list with dollar symbol */}
        <motion.ul
          className="text-left text-gray-400 text-sm sm:text-base space-y-3 mb-10 mx-auto max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {[
            'Track daily spending with beautiful charts',
            'Set reminders for bills & goals',
            'Visualize your budget in real-time',
            'Secure login and personal dashboard',
          ].map((text, i) => (
            <li key={i}>
              <span className="text-silver m-10 font-bold">$</span>
              {text}
            </li>
          ))}
        </motion.ul>

        {/* CTA Button */}
        <motion.a
          href="/auth/signup"
          className="inline-block bg-green-500 text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-600 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Join FINMATE Now
        </motion.a>
      </div>

      {/* Custom silver text color */}
      <style jsx>{`
        .text-silver {
          color: #c0c0c0;
        }
      `}</style>
    </main>
  );
}
