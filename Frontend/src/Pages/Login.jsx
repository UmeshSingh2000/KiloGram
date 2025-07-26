import React, { useEffect, useState } from 'react';
import Input from '../Components/Input';
import { loginUser } from '../Service/userAuthenticationService';
import toast from 'react-hot-toast';
import StatusCodes from '../helpers/statusCodes';
import { Link } from 'react-router-dom';
import Button from '../Components/Button';

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    identifier: '',
    password: ''
  })

  const handleChange = (e) => {
    setUserData((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ))
  }

  const handleLogin = async () => {
    try {
      setLoading(true)
      const response = await loginUser(userData)
      if (response.status === StatusCodes.OK) {
        toast.success(response.message)
        localStorage.setItem('token', response.token)
      }
      else if (response.status === StatusCodes.NO_CONTENT) {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="flex w-full max-w-4xl">
        {/* Left panel - Image collage */}
        <div className="hidden md:flex w-1/2 items-center justify-center relative">
          <div className="relative">
            {/* Main collage container */}
            <div className="relative w-80 h-96">
              {/* Background photos arranged in a collage style */}
              <div className="absolute top-0 left-0 w-32 h-40 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg transform rotate-12 shadow-lg">
                <div className="w-full h-full bg-orange-500 rounded-lg opacity-80"></div>
              </div>

              <div className="absolute top-10 right-0 w-40 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg transform -rotate-6 shadow-lg">
                <div className="w-full h-full bg-blue-400 rounded-lg opacity-80 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full opacity-60"></div>
                </div>
              </div>

              <div className="absolute bottom-0 left-10 w-36 h-44 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg transform rotate-6 shadow-lg">
                <div className="w-full h-full bg-green-400 rounded-lg opacity-80"></div>
              </div>

              <div className="absolute bottom-10 right-8 w-28 h-36 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg transform -rotate-12 shadow-lg">
                <div className="w-full h-full bg-purple-400 rounded-lg opacity-80"></div>
              </div>
            </div>

            {/* Floating reaction icons */}
            <div className="absolute -top-4 -left-4 bg-white rounded-full p-2 shadow-lg">
              <span className="text-xl">🔥</span>
            </div>

            <div className="absolute top-20 -right-8 bg-white rounded-full p-2 shadow-lg">
              <span className="text-xl">💜</span>
            </div>

            <div className="absolute bottom-20 -left-8 bg-red-500 rounded-full p-2 shadow-lg">
              <span className="text-xl text-white">❤️</span>
            </div>

            <div className="absolute -bottom-4 right-4 bg-green-500 rounded-full p-3 shadow-lg">
              <span className="text-white text-lg">✓</span>
            </div>
          </div>
        </div>

        {/* Right panel - Login form */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-sm">
            {/* Instagram logo */}
            <div className="text-center mb-8">
              <h1 className="text-white font-bold text-4xl">KiloGram</h1>
            </div>
            {/* Login form */}
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Username, or Email"
                value={userData.identifier}
                name='identifier'
                onChange={handleChange}
              />

              <Input
                type="password"
                placeholder="Password"
                name='password'
                value={userData.password}
                onChange={handleChange}
              />

              <Button
                text="Log in"
                handleClick={handleLogin}
                loading={loading}
              />

            </div>

            {/* OR divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="px-4 text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* Facebook login */}
            <button className="w-full text-sm cursor-pointer flex items-center justify-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Log in with Facebook</span>
            </button>

            {/* Forgot password */}
            <div className="text-center mt-6">
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">
                Forgot password?
              </a>
            </div>

            {/* Sign up link */}
            <div className="text-center mt-8 text-gray-400">
              <span>Don't have an account? </span>
              <Link to='/register' className="text-blue-400 hover:text-blue-300">Sign up</Link>
              {/* <a href="#" className="text-blue-400 hover:text-blue-300">
                Sign up
              </a> */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex justify-center space-x-4 text-xs text-gray-500">
          <span>English</span>
          <span>© 2025 KiloGram from Umesh</span>
        </div>
      </div>
    </div>
  );
};

export default Login;