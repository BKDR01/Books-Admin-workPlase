import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import useAuthStore from '../../store/auth';

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await loginUser(form)
      login(res.data.accessToken)

      navigate("/")
    } catch (error) {
      alert("login xato" + (error.response?.data?.message || "Server xatosi"))
      console.log(error.response);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h2 className="text-[34px] w-[440px]  font-bold text-center mb-20">
        Tuproqqal’a tumani axborot-kutubxona markazi
      </h2>

      <div className="w-[226px] max-w-sm">
        <h3 className="text-[18px] font-semibold mb-6 text-center ">Welcome back!</h3>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@mail.com"
            className="w-[full] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-2 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none pr-10"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="w-5 h-5" />
            ) : (
              <AiOutlineEye className="w-5 h-5" />
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-5">
          Use at least 8 characters with 1 number, and one special character.
        </p>

        <button
          type="submit"
          onClick={handleLogin}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-full transition"
        >
          LOG IN
        </button>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-green-700 hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
