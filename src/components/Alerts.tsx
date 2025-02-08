import React from 'react';
import { Bell } from 'lucide-react';

function Alerts() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payment Alerts</h2>
      <div className="space-y-4">
        {/* Unpaid Fees Alert */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-8 h-8 text-red-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Unpaid Fees Alert</h3>
                <p className="text-gray-600">
                  The following students have not paid their fees today:
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Today</span>
          </div>
          <div className="mt-4 pl-12">
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <div>
                  <span className="font-medium">John Doe</span>
                  <span className="text-gray-500 text-sm ml-2">Class 1</span>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800">
                  Record Payment
                </button>
              </li>
              {/* More alert items would go here */}
            </ul>
          </div>
        </div>

        {/* Low Balance Alert */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-8 h-8 text-orange-500 mr-4" /> {/* Replaced AlertCircle with Bell */}
              <div>
                <h3 className="text-lg font-semibold">Low Balance Alert</h3>
                <p className="text-gray-600">
                  Students with low advance payment balance:
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Updated 5m ago</span>
          </div>
          <div className="mt-4 pl-12">
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Jane Smith</span>
                  <span className="text-gray-500 text-sm ml-2">
                    Balance: ₵10.00
                  </span>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800">
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