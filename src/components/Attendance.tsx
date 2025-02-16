import React, { useState, useEffect } from "react";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";

// Define the interface for attendance report data
interface AttendanceReport {
  id: number;
  name: string;
  class: string;
  status: "Present" | "Absent";
  date?: string;
}

function Attendance({ darkMode }: { darkMode: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<AttendanceReport[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5; // Adjust this to change the number of students displayed per page

  // Fetch data from the backend API with filters
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (selectedClass) queryParams.append("class", selectedClass);
        if (selectedDate) queryParams.append("date", selectedDate);

        const response = await fetch(
          `http://localhost:3000/attendance-reports?${queryParams.toString()}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        const data: AttendanceReport[] = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, [selectedClass, selectedDate]);

  // Filter students based on search input
  const filteredStudents = students.filter((student) =>
    [student.name, student.class, student.status]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Change page
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen px-2 sm:px-4 lg:px-6 py-6 transition-colors duration-300`}
    >
      <h2
        className={`text-2xl font-bold mb-6 text-center sm:text-left ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Daily Attendance
      </h2>
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-md p-6 transition-colors duration-300`}
      >
        {/* Search Bar, Date Picker, Class Selection */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Name, Class, or Status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full flex-1 sm:max-w-xs border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              darkMode
                ? "focus:ring-purple-500 bg-gray-700 text-gray-300"
                : "focus:ring-purple-500 bg-white text-gray-700"
            }`}
          />
          {/* Date Picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`border flex-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              darkMode
                ? "focus:ring-purple-500 bg-gray-700 text-gray-300"
                : "focus:ring-purple-500 bg-white text-gray-700"
            }`}
          />
          {/* Class Selection */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className={`border flex-1 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
              darkMode
                ? "focus:ring-purple-500 bg-gray-700 text-gray-300"
                : "focus:ring-purple-500 bg-white text-gray-700"
            }`}
          >
            <option value="">All Classes</option>
            {[...new Set(students.map((s) => s.class))].map((cls, i) => (
              <option key={i} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table
            className={`min-w-full divide-y ${
              darkMode ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            <thead
              className={`${
                darkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-gray-50 text-gray-500"
              }`}
            >
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`${darkMode ? "divide-gray-700" : "divide-gray-200"}`}
            >
              {currentStudents.length > 0 ? (
                currentStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`${
                      darkMode ? "text-gray-100" : "text-gray-700"
                    } ${
                      index % 2 === 1
                        ? darkMode
                          ? "bg-gray-900"
                          : "bg-gray-100"
                        : ""
                    } hover:${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    } transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.class}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                          student.status === "Present"
                            ? darkMode
                              ? "bg-green-900 text-green-400"
                              : "bg-green-100 text-green-800"
                            : darkMode
                            ? "bg-red-900 text-red-400"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === i + 1
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
