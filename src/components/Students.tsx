import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import AddStudent from "./AddStudent";

function Students({ darkMode }: { darkMode: boolean }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Kofi Owusu",
      class: "Class 1",
      paymentType: "Irregular",
      balance: "₵50.00",
      lastMeal: "2025-02-19",
    },
    {
      id: 2,
      name: "Akua Mensah",
      class: "Class 2",
      paymentType: "Credit",
      balance: "-₵30.00",
      lastMeal: "2025-02-20",
    },
    {
      id: 3,
      name: "Yaa Asantewaa",
      class: "Class 1",
      paymentType: "Regular",
      balance: "₵0.00",
      lastMeal: "2025-02-21",
    },
    {
      id: 4,
      name: "Kwame Boateng",
      class: "Class 3",
      paymentType: "Irregular",
      balance: "₵20.00",
      lastMeal: "2025-02-18",
    },
    {
      id: 5,
      name: "Ama Serwaa",
      class: "Class 2",
      paymentType: "Advance",
      balance: "₵100.00",
      lastMeal: "2025-02-22",
    },
  ]);

  // Filter students based on the active tab and search term
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.paymentType.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && student.paymentType.toLowerCase() === activeTab;
  });

  // Handle adding a new student to the list
  const handleAddStudent = (student: any) => {
    setStudents([...students, student]);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen p-6`}
    >
      {/* Add Student Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Students</h2>
        <button
          onClick={() => setShowAddModal(true)} // Open the modal
          className={`${
            darkMode
              ? "bg-indigo-500 text-white hover:bg-indigo-400"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          } px-4 py-2 rounded-lg flex items-center transition-colors`}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Student
        </button>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
              showAddModal ? "modal-backdrop" : "modal-backdrop exit"
            }`}
            onClick={() => setShowAddModal(false)} // Close modal when clicking outside
          ></div>

          {/* Modal Container */}
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 ${
              showAddModal ? "modal-container" : "modal-container exit"
            }`}
          >
            <AddStudent
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onAddStudent={handleAddStudent}
              darkMode={darkMode}
            />
          </div>
        </>
      )}

      {/* Student Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {[
            { id: "all", name: "All Students" },
            { id: "regular", name: "Regular" },
            { id: "irregular", name: "Irregular Eaters" },
            { id: "credit", name: "Credit Students" },
            { id: "advance", name: "Advance Payment" }, // Added Advance Tab
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? darkMode
                    ? "border-indigo-500 text-indigo-400"
                    : "border-indigo-500 text-indigo-600"
                  : darkMode
                  ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative w-1/2">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? "focus:ring-indigo-500 bg-gray-700 text-gray-300 border-gray-600"
                : "focus:ring-indigo-500 bg-white text-gray-700 border-gray-300"
            }`}
          />
          <Search
            className={`w-5 h-5 absolute left-3 top-2.5 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
        </div>
        <div className="flex-1 w-1/2">
          <select
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              darkMode
                ? "focus:ring-indigo-500 bg-gray-700 text-gray-300 border-gray-600"
                : "focus:ring-indigo-500 bg-white text-gray-700 border-gray-300"
            }`}
          >
            <option value="">All Classes</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
          </select>
        </div>
      </div>

      {/* Student Table */}
      <div
        className={`${
          darkMode ? "bg-gray-800 shadow-md" : "bg-white shadow-md"
        } rounded-lg p-4 transition-colors duration-300`}
      >
        <div className="overflow-x-auto">
          <table
            className={`w-full ${
              darkMode ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            <thead className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Payment Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Last Meal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`${
                darkMode
                  ? "bg-gray-900 divide-gray-700"
                  : "bg-white divide-gray-200"
              }`}
            >
              {filteredStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className={`${
                    darkMode
                      ? `hover:bg-gray-800 ${
                          index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                        }`
                      : `hover:bg-gray-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        student.paymentType === "Regular"
                          ? "bg-green-500 text-white"
                          : student.paymentType === "Irregular"
                          ? "bg-yellow-500 text-black"
                          : student.paymentType === "Credit"
                          ? "bg-red-500 text-white"
                          : "bg-blue-500 text-white" 
                      }`}
                    >
                      {student.paymentType}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap ${
                      student.balance.startsWith("-") ? "text-red-400" : ""
                    }`}
                  >
                    {student.balance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.lastMeal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        darkMode
                          ? "bg-indigo-500 text-white hover:bg-indigo-400"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      Record Meal
                    </button>
                    {student.paymentType === "Credit" && (
                      <button
                        className={`ml-2 px-3 py-1 rounded-md text-sm font-medium ${
                          darkMode
                            ? "bg-red-500 text-white hover:bg-red-400"
                            : "bg-red-600 text-white hover:bg-red-700"
                        }`}
                      >
                        Pay Debt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;
