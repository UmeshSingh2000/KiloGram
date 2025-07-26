import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Components/Input';
import Button from '../Components/Button';
import { registerUser } from '../Service/userAuthenticationService';
import StatusCodes from '../helpers/statusCodes';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
    userName: ""
  })

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const handleRegister = async () => {
    try {
      setLoading(true)
      const response = await registerUser(userData);
      if (response.status === StatusCodes.CREATED) {
        toast.success(response.message)
        navigate('/')
      }
      else if (response.status === StatusCodes.NO_CONTENT) {
        toast.error(response.message)
      }
    } catch (error) {
      const errors = error?.response?.data?.errors
      if (Array.isArray(errors)) {
        errors.forEach((msg) => toast.error(msg))
      }
      else {
        toast.error(error.message)
      }
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-black flex py-2 items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Main signup container */}
        <div className=" border border-gray-700 p-8 mb-4">
          {/* Instagram logo */}
          <div className="text-center mb-6">
            <h1 className="text-white font-bold text-4xl">KiloGram</h1>
          </div>

          {/* Subtitle */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">
              Sign up to see photos and videos<br />
              from your friends.
            </p>
          </div>

          {/* Facebook signup button */}
          <button className="w-full text-sm flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Log in with Facebook</span>
          </button>

          {/* OR divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Signup form */}
          <div className="space-y-3">
            <Input
              type='email'
              value={userData.email}
              name='email'
              onChange={handleChange}
              placeholder='Email' />

            <Input
              type='password'
              value={userData.password}
              name='password'
              onChange={handleChange}
              placeholder='Password...' />

            <Input
              type='text'
              value={userData.name}
              name='name'
              onChange={handleChange}
              placeholder='Full Name...' />

            <Input
              type='text'
              value={userData.userName}
              name='userName'
              onChange={handleChange}
              placeholder='Username...' />

            {/* Contact sync info */}
            <div className="text-center mt-4 mb-4">
              <p className="text-gray-500 text-xs leading-relaxed">
                People who use our service may have uploaded<br />
                your contact information to Instagram.{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Learn More
                </a>
              </p>
            </div>

            {/* Terms and policies */}
            <div className="text-center mb-6">
              <p className="text-gray-500 text-xs leading-relaxed">
                By signing up, you agree to our{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">Terms</a>,{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">Cookies Policy</a>.
              </p>
            </div>

            {/* Sign up button */}
            <Button
              text="Sign up"
              handleClick={handleRegister}
              loading={loading}
            />
          </div>
        </div>

        {/* Login link container */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-center">
          <p className="text-gray-400 text-sm">
            Have an account?{' '}
            <Link to='/' className="text-blue-400 hover:text-blue-300 font-semibold">Log in</Link>
          </p>
        </div>

        {/* App download section */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm mb-4">Get the app.</p>

          <div className="flex justify-center space-x-2">
            <a href="#" className="block">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM2IiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTM2IDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMCAwSDE0NlY0MEgwVjBaIiBmaWxsPSJibGFjayIvPgo8dGV4dCB4PSI3MyIgeT0iMjUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iQXJpYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRvd25sb2FkIG9uIHRoZSBBcHAgU3RvcmU8L3RleHQ+Cjwvc3ZnPgo="
                alt="Download on the App Store"
                className="h-10"
              />
            </a>

            <a href="#" className="block">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM2IiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTM2IDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMCAwSDE0NlY0MEgwVjBaIiBmaWxsPSJibGFjayIvPgo8dGV4dCB4PSI3MyIgeT0iMjUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iQXJpYWwiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkdldCBpdCBvbiBHb29nbGUgUGxheTwvdGV4dD4KICA8L3N2Zz4K"
                alt="Get it on Google Play"
                className="h-10"
              />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;