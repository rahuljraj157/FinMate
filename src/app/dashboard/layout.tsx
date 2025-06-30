
// "use client"
// import { Geist, Geist_Mono } from 'next/font/google';
// import Sidebar from '@/components/Sidebar';
// import { SessionProvider } from 'next-auth/react';
// import { Provider } from 'react-redux';
// import { store } from '@/redux/store';

// const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
// const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div
//       className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen w-full bg-[#0e0e0e] text-white`}
//     >
        
             
      
          

       

//          <SessionProvider>
//                   <Provider store={store}>
//                       <Sidebar />
//                    <main className="flex-1">{children}</main>
//                   </Provider>
//                 </SessionProvider>
   
//     </div>
//   );
// }
"use client";

import { Geist, Geist_Mono } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useState } from 'react';
import { Menu } from 'lucide-react'; // nice lightweight icon

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen bg-[#0e0e0e] text-white`}>
      <SessionProvider>
        <Provider store={store}>
          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-screen z-50 transition-transform duration-300 bg-[#1a1a1a] md:static md:translate-x-0 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <Sidebar />
          </div>

          {/* Overlay backdrop on mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main content area */}
          <div className="flex flex-col flex-1">
            {/* Mobile menu button */}
            <div className="md:hidden p-4">
              <Menu size={28} onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>

            <main className="flex-1">
              {children}
            </main>
          </div>
        </Provider>
      </SessionProvider>
    </div>
  );
}
