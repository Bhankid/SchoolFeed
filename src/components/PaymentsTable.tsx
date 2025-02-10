import React from "react";
import { Smartphone, DollarSign } from "lucide-react";

interface PaymentsTableProps {
  darkMode: boolean;
}

const PaymentTable: React.FC<PaymentsTableProps> = ({ darkMode }) => {
  // Sample payment data
  const payments = [
    {
      id: 1,
      name: "Kofi Owusu",
      amount: "₵50.00",
      balance: "₵100.00",
      date: "2025-02-20",
      type: "Irregular",
      status: "Completed",
      method: "cash",
    },
    {
      id: 2,
      name: "Ama Owusu",
      amount: "₵20.00",
      balance: "₵80.00",
      date: "2025-02-21",
      type: "Regular",
      status: "Completed",
      method: "momo",
    },
  ];

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
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
           Total Eating: {payments.length} 
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
              {payments.map((payment, index) => (
                <tr
                  key={payment.id}
                  className={`${darkMode ? "text-gray-100" : "text-gray-700"} ${
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
                    {payment.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    {payment.balance}
                    <span className="ml-2">
                      {payment.method === "momo" ? (
                        <Smartphone className="w-4 h-4 text-red-500" />
                      ) : (
                        <DollarSign className="w-4 h-4 text-green-500" />
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        darkMode
                          ? "bg-yellow-600 text-yellow-100"
                          : "bg-yellow-300 text-yellow-800"
                      }`}
                    >
                      {payment.type}
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
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
