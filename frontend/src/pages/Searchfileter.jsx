import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("Any");
  const [filterWorkType, setFilterWorkType] = useState("Any");
  const [filterStatus, setFilterStatus] = useState("Any");
  const [sort, setSort] = useState("Default");
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:2020/emp");
      console.log("Fetched Employees:", response.data);
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    let filtered = employees.filter((emp) =>
      `${emp.firstName || ""} ${emp.lastName || ""}`.toLowerCase().includes(search.toLowerCase())
    );

    if (filterRole !== "Any") {
      filtered = filtered.filter((emp) => emp.role === filterRole);
    }
    if (filterWorkType !== "Any") {
      filtered = filtered.filter((emp) => emp.workType === filterWorkType);
    }
    if (filterStatus !== "Any") {
      filtered = filtered.filter((emp) => emp.maritalStatus === filterStatus);
    }

    if (sort === "Ascending") {
      filtered.sort((a, b) => (a.firstName || "").localeCompare(b.firstName || ""));
    } else if (sort === "Descending") {
      filtered.sort((a, b) => (b.firstName || "").localeCompare(a.firstName || ""));
    }

    setFilteredEmployees(filtered);
  }, [search, filterRole, filterWorkType, filterStatus, sort, employees]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex border-b">
        <button
          className={`py-2 px-4 ${activeTab === "tab1" ? "border-b-2 border-indigo-600 font-bold" : "text-gray-600"}`}
          onClick={() => setActiveTab("tab1")}
        >
          Tab 1
        </button>
        <button
          className={`py-2 px-4 ${activeTab === "tab2" ? "border-b-2 border-indigo-600 font-bold" : "text-gray-600"}`}
          onClick={() => setActiveTab("tab2")}
        >
          Tab 2
        </button>
      </div>

      {/* Filters & Sorting */}
      <div className="flex flex-wrap items-center gap-4 mt-4">
        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md w-64 bg-white text-black"
          />
        </div>

        {/* Filters */}
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border px-4 py-2 rounded-md bg-white text-black"
        >
          <option value="Any">Filter by Role</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
        </select>
        <select
          value={filterWorkType}
          onChange={(e) => setFilterWorkType(e.target.value)}
          className="border px-4 py-2 rounded-md bg-white text-black"
        >
          <option value="Any">Filter by Work Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-4 py-2 rounded-md bg-white text-black"
        >
          <option value="Any">Filter by Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>

        {/* Sorting */}
        <div className="ml-auto">
          <label className="mr-2 font-semibold">Sort by</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-4 py-2 rounded-md bg-white text-black"
          >
            <option value="Default">Default option</option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6">
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
              <th className="border border-gray-300 px-4 py-2">Birthday</th>
              <th className="border border-gray-300 px-4 py-2">Marital Status</th>
              <th className="border border-gray-300 px-4 py-2">Experience</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Work Type</th>
              <th className="border border-gray-300 px-4 py-2">Emergency No</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp._id} className="text-center bg-gray-800 text-white">
                  <td className="border border-gray-300 px-4 py-2">{emp.firstName || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.lastName || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.email || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.age || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {emp.birthday ? new Date(emp.birthday).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{emp.maritalStatus || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.experience || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.role || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.workType || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{emp.emergencyNo || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
