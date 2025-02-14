import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import RecordPayment from "./RecordPayment";
import PaymentsTable from "./PaymentsTable";
import CreditPayments from "./CreditPayments";
import IrregularEaterPayments from "./IrregularEaterPayments";

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

      {activeTab === "credit" && <CreditPayments darkMode={darkMode} />}

      {activeTab === "irregular" && (
        <IrregularEaterPayments darkMode={darkMode} />
      )}
    </div>
  );
};

export default Payments;
