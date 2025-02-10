import React from "react";
import { Smartphone, DollarSign } from "lucide-react";

interface PaymentsTableProps {
  darkMode: boolean;
}

const PaymentTable: React.FC<PaymentsTableProps> = ({ darkMode }) => {
  return (
    <div className="col-span-1">
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-md p-4`}
      >
        {/* Title */}
        <h3
          className={`text-lg font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-700"
          }`}
        >
          Recent Payments
        </h3>

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
            <tbody className={darkMode ? "divide-gray-700" : "divide-gray-200"}>
              {/* Row 1 */}
              <tr className={`${darkMode ? "text-gray-100" : "text-gray-700"}`}>
                <td className="px-6 py-4 whitespace-nowrap">Kofi Owusu</td>
                <td className="px-6 py-4 whitespace-nowrap">₵50.00</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  ₵100.00
                  <span className="ml-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2025-02-20</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      darkMode
                        ? "bg-yellow-600 text-yellow-100"
                        : "bg-yellow-300 text-yellow-800"
                    }`}
                  >
                    Irregular
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

              {/* Row 2 */}
              <tr className={`${darkMode ? "text-gray-100" : "text-gray-700"}`}>
                <td className="px-6 py-4 whitespace-nowrap">Ama Owusu</td>
                <td className="px-6 py-4 whitespace-nowrap">₵20.00</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  ₵80.00
                  <span className="ml-2">
                    <Smartphone className="w-4 h-4 text-red-500" />
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2025-02-21</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      darkMode
                        ? "bg-yellow-600 text-yellow-100"
                        : "bg-yellow-300 text-yellow-800"
                    }`}
                  >
                    Regular
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
