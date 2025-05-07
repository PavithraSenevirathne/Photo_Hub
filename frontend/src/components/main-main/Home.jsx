import { useNavigate } from 'react-router-dom';
import { Share2, Book, LineChart } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const features = [
    {
      icon: <Share2 className="w-12 h-12 text-purple-400" />,
      title: 'Skill Posts',
      description: 'Share and discover new skills with the community',
      path: '/s'
    },
    {
      icon: <Book className="w-12 h-12 text-purple-400" />,
      title: 'Learning Plans',
      description: 'Create and follow structured learning paths',
      path: '/courses'
    },
    {
      icon: <LineChart className="w-12 h-12 text-purple-400" />,
      title: 'Learning Progress',
      description: 'Track your learning journey and achievements',
      path: '/progress'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-900">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl font-bold mb-4">
                Welcome back, {user?.firstName || 'User'}!
              </h1>
              <p className="text-xl text-purple-200 mb-8">
                Continue your learning journey with PhotoHub
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => navigate(feature.path)}
                  className="bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-gray-700 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Section */}
          <div className="bg-gray-800 py-12">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl font-bold text-center mb-8 text-white">Your Learning Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-300 mb-2">12</div>
                  <div className="text-gray-400">Skills Shared</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-300 mb-2">5</div>
                  <div className="text-gray-400">Active Plans</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-300 mb-2">85%</div>
                  <div className="text-gray-400">Progress Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
