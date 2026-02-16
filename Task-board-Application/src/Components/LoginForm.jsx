import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";

const LoginForm = ({ onLogin, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password, remember);
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-800 to-emerald-400 text-white flex-col justify-between p-12">
        <h1 className="text-6xl font-bold">Task Board</h1>

        <div className="max-w-md">
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Manage your work smarter & faster
          </h2>
          <p className="text-indigo-100 text-2xl">
            Track tasks, manage your team, and monitor progress in one modern dashboard.
          </p>
        </div>

        <div className="text-lg text-indigo-200">
          © 2026. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 mb-6">
            Please login to your account
          </p>

          {error && (
            <div className="mb-4 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email
              </label>
              <div className="mt-2 flex items-center border-2 border-gray-300 rounded-lg px-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="intern@demo.com"
                  className="w-full p-2 outline-none text-black bg-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="mt-2 flex items-center border-2 border-gray-300 rounded-lg px-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-2 outline-none text-black bg-transparent"
                />
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-indigo-600"
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-700 transition duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;