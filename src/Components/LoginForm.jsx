import React, { useState } from "react";
import { Mail, Lock, CheckCircle, BarChart3, Users } from "lucide-react";

const LoginForm = ({ onLogin, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password, remember);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDE WITH DIAGONAL DESIGN */}
      <div className="hidden lg:flex w-1/3 relative">

        {/* Background with diagonal cut */}
        <div
          className="absolute inset-0 bg-gradient-to-br 
          from-emerald-900 via-emerald-700 to-emerald-500
          [clip-path:polygon(0_0,100%_0,80%_100%,0_100%)]"
        ></div>

        {/* Content */}
        <div className="relative z-10 text-white p-16 flex flex-col justify-between w-full">

          <div>
            <h1 className="text-5xl font-bold mb-6">
              TaskBoard
            </h1>

            <h2 className="text-4xl font-semibold mb-6">
              Organize. Track. Deliver.
            </h2>

            <p className="text-lg text-emerald-100 mb-10">
              A modern Kanban-style task management system to help teams move
              work from <span className="font-semibold">Todo → Doing → Done</span>.
            </p>

            {/* Features */}
            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6" />
                <p className="text-lg">
                  Drag & drop tasks easily
                </p>
              </div>

              <div className="flex items-start gap-4">
                <Users className="w-6 h-6" />
                <p className="text-lg">
                  Manage your team efficiently
                </p>
              </div>

              <div className="flex items-start gap-4">
                <BarChart3 className="w-6 h-6" />
                <p className="text-lg">
                  Track progress in real time
                </p>
              </div>

            </div>
          </div>

          <div className="text-sm text-emerald-200">
            © 2026 TaskBoard. All rights reserved.
          </div>

        </div>
      </div>

      {/* RIGHT SIDE LOGIN FORM */}
      <div className="flex flex-1 items-center justify-center px-6 bg-white">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mb-8">
            Sign in to continue managing your tasks
          </p>

          {error && (
            <div className="mb-4 text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>

              <div className="mt-2 flex items-center border border-gray-300 rounded-xl px-4 py-2 focus-within:border-emerald-500 transition">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="intern@demo.com"
                  className="w-full outline-none text-black bg-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>

              <div className="mt-2 flex items-center border border-gray-300 rounded-xl px-4 py-2 focus-within:border-emerald-500 transition">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full outline-none text-black bg-transparent"
                />
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="accent-emerald-600"
              />
              <span className="text-gray-600">
                Remember me
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition duration-300 shadow-lg"
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