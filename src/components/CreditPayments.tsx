import React, { useState } from "react";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface CreditPaymentsProps {
  darkMode: boolean;
}

const CreditPayments: React.FC<CreditPaymentsProps> = ({ darkMode }) => {
  const students = [
    { id: 1, name: "Akua Mensah", class: "Class 2", amount: "₵30.00", lastPayment: "2025-02-15" },
    { id: 2, name: "Kofi Agyei", class: "Class 3", amount: "₵50.00", lastPayment: "2025-02-10" },
    { id: 3, name: "Ama Ofori", class: "Class 1", amount: "₵20.00", lastPayment: "2025-02-20" },
    { id: 4, name: "Yaw Boateng", class: "Class 4", amount: "₵45.00", lastPayment: "2025-02-12" },
    { id: 5, name: "Esi Appiah", class: "Class 5", amount: "₵70.00", lastPayment: "2025-02-14" },
    { id: 6, name: "Kojo Antwi", class: "Class 6", amount: "₵25.00", lastPayment: "2025-02-18" },
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Credit Payments</h3>
        <div className="flex items-center text-red-600">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>Total Outstanding: ₵1,250.00</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className={`w-full divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
          <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-50"} text-gray-500`}>
            <tr className={`${darkMode ? "bg-gray-900 text-gray-100" : "text-gray-800"}`}>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Outstanding Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {student.name}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{student.class}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-red-600">{student.amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{student.lastPayment}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className={`text-purple-600 hover:text-purple-700 ${darkMode ? "text-gray-200" : "text-gray-500"}`}>
                    Record Payment
                  </button>
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

export default CreditPayments;
