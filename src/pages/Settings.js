import React, { useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-8">
      
      {/* Header */}
      <h2 className="text-3xl font-bold">Settings</h2>

      {/* Profile Section */}
      <section className="border-b pb-6">
        <h3 className="text-xl font-semibold mb-4">Profile Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              className="mt-1 w-full p-2 border rounded"
              defaultValue="Ashwita"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full p-2 border rounded"
              defaultValue="ashwita@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Preferred Currency</label>
            <select className="mt-1 w-full p-2 border rounded">
              <option>INR (₹)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Travel Preference</label>
            <select className="mt-1 w-full p-2 border rounded">
              <option>Adventure</option>
              <option>Luxury</option>
              <option>Budget-Friendly</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="border-b pb-6">
        <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>

        <div className="flex items-center justify-between">
          <p className="font-medium">Trip Reminders</p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="sr-only"
            />
            <span
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                notifications ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
                  notifications ? "translate-x-6" : ""
                }`}
              ></span>
            </span>
          </label>
        </div>
      </section>

      {/* Security Section */}
      <section className="border-b pb-6">
        <h3 className="text-xl font-semibold mb-4">Security</h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Current Password</label>
            <input className="mt-1 w-full p-2 border rounded" type="password" />
          </div>

          <div>
            <label className="text-sm font-medium">New Password</label>
            <input className="mt-1 w-full p-2 border rounded" type="password" />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm New Password</label>
            <input className="mt-1 w-full p-2 border rounded" type="password" />
          </div>
        </div>
      </section>

      {/* Theme Toggle */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Theme</h3>

        <div className="flex items-center justify-between">
          <p className="font-medium">Dark Mode</p>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only"
            />
            <span
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                darkMode ? "bg-indigo-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
                  darkMode ? "translate-x-6" : ""
                }`}
              ></span>
            </span>
          </label>
        </div>
      </section>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button className="px-5 py-2 bg-indigo-600 text-white rounded shadow">
          Save Changes
        </button>
        <button className="px-5 py-2 border rounded shadow">Cancel</button>
      </div>
    </div>
  );
}
