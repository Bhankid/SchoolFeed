import React, { useState } from "react";

const AccountSettings: React.FC = () => {
  const [username, setUsername] = useState("Dev Fred");
    const [email, setEmail] = useState("alfredfianyo50@gmail.com");
    const [password, setPassword] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [bannerImage, setBannerImage] = useState("");

  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-2 mb-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-2xl shadow-lg">
      {/* Banner Section */}
      <div
        className="relative w-full h-40 mt-8 bg-cover bg-center rounded-lg shadow-sm"
        style={{
          backgroundImage: `url(${
            bannerImage || "https://i.postimg.cc/Y9ttXzJw/R.jpg"
          })`,
        }}
      >
        {/* Profile Photo at the Top */}
        <div className="absolute -top-12 left-4">
          <img
            src={profilePhoto || "/self.jpg"}
            alt="Profile"
            className="w-32 h-32 mt-4 rounded-full border-2 border-white dark:border-gray-800 shadow-md"
          />
        </div>
      </div>

      {/* Account Settings Form */}
      <div className="mt-8 p-6">
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2 border-gray-300 dark:border-gray-700">
          Account Settings
        </h2>

        {/* Change Profile Photo */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
            Profile Photo
          </label>
          <label className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="••••••••"
          />
        </div>

        {/* Save Button */}
        <button className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
