import React, { useState } from 'react';
import { Calendar, CircleDollarSign, AlertCircle } from 'lucide-react';
import { Switch } from "@headlessui/react";

function Payments() {
  const [activeTab, setActiveTab] = useState('record');
  const [isPresent, setIsPresent] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payments</h2>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {[
              { id: "record", name: "Record Payment" },
              { id: "credit", name: "Credit Payments" },
              { id: "irregular", name: "Irregular Payments" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {activeTab === "record" && (
          <>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-4">Record Payment</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student
                  </label>
                  <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Select Student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <CircleDollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="number"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Type
                  </label>
                  <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="advance">Advance Payment</option>
                    <option value="regular">Regular Payment</option>
                    <option value="credit">Credit Payment</option>
                    <option value="irregular">Irregular Payment</option>
                  </select>
                </div>
                {/* Toggle Switch for Student Presence */}
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isPresent}
                    onChange={setIsPresent}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      isPresent ? "bg-indigo-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        isPresent ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </Switch>
                  <span className="text-gray-700">Student is present</span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Record Payment
                </button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            Kofi Owusu
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">₵50.00</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            2024-02-20
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Irregular
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "credit" && (
          <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Credit Payments</h3>
              <div className="flex items-center text-red-600">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>Total Outstanding: ₵1,250.00</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
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
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      id: 1,
                      name: "Akua Mensah",
                      class: "Class 2",
                      amount: "₵30.00",
                      lastPayment: "2024-02-15",
                    },
                    {
                      id: 2,
                      name: "Kofi Agyei",
                      class: "Class 3",
                      amount: "₵50.00",
                      lastPayment: "2024-02-10",
                    },
                    {
                      id: 3,
                      name: "Ama Ofori",
                      class: "Class 1",
                      amount: "₵20.00",
                      lastPayment: "2024-02-20",
                    },
                  ].map((student, index) => (
                    <tr
                      key={student.id}
                      className={`hover:bg-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.class}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-red-600">
                          {student.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.lastPayment}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-indigo-600 hover:text-indigo-900">
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
          <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-6">
              Irregular Eater Payments
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
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
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      id: 1,
                      name: "Kofi Owusu",
                      class: "Class 1",
                      balance: "₵50.00",
                      lastMeal: "2024-02-19",
                      mealCount: "8 meals",
                    },
                    {
                      id: 2,
                      name: "Ama Mensah",
                      class: "Class 2",
                      balance: "₵30.00",
                      lastMeal: "2024-02-20",
                      mealCount: "6 meals",
                    },
                    {
                      id: 3,
                      name: "Yaw Boafo",
                      class: "Class 3",
                      balance: "₵40.00",
                      lastMeal: "2024-02-18",
                      mealCount: "7 meals",
                    },
                  ].map((student, index) => (
                    <tr
                      key={student.id}
                      className={`hover:bg-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.class}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.balance}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {student.lastMeal}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.mealCount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          Record Meal
                        </button>
                        <button className="text-green-600 hover:text-green-900">
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
    </div>
  );
}

export default Payments;