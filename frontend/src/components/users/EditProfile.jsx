import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser } from '../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../main-main/Navbar';
import { User } from 'lucide-react';

export default function EditProfile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [form, setForm] = useState({
    ...storedUser,
    iconColor: storedUser.iconColor || 'blue'
  });
  const [iconColor, setIconColor] = useState(storedUser.iconColor || 'blue');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleColorChange = (color) => {
    setIconColor(color);
    setForm({ ...form, iconColor: color });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(storedUser.id, form);
      const updatedUser = { ...response.data, iconColor: form.iconColor };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully!', {
        onClose: () => navigate('/profile')
      });
    } catch (error) {
      toast.error('Failed to update profile.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteUser(storedUser.id);
      localStorage.removeItem('user');
      toast.success('Account deleted successfully!', {
        onClose: () => navigate('/')
      });
    } catch (error) {
      toast.error('Failed to delete account.');
    }
  };

  // Color options for the profile icon
  const colorOptions = {
    blue: 'from-blue-400 to-purple-500',
    green: 'from-green-400 to-teal-500',
    pink: 'from-pink-400 to-rose-500',
    orange: 'from-orange-400 to-red-500',
    indigo: 'from-indigo-400 to-violet-500'
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-10">
        <div className="bg-gray-900 text-white p-10 rounded-lg shadow-xl w-[500px]">
          {/* Profile Icon */}
          <div className="flex flex-col items-center mb-8">
            <div className={`w-40 h-40 bg-gradient-to-r ${colorOptions[iconColor]} rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 mb-4`}>
              <User size={80} className="text-white" />
            </div>
            
            {/* Color Selection */}
            <div className="flex gap-2">
              {Object.entries(colorOptions).map(([color, gradient]) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-8 h-8 rounded-full bg-gradient-to-r ${gradient} ${iconColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                />
              ))}
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-center">Edit Profile</h2>
          
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="text-sm text-gray-400">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                required
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-full hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 text-lg font-medium shadow-md hover:shadow-lg"
              >
                Save
              </button>

              <button 
                type="button"
                onClick={handleDelete} 
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 text-lg font-medium shadow-md hover:shadow-lg border border-red-400"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
