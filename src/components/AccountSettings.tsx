import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AccountSettings: React.FC = () => {
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [location, setLocation] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [existingProfilePhoto, setExistingProfilePhoto] = useState("");
  const [existingBannerImage, setExistingBannerImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing user data
  useEffect(() => {
    axios
      .get("http://localhost:3000/account-settings")
      .then((response) => {
        const {
          username,
          userRole,
          schoolName,
          location,
          profilePhoto,
          bannerImage,
        } = response.data;
        setUsername(username || "");
        setUserRole(userRole || "");
        setSchoolName(schoolName || "");
        setLocation(location || "");
        setExistingProfilePhoto(profilePhoto || "");
        setExistingBannerImage(bannerImage || "");
      })
      .catch((error) => console.error("Failed to fetch user data:", error));
  }, []);

  const handleProfilePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePhoto(event.target.files[0]);
    }
  };

  const handleBannerImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setBannerImage(event.target.files[0]);
    }
  };

const handleSubmit = async () => {
  setLoading(true);
  setMessage("");
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("userRole", userRole);
    formData.append("schoolName", schoolName);
    formData.append("location", location);

    // Append profile photo if a new one is selected, otherwise use the existing URL
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    } else {
      formData.append("existingProfilePhoto", existingProfilePhoto);
    }

    // Append banner image if a new one is selected, otherwise use the existing URL
    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    } else {
      formData.append("existingBannerImage", existingBannerImage);
    }

    // Send the form data to the backend
    const response = await axios.post(
      "http://localhost:3000/account-settings",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    setMessage(response.data?.message || "Settings saved successfully!");
    toast.success(response.data?.message || "Settings saved successfully!");
  } catch (error) {
    console.error("Error saving settings:", error);
    toast.error("Failed to save settings.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-2 mb-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-2xl shadow-lg">
      {/* Banner Section */}
      <div
        className="relative w-full h-40 mt-8 bg-cover bg-center rounded-lg shadow-sm"
        style={{
          backgroundImage: bannerImage
            ? `url(${URL.createObjectURL(bannerImage)})`
            : `url("https://i.postimg.cc/Y9ttXzJw/R.jpg")`,
        }}
      >
        {/* Profile Photo at the Top */}
        <div className="absolute -top-12 left-4">
          <img
            src={profilePhoto ? URL.createObjectURL(profilePhoto) : "/self.jpg"}
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

        {/* Profile & Banner Photo Uploads */}
        <div className="mb-6 flex space-x-4">
          <div>
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

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
              Banner Image
            </label>
            <label className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Change Banner
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerImageChange}
                className="hidden"
              />
            </label>
          </div>
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
            placeholder="Enter your username"
            className="w-full mt-1 px-4 py-2 border border-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg dark:bg-gray-700 dark:text-white outline-none transition"
          />
        </div>

        {/* User Role */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            User Role
          </label>
          <input
            type="text"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            placeholder="Enter your role (e.g., Student, Teacher)"
            className="w-full mt-1 px-4 py-2 border border-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg dark:bg-gray-700 dark:text-white outline-none transition"
          />
        </div>

        {/* School Name */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            School Name
          </label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="Enter your school name"
            className="w-full mt-1 px-4 py-2 border border-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg dark:bg-gray-700 dark:text-white outline-none transition"
          />
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="w-full mt-1 px-4 py-2 border border-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg dark:bg-gray-700 dark:text-white outline-none transition"
          />
        </div>

        {/* Save Button */}
        <button
          className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {/* Success/Error Message */}
        {message && <p className="mt-4 text-center font-medium">{message}</p>}
      </div>
    </div>
  );
};

export default AccountSettings;
