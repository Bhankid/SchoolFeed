import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IrregularEaterPaymentsProps {
  darkMode: boolean;
}

const IrregularEaterPayments: React.FC<IrregularEaterPaymentsProps> = ({ darkMode }) => {
  const students = [
    { id: 1, name: "Kofi Owusu", class: "Class 1", balance: "₵50.00", lastMeal: "2025-02-19", mealCount: "8 meals" },
    { id: 2, name: "Ama Mensah", class: "Class 2", balance: "₵30.00", lastMeal: "2025-02-20", mealCount: "6 meals" },
    { id: 3, name: "Yaw Boafo", class: "Class 3", balance: "₵40.00", lastMeal: "2025-02-18", mealCount: "7 meals" },
    { id: 4, name: "Esi Appiah", class: "Class 4", balance: "₵45.00", lastMeal: "2025-02-12", mealCount: "5 meals" },
    { id: 5, name: "Kojo Antwi", class: "Class 5", balance: "₵70.00", lastMeal: "2025-02-14", mealCount: "9 meals" },
    { id: 6, name: "Yaw Boateng", class: "Class 6", balance: "₵25.00", lastMeal: "2025-02-16", mealCount: "4 meals" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5; 

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={`lg:col-span-3 rounded-lg shadow-md p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Irregular Eater Payments
      </h3>

      <div className="overflow-x-auto">
        <table className={`w-full divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
          <thead>
            <tr className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-800"}`}>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">Balance</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">Last Meal</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">Meal Count (Month)</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className={`${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
            {currentStudents.map((student, index) => (
              <tr
                key={student.id}
                className={`hover:${darkMode ? "bg-gray-700" : "bg-gray-100"} ${
                  index % 2 === 0 ? (darkMode ? "bg-gray-800" : "bg-white") : darkMode ? "bg-gray-900" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {student.name}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{student.class}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-red-600">{student.balance}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className={`text-sm ${darkMode ? "text-gray-100" : "text-gray-600"}`}>{student.lastMeal}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <div className={`text-sm ${darkMode ? "text-gray-100" : "text-gray-600"}`}>{student.mealCount}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <button className="text-purple-600 hover:text-purple-700 mr-3">Record Meal</button>
                  <button className="text-green-600 hover:text-green-700">Add Credit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
            currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                currentPage === i + 1 ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
            currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default IrregularEaterPayments;
