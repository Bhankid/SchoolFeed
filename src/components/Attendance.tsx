import React, { useState } from "react";
import { Check, X } from "lucide-react";

function Attendance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([
    { id: 1, name: "Kofi Owusu", class: "Class 1", status: "Present" },
    { id: 2, name: "Akua Mensah", class: "Class 2", status: "Absent" },
    { id: 3, name: "Yaa Asantewaa", class: "Class 1", status: "Present" },
    { id: 4, name: "Kwame Boateng", class: "Class 3", status: "Absent" },
  ]);

  // Function to filter students based on the search term
  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Daily Attendance
      </h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Search Bar, Date Picker, Class Selection, and Mark All Present Controls */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          {/* Search Bar */}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search by Name, Class, or Status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Date Picker */}
          <div className="relative w-full sm:w-auto">
            <label htmlFor="date" className="sr-only">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              className="border rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Class Selection */}
          <select className="border rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">All Classes</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
          </select>
          {/* Mark All Present Button */}
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap w-full sm:w-auto">
            Mark All Present
          </button>
        </div>
        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Student
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Class
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {student.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.class}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === "Present"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full hover:bg-green-100">
                        <Check className="w-5 h-5 text-green-600" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-red-100">
                        <X className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
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

export default Attendance;
