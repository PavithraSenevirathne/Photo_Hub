import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../../assets/background-2.jpg';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      toast.success('Account created! Redirecting to profile...');
      setTimeout(() => navigate('/profile'), 1000);
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center dark:bg-dark"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text contrast
        backgroundBlendMode: 'overlay'
      }}
    >
      <h1 className="text-6xl font-bold mb-8 -mt-20 flex items-center text-accent-dark">
        <span className="text-white">Photo</span>
        <span className="text-yellow-500">Hub</span>
      </h1>
      <div className="bg-card-dark p-8 rounded-lg shadow-dark w-[600px] backdrop-blur-sm bg-opacity-90">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Account</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="grid grid-cols-2 gap-4">
            <input 
              className="w-full p-3 border border-dark-input text-white bg-dark-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dark" 
              name="firstName" 
              placeholder="First Name" 
              onChange={handleChange} 
              required 
            />
            <input 
              className="w-full p-3 border border-dark-input text-white bg-dark-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dark" 
              name="lastName" 
              placeholder="Last Name" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input 
              className="w-full p-3 border border-dark-input text-white bg-dark-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dark" 
              name="age" 
              type="number" 
              placeholder="Age" 
              onChange={handleChange} 
              required 
            />
            <input 
              className="w-full p-3 border border-dark-input text-white bg-dark-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dark" 
              name="phoneNumber" 
              placeholder="Phone Number" 
              onChange={handleChange} 
              required 
            />
          </div>
          <input 
            className="w-full p-3 border border-dark-input text-white bg-dark-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dark" 
            name="address" 
            placeholder="Address" 
            onChange={handleChange} 
            required 
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              className="w-full p-3 border border-dark-input text-white bg-dark-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dark" 
              name="email" 
              type="email" 
              placeholder="Email" 
              onChange={handleChange} 
              required 
            />
            <input 
              className="w-full p-3 border border-dark-input text-white bg-dark-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dark" 
              name="password" 
              type="password" 
              placeholder="Password" 
              onChange={handleChange} 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-accent-dark text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
          >
            Sign Up
          </button>
          <p className="text-sm text-center mt-4 text-secondary-dark">
            Already have an account?{' '}
            <Link to="/" className="text-accent-dark hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
