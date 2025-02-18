import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import backgroundVideo from '../assets/mp.mp4'; 

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      valid = false;
    }

    if (valid) {
      try {
        const response = await axios.post('http://localhost:2020/sign/login', { email, password });

        if (response.status === 200) {
          Swal.fire('Login successful!', '', 'success');
          navigate('/dashboard');
        } else {
          Swal.fire('Login failed', 'Please check your credentials.', 'error');
        }
      } catch (error) {
        Swal.fire('Error', error.response?.data?.message || 'An error occurred.', 'error');
        console.error('Login Error:', error.response || error.message);
      }
    }
  };

  return (
    <div>
      
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={backgroundVideo}
        autoPlay
        loop
        muted
      />

      
      

      {/* Flex Container */}
      <div className='flex justify-center p-12 items-center'>
      <div className="relative flex p-10">
        {/* Left Pane */}
        <div className="flex flex-col justify-center items-center p-8 text-white">
          <h1 className="text-5xl font-bold mb-6">Welcome to EMPEase</h1>
          <p className="text-lg text-center leading-relaxed max-w-md">
            Discover features and enjoy the journey with EMPEase. Your companion for streamlined CRM solutions.
          </p>
        </div>

        {/* Right Pane */}
      
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-10 shadow-lg w-[400px] md:w-[450px] m-10 ">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800">Login to Your Account</h2>
            <p className="text-gray-500 mt-2">Access your dashboard and manage tasks effortlessly.</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter your email"
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter your password"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-black mt-6">
            Not a member?{' '}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
            >
              Create Account
            </Link>
          </p>
          <p className="text-center text-sm text-black mt-6">
            Forgot your password?{' '}
            <Link
              to="/pass"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition"
            >
              Get My Password
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
