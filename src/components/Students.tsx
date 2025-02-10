import React, { useState } from "react";
import { Plus, Search, Bell } from "lucide-react";

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
      lastMeal: "2024-02-19",
    },
    {
      id: 2,
      name: "Akua Mensah",
      class: "Class 2",
      paymentType: "Credit",
      balance: "-₵30.00",
      lastMeal: "2024-02-20",
    },
    {
      id: 3,
      name: "Yaa Asantewaa",
      class: "Class 1",
      paymentType: "Regular",
      balance: "₵0.00",
      lastMeal: "2024-02-21",
    },
    {
      id: 4,
      name: "Kwame Boateng",
      class: "Class 3",
      paymentType: "Irregular",
      balance: "₵20.00",
      lastMeal: "2024-02-18",
    },
  ]);

  // State for the form fields in the modal
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    paymentType: "",
    balance: "",
    lastMeal: "",
  });

  // Filter students based on the active tab and search term
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.paymentType.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;

    return matchesSearch && student.paymentType.toLowerCase() === activeTab;
  });

  // Handle input changes in the modal form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new student to the list
  const addStudent = () => {
    const newId = students.length + 1; 
    const newEntry = { ...newStudent, id: newId };
    setStudents((prev) => [...prev, newEntry]);
    setNewStudent({
      name: "",
      class: "",
      paymentType: "",
      balance: "",
      lastMeal: "",
    }); 
    setShowAddModal(false); 
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen px-2 sm:px-4 lg:px-6 py-6 transition-colors duration-300`}
    >
      {/* Modal for Adding a Student */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-4 rounded-lg shadow-lg w-full sm:w-96`}
          >
            <h3 className="text-xl font-bold mb-4">Add New Student</h3>
            <form className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newStudent.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 border-gray-600 placeholder-gray-400"
                      : "bg-white text-gray-700 border-gray-300 placeholder-gray-500"
                  }`}
                  required
                />
              </div>

              {/* Class Field */}
              <div>
                <label
                  htmlFor="class"
                  className="block text-sm font-medium text-gray-700"
                >
                  Class
                </label>
                <select
                  id="class"
                  name="class"
                  value={newStudent.class}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                    darkMode
                      ? "focus:ring-indigo-500 bg-gray-700 text-gray-300"
                      : "focus:ring-indigo-500 bg-white text-gray-700"
                  }`}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                </select>
              </div>

              {/* Payment Type Field */}
              <div>
                <label
                  htmlFor="paymentType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Payment Type
                </label>
                <select
                  id="paymentType"
                  name="paymentType"
                  value={newStudent.paymentType}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                    darkMode
                      ? "focus:ring-indigo-500 bg-gray-700 text-gray-300"
                      : "focus:ring-indigo-500 bg-white text-gray-700"
                  }`}
                  required
                >
                  <option value="">Select Payment Type</option>
                  <option value="Regular">Regular Eater</option>
                  <option value="Irregular">Irregular Eater</option>
                  <option value="Credit">Credit Eater</option>
                </select>
              </div>

              {/* Balance Field */}
              <div>
                <label
                  htmlFor="balance"
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Balance
                </label>
                <input
                  type="text"
                  id="balance"
                  name="balance"
                  value={newStudent.balance}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 border-gray-600 placeholder-gray-400"
                      : "bg-white text-gray-700 border-gray-300 placeholder-gray-500"
                  }`}
                  placeholder="₵0.00"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  Cancel
                </button>

                {/* Add Student Button */}
                <button
                  type="button"
                  onClick={addStudent}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    darkMode
                      ? "bg-indigo-500 text-white hover:bg-indigo-400"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Students
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
            darkMode
              ? "bg-indigo-500 text-white hover:bg-indigo-400"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Student
        </button>
      </div>
      <div className="mb-6">
        <div
          className={`border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {[
              { id: "all", name: "All Students" },
              { id: "regular", name: "Regular" },
              { id: "irregular", name: "Irregular Eaters" },
              { id: "credit", name: "Credit Students" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? darkMode
                      ? "border-indigo-500 text-indigo-400"
                      : "border-indigo-500 text-indigo-600"
                    : darkMode
                    ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div
        className={`${
          darkMode ? "bg-gray-800 shadow-md" : "bg-white shadow-md"
        } rounded-lg p-4 transition-colors duration-300`}
      >
        {/* Search and Class Selection */}
        <div className="flex items-center space-x-4 mb-6">
          {/* Search Input */}
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

          {/* Class Selection Dropdown */}
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
        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table
            className={`w-full ${
              darkMode ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            <thead className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Name
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Class
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Payment Type
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Balance
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Last Meal
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
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
                    <div
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {student.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {student.class}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.paymentType === "Regular"
                          ? darkMode
                            ? "bg-green-900 text-green-300"
                            : "bg-green-100 text-green-800"
                          : student.paymentType === "Irregular"
                          ? darkMode
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-yellow-100 text-yellow-800"
                          : darkMode
                          ? "bg-red-900 text-red-300"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.paymentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm ${
                        parseFloat(student.balance) < 0
                          ? "text-red-500"
                          : darkMode
                          ? "text-gray-100"
                          : "text-gray-900"
                      }`}
                    >
                      {student.balance}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {student.lastMeal}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className={`${
                        darkMode
                          ? "text-indigo-400 hover:text-indigo-300"
                          : "text-indigo-600 hover:text-indigo-900"
                      } mr-3`}
                    >
                      Record Meal
                    </button>
                    {student.paymentType === "Credit" && (
                      <button
                        className={`${
                          darkMode
                            ? "text-green-400 hover:text-green-300"
                            : "text-green-600 hover:text-green-900"
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
