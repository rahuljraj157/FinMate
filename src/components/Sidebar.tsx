// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useState } from "react";
// import {
//   FiBarChart2,
//   FiList,
//   FiTarget,
//   FiBell,
//   FiPieChart,
// } from "react-icons/fi";

// const Sidebar = () => {
//   const [active, setActive] = useState("Dashboard");
//   const pathname=usePathname();
//   console.log(pathname)
//   return (
//     <aside className="w-64 bg-[#1a1a1a] p-6 space-y-6">
//       <h1 className="text-2xl font-bold mb-4">💸 FinMate</h1>
//       <nav className="space-y-4">
//         <Link href=" /dashboard">
//           <SidebarItem
//             label="Dashboard"
//             icon={<FiBarChart2 />}
//             active={active}
//             setActive={setActive}
//           />
//         </Link>

//         <Link href="/dashboard/transactions">
//           <SidebarItem
//             label="Transactions"
//             icon={<FiList />}
//             active={active}
//             setActive={setActive}
//           />
//         </Link>
//         <Link href={"/dashboard/budgets"}>
//           <SidebarItem
//             label="Budgets"
//             icon={<FiPieChart />}
//             active={active}
//             setActive={setActive}
//           />
//         </Link>
//         <Link href={"/dashboard/goals"}>
//           <SidebarItem
//             label="Goals"
//             icon={<FiTarget />}
//             active={active}
//             setActive={setActive}
//           />
//         </Link>
//         <Link href={"/dashboard/reminders"}>
//           <SidebarItem
//             label="Reminders"
//             icon={<FiBell />}
//             active={active}
//             setActive={setActive}
//           />
//         </Link>
//         <Link href={"/dashboard/analytics"}>
//           <SidebarItem
//             label="Analytics"
//             icon={<FiBarChart2 />}
//             active={active}
//             setActive={setActive}
//           />
//         </Link>
//       </nav>
//     </aside>
//   );
// };
// function SidebarItem({ label, icon, active, setActive }: any) {
//   const isActive = label === active;
//   return (
//     <div
//       onClick={() => setActive(label)}
//       className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all ${
//         isActive ? "bg-green-600" : "hover:bg-[#2a2a2a]"
//       }`}
//     >
//       <span>{icon}</span>
//       <span>{label}</span>
//     </div>
//   );
// }

// export default Sidebar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FiBarChart2,
  FiList,
  FiTarget,
  FiBell,
  FiPieChart,
} from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1a1a1a] p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">💸 FinMate</h1>
      <nav className="space-y-4">
        <SidebarLink href="/dashboard" label="Dashboard" icon={<FiBarChart2 />} currentPath={pathname} />
        <SidebarLink href="/dashboard/transactions" label="Transactions" icon={<FiList />} currentPath={pathname} />
        <SidebarLink href="/dashboard/budget" label="Budgets" icon={<FiPieChart />} currentPath={pathname} />
        <SidebarLink href="/dashboard/reminders" label="Reminders" icon={<FiBell />} currentPath={pathname} />
        <SidebarLink href="/dashboard/analytics" label="Analytics" icon={<FiBarChart2 />} currentPath={pathname} />
      </nav>
    </aside>
  );
};

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  currentPath: string;
}

function SidebarLink({ href, label, icon, currentPath }: SidebarLinkProps) {
  const isActive = currentPath === href;

  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all ${
          isActive ? "bg-green-600" : "hover:bg-[#2a2a2a]"
        }`}
      >
        <span>{icon}</span>
        <span>{label}</span>
      </div>
    </Link>
  );
}

export default Sidebar;
