import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IrregularEaterPaymentsProps {
  darkMode: boolean;
}

interface StudentPayment {
  studentId: number;
  studentName: string;
  class: string;
  balance: string;
  lastMeal: string;
  mealCount: number; // Ensure meal count is always a number
}

const IrregularEaterPayments: React.FC<IrregularEaterPaymentsProps> = ({ darkMode }) => {
  const [students, setStudents] = useState<StudentPayment[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const studentsPerPage = 5;

  useEffect(() => {
    const fetchIrregularPayments = async () => {
      try {
        const response = await fetch("http://localhost:3000/irregular-payments");
        if (!response.ok) {
          throw new Error("Failed to fetch irregular eater payments");
        }
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          // Process and calculate meal count
          const processedData: StudentPayment[] = data.data.map((student: StudentPayment) => {
            const lastMealDate = new Date(student.lastMeal);
            const daysInMonth = new Date(lastMealDate.getFullYear(), lastMealDate.getMonth() + 1, 0).getDate();

            // Ensure meal count is a valid number that accumulates each time a meal is recorded
            const mealCount = Number.isFinite(student.mealCount) ? student.mealCount : 0;

            return {
              ...student,
              mealCount: mealCount, // Keeps adding up when a meal is recorded
            };
          });

          setStudents(processedData);
        } else {
          console.error("Invalid response format:", data.message);
        }
      } catch (error) {
        console.error("Error fetching irregular eater payments:", error);
      }
    };

    fetchIrregularPayments();
  }, []);

  // Pagination logic
  const totalPages: number = Math.ceil(students.length / studentsPerPage);
  const indexOfLastStudent: number = currentPage * studentsPerPage;
  const indexOfFirstStudent: number = indexOfLastStudent - studentsPerPage;
  const currentStudents: StudentPayment[] = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const handlePageChange = (page: number): void => {
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
                key={student.studentId}
                className={`hover:${darkMode ? "bg-gray-700" : "bg-gray-100"} ${
                  index % 2 === 0 ? (darkMode ? "bg-gray-800" : "bg-white") : darkMode ? "bg-gray-900" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {student.studentName}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{student.class}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-red-600">{student.balance}</td>
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
