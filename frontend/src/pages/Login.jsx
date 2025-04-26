import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate(); // ✅ Added useNavigate for redirection

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // ✅ Fixed 'preventDefult()' typo
    console.log("Form Submitted:", { name, email, password });

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/'); // ✅ Redirect to home page if token is set
    }
  }, [token]);

  return (
    <form
      className="min-h-[80vh] flex items-center justify-center bg-gray-50"
      onSubmit={onSubmitHandler} // ✅ Added form submission
    >
      <div className="flex flex-col gap-4 p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg bg-white">
        {/* Title */}
        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </p>
        <p className="text-gray-500">
          Please {state === 'Sign Up' ? "Sign Up" : "Log in"} to Book an Appointment
        </p>

        {/* Name Input (Only in Sign Up Mode) */}
        {state === "Sign Up" && (
          <div className="w-full">
            <p className="text-gray-700">Full Name</p>
            <input 
              className="border border-zinc-300 rounded w-full p-2 mt-1 focus:ring-2 focus:ring-blue-700"
              type="text" 
              onChange={(e) => setName(e.target.value)} // ✅ Fixed 'e.target.name' → 'e.target.value'
              value={name} 
              required 
            />
          </div>
        )}

        {/* Email Input */}
        <div className="w-full">
          <p className="text-gray-700">Email</p>
          <input 
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:ring-2 focus:ring-blue-700"
            type="email" 
            onChange={(e) => setEmail(e.target.value)} // ✅ Fixed 'e.target.name' → 'e.target.value'
            value={email} 
            required 
          />
        </div>

        {/* Password Input */}
        <div className="w-full">
          <p className="text-gray-700">Password</p>
          <input 
            className="border border-zinc-300 rounded w-full p-2 mt-1 focus:ring-2 focus:ring-blue-700"
            type="password" 
            onChange={(e) => setPassword(e.target.value)} // ✅ Fixed 'e.target.name' → 'e.target.value'
            value={password} 
            required 
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" // ✅ Added type="submit" for proper form submission
          className="bg-blue-800 hover:bg-blue-700 text-white w-full py-2 rounded-md text-base transition-all"
        >
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        {/* Toggle Between Sign Up & Login */}
        {state === "Sign Up" ? (
          <p>
            Already have an account? 
            <span 
              onClick={() => setState('Login')} 
              className="text-blue-600 underline cursor-pointer ml-1"
            >
              Login Here
            </span>
          </p>
        ) : (
          <p>
            Create a new account? 
            <span 
              onClick={() => setState('Sign Up')}
              className="text-blue-600 underline cursor-pointer ml-1"
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
