import React, { useState } from "react";
import { AlertCircle, Plus, X } from "lucide-react";
import RecordPayment from "./RecordPayment";
import PaymentsTable from "./PaymentsTable";

interface PaymentsProps {
  darkMode: boolean;
}

const Payments: React.FC<PaymentsProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("record");
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsClosing(false);
      }, 300); 
    };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen px-4 lg:px-6 py-6 transition-colors duration-300`}
    >
      <h2 className="text-2xl font-bold mb-6">Payments</h2>

      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {[
            { id: "record", name: "Record Payment" },
            { id: "credit", name: "Credit Payments" },
            { id: "irregular", name: "Irregular Payments" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? darkMode
                    ? "border-purple-500 text-purple-400"
                    : "border-purple-500 text-purple-600"
                  : darkMode
                  ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Record Payment Button */}
      {activeTab === "record" && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
              darkMode
                ? "bg-purple-600 text-white hover:bg-purple-500"
                : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>Record Payment</span>
          </button>
        </div>
      )}

      {/* Payment Data Tables */}
      <div className="grid grid-cols-1 gap-6">
        {activeTab === "record" && <PaymentsTable darkMode={darkMode} />}
      </div>

      {/* Modal for Record Payment */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 modal-backdrop ${
            isClosing ? "exit" : ""
          }`}
          onClick={handleClose}
        >
          {/* Modal Container */}
          <div
            className={`relative w-full max-w-md p-6 rounded-lg shadow-lg modal-container ${
              isClosing ? "exit" : ""
            } ${
              darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-300"
            >
              <X className="w-7 h-7" />
            </button>

            <h2 className="text-xl font-semibold text-center mb-4">
              Record Payment
            </h2>

            {/* RecordPayment Component */}
            <RecordPayment darkMode={darkMode} />
          </div>
        </div>
      )}

      {activeTab === "credit" && (
        <div
          className={`lg:col-span-3 rounded-lg shadow-md p-4 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Credit Payments</h3>
            <div className="flex items-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>Total Outstanding: ₵1,250.00</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table
              className={`w-full divide-y ${
                darkMode ? "divide-gray-700" : "divide-gray-200"
              }`}
            >
              <thead
                className={`${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                } text-gray-500`}
              >
                <tr
                  className={`${
                    darkMode ? "bg-gray-900 text-gray-100" : "text-gray-800"
                  }`}
                >
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
              <tbody
                className={`${
                  darkMode ? "divide-gray-700" : "divide-gray-200"
                }`}
              >
                {[
                  {
                    id: 1,
                    name: "Akua Mensah",
                    class: "Class 2",
                    amount: "₵30.00",
                    lastPayment: "2025-02-15",
                  },
                  {
                    id: 2,
                    name: "Kofi Agyei",
                    class: "Class 3",
                    amount: "₵50.00",
                    lastPayment: "2025-02-10",
                  },
                  {
                    id: 3,
                    name: "Ama Ofori",
                    class: "Class 1",
                    amount: "₵20.00",
                    lastPayment: "2025-02-20",
                  },
                ].map((student, index) => (
                  <tr
                    key={student.id}
                    className={`hover:${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } ${
                      index % 2 === 0
                        ? darkMode
                          ? "bg-gray-800"
                          : "bg-white"
                        : darkMode
                        ? "bg-gray-900"
                        : "bg-gray-50"
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
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {student.class}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-red-600">
                        {student.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {student.lastPayment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className={`text-purple-600 hover:text-purple-700 ${
                          darkMode ? "text-gray-200" : "text-gray-500"
                        }`}
                      >
                        Record Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "irregular" && (
        <div
          className={`lg:col-span-3 rounded-lg shadow-md p-4 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 text-gray-900 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Irregular Eater Payments
          </h3>
          <div className="overflow-x-auto">
            <table
              className={`w-full divide-y ${
                darkMode ? "divide-gray-700" : "divide-gray-200"
              }`}
            >
              <thead>
                <tr
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-gray-50"
                  } text-gray-500`}
                >
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Meal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meal Count (Month)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody
                className={`${
                  darkMode ? "divide-gray-700" : "divide-gray-200"
                }`}
              >
                {[
                  {
                    id: 1,
                    name: "Kofi Owusu",
                    class: "Class 1",
                    balance: "₵50.00",
                    lastMeal: "2025-02-19",
                    mealCount: "8 meals",
                  },
                  {
                    id: 2,
                    name: "Ama Mensah",
                    class: "Class 2",
                    balance: "₵30.00",
                    lastMeal: "2025-02-20",
                    mealCount: "6 meals",
                  },
                  {
                    id: 3,
                    name: "Yaw Boafo",
                    class: "Class 3",
                    balance: "₵40.00",
                    lastMeal: "2025-02-18",
                    mealCount: "7 meals",
                  },
                ].map((student, index) => (
                  <tr
                    key={student.id}
                    className={`hover:${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    } ${
                      index % 2 === 0
                        ? darkMode
                          ? "bg-gray-800"
                          : "bg-white"
                        : darkMode
                        ? "bg-gray-900"
                        : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm font-medium ${
                          darkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        {student.name}
                      </div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {student.class}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm text-red-600 ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {student.balance}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-100" : "text-gray-600"
                        }`}
                      >
                        {student.lastMeal}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm text-center ${
                          darkMode ? "text-gray-100" : "text-gray-600"
                        }`}
                      >
                        {student.mealCount}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button className="text-purple-600 hover:text-purple-700 mr-3">
                        Record Meal
                      </button>
                      <button className="text-green-600 hover:text-green-700">
                        Add Credit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
