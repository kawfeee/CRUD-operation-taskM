import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiCalendar } from 'react-icons/fi';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateUser(formData);
    if (result.success) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
      avatar: user?.avatar || ''
    });
    setIsEditing(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-primary-600">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">{user?.name}</h1>
                <p className="text-primary-100 mt-1">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="px-8 py-8">
            {!isEditing ? (
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FiUser className="text-gray-400 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="text-lg text-gray-900 font-medium">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FiMail className="text-gray-400 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-lg text-gray-900 font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <FiCalendar className="text-gray-400 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Member Since</p>
                    <p className="text-lg text-gray-900 font-medium">
                      {formatDate(user?.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-5 h-5 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Bio</p>
                    <p className="text-lg text-gray-900">
                      {user?.bio || 'No bio added yet'}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avatar URL (optional)
                  </label>
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Account Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">Active</div>
            <div className="text-gray-600">Account Status</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">Free</div>
            <div className="text-gray-600">Plan</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">JWT</div>
            <div className="text-gray-600">Auth Method</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
