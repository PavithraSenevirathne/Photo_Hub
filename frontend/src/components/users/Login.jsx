import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../../assets/background-2.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/home'), 1000); // delay to show toast before redirect
    } catch (err) {
      toast.error('Login failed. Check your email or password.');
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center dark:bg-dark"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark overlay for better text contrast
        backgroundBlendMode: 'overlay'
      }}
    >
      <h1 className="text-6xl font-bold mb-8 -mt-20 flex items-center text-accent-dark">
        <span className="text-white">Photo</span>
        <span className="text-yellow-500">Hub</span>
      </h1>
      <div className="bg-card-dark p-8 rounded-lg shadow-dark w-96 backdrop-blur-sm bg-opacity-90">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full p-3 border border-dark-input text-white bg-dark-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dark"
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full p-3 border border-dark-input text-white bg-dark-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dark"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-accent-dark text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
          >
            Login
          </button>
          <p className="text-sm text-center mt-4 text-secondary-dark">
            Create account?{' '}
            <Link to="/signup" className="text-accent-dark hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
