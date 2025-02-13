import React, { useEffect, useState } from "react";
import {
  Smartphone,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PaymentsTableProps {
  darkMode: boolean;
}

const PaymentTable: React.FC<PaymentsTableProps> = ({ darkMode }) => {
  const [payments, setPayments] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch payments from backend
  const fetchPayments = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/payments?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (!Array.isArray(data.payments)) {
        throw new Error(
          "Invalid response format: 'payments' must be an array."
        );
      }

      setPayments(data.payments);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching payments:", error.message);
        } else {
            console.error("Error fetching payments:", error);
        }
        setPayments([]);
        setTotalPages(1);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage]);

  // Handle pagination click
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="col-span-1">
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-md p-4`}
      >
        {/* Title */}
        <div className="flex justify-between items-center mb-4">
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Recent Payments
          </h3>
          <span
            className={`text-sm font-medium ${
              darkMode ? "text-blue-400" : "text-blue-500"
            }`}
          >
            Total Entries: {payments.length}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table
            className={`w-full divide-y ${
              darkMode ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            {/* Table Head */}
            <thead
              className={`${
                darkMode
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-50 text-gray-500"
              }`}
            >
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Status
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody
              className={`${darkMode ? "divide-gray-700" : "divide-gray-200"}`}
            >
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : payments.length > 0 ? (
                payments.map((payment: any, index: number) => (
                  <tr
                    key={payment.id}
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
                      {payment.Student?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₵{payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      ₵{(payment.balance || 0).toFixed(2)}
                      <span className="ml-2">
                        {payment.paymentMode === "momo" ? (
                          <Smartphone className="w-4 h-4 text-red-500" />
                        ) : (
                          <DollarSign className="w-4 h-4 text-green-500" />
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          darkMode
                            ? "bg-yellow-600 text-yellow-100"
                            : "bg-yellow-300 text-yellow-800"
                        }`}
                      >
                        {payment.paymentType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          darkMode
                            ? "bg-green-600 text-green-100"
                            : "bg-green-400 text-green-800"
                        }`}
                      >
                        Completed
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No payments found.
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
};

export default PaymentTable;
