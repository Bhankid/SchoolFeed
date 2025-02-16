import React from "react";
import { Link } from "react-router-dom";

// Define TypeScript type for transactions
interface Transaction {
  month: string;
  amount: number;
}

// List of transactions
const transactions: Transaction[] = [
  { month: "March", amount: 50 },
  { month: "February", amount: 45 },
  { month: "January", amount: 60 },
  { month: "December", amount: 55 },
  { month: "November", amount: 40 },
];

const MealPayments: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-2xl shadow-2xl">
      {/* Header Section */}
      <h2 className="text-4xl font-bold mb-6 border-b pb-4 border-gray-300 dark:border-gray-700">
        Meal Payments
      </h2>

      {/* Description Section */}
      <p className="mb-8 text-lg leading-relaxed">
        Track meal payments, view history, and manage student meals seamlessly.
      </p>

      {/* Recent Transactions Section */}
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Recent Transactions
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {transactions.map((transaction, index) => (
            <li
              key={index}
              className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <span>🍽️ Paid for {transaction.month}</span>
              <span className="font-medium">₵{transaction.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Call-to-Action Button */}
      <div className="mt-8 flex justify-end">
        <Link
          to="/home"
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          View Dashboard
        </Link>
      </div>
    </div>
  );
};

export default MealPayments;
