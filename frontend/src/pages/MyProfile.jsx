import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null); // Set image state to null by default
  const [loading, setLoading] = useState(false); // Added loading state

  const updateProfileData = async () => {
    if (!userData.name || !userData.phone) {
      // Basic validation for name and phone
      return toast.error('Name and phone are required');
    }

    try {
      setLoading(true); // Start loading
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      formData.append('address', JSON.stringify(userData.address));
      if (image) formData.append('image', image); // Append image if it exists

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        {
          headers: {
            token: `${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData(); // Refresh profile data
        setIsEdit(false); // Exit edit mode
        setImage(null); // Clear image preview
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    userData && (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-200 shadow-2xl rounded-lg text-gray-800">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-80"
                src={image ? URL.createObjectURL(image) : userData.image || assets.default_avatar}
                alt="Profile Preview"
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? '' : assets.upload_icon}
                alt="Upload Icon"
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            className="w-36 h-36 rounded-full border-4 border-gray-200"
            src={userData.image || assets.default_avatar}
            alt="Profile"
          />
        )}

        {/* Profile Name */}
        <div className="flex flex-col items-center">
          {isEdit ? (
            <input
              className="mt-4 text-xl font-semibold text-center border-b border-gray-400 focus:outline-none"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="text-2xl font-semibold mt-4">{userData.name}</p>
          )}
        </div>

        <hr className="my-5 border-gray-500" />

        {/* Contact Information */}
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-600 underline">Contact Information:</p>
          <div className="mt-2 space-y-3">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{userData.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              {isEdit ? (
                <input
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                
                <p className="font-medium">{userData.phone},{userData.name}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </div>
              ) : (
                <p className="font-medium">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mt-6">
          <p className="text-lg font-medium text-gray-600 underline">Basic Information:</p>
          <div className="mt-2 space-y-3">
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              {isEdit ? (
                <select
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="font-medium">{userData.gender}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Birthday</p>
              {isEdit ? (
                <input
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                  type="date"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  value={userData.dob}
                />
              ) : (
                <p className="font-medium">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        {/* Edit & Save Button */}
        <div className="mt-10 text-center space-x-4">
          {isEdit ? (
            <>
              <button
                onClick={updateProfileData}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                disabled={loading} // Prevent double clicks
              >
                {loading ? 'Saving...' : 'Save Information'}
              </button>
              <button
                onClick={() => {
                  setIsEdit(false);
                  setImage(null); // Reset image state on cancel
                  loadUserProfileData(); // Restore original data
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
