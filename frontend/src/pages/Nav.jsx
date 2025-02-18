import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 flex flex-wrap items-center justify-between p-4 bg-gray-800 text-white w-full">
      <div className="text-2xl font-bold">Employee CRM</div>
      <div className="flex flex-wrap gap-4">
        <a href="/dashboard" className="px-4 py-2 hover:bg-gray-700 rounded transition">Dashboard</a>
        <a href="/employees" className="px-4 py-2 hover:bg-gray-700 rounded transition">Employees</a>
        <a href="/projects" className="px-4 py-2 hover:bg-gray-700 rounded transition">Projects</a>
        <a href="/reports" className="px-4 py-2 hover:bg-gray-700 rounded transition">Reports</a>
        <a href="/settings" className="px-4 py-2 hover:bg-gray-700 rounded transition">Settings</a>
      </div>
    </nav>
  );
};

export default Navbar;
