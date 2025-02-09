import { Bell } from "lucide-react";

function Alerts() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Payment Alerts
      </h2>
      <div className="space-y-4">
        {/* Unpaid Fees Alert */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition duration-300">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center w-full sm:w-auto">
              <Bell className="w-6 h-6 text-red-500 mr-3 sm:mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Unpaid Fees Alert</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  The following students have not paid their fees today:
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500 mt-2 sm:mt-0">Today</span>
          </div>
          <div className="mt-4 pl-8 sm:pl-12">
            <ul className="space-y-2">
              <li className="flex items-center justify-between px-2 py-2 hover:bg-gray-100 transition duration-300">
                <div>
                  <span className="font-medium">Kofi Owusu</span>
                  <span className="block text-xs sm:text-sm text-gray-500 ml-2">
                    Class 1
                  </span>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800 transition duration-300 text-sm">
                  Record Payment
                </button>
              </li>
              {/* More alert items would go here */}
            </ul>
          </div>
        </div>

        {/* Low Balance Alert */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition duration-300">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center w-full sm:w-auto">
              <Bell className="w-6 h-6 text-orange-500 mr-3 sm:mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Low Balance Alert</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Students with low advance payment balance:
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500 mt-2 sm:mt-0">
              Updated 5m ago
            </span>
          </div>
          <div className="mt-4 pl-8 sm:pl-12">
            <ul className="space-y-2">
              <li className="flex items-center justify-between px-2 py-2 hover:bg-gray-100 transition duration-300">
                <div>
                  <span className="font-medium">Yaa Asantewaa</span>
                  <span className="block text-xs sm:text-sm text-gray-500 ml-2">
                    Balance: ₵10.00
                  </span>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800 transition duration-300 text-sm">
                  Top Up
                </button>
              </li>
              {/* More alert items would go here */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alerts;
