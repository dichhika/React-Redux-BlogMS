import React, { useState } from "react";
import { Link } from "react-router-dom";

const Form = ({ type, onSubmit, user }) => {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Only send relevant fields based on type
    const payload =
      type === "Login" ? { email: data.email, password: data.password } : data;

    onSubmit(payload);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10 md:p-20">
          <div className="max-w-md mx-auto">
            {type === "Login" && user?.username && (
              <p className="text-center">Hello {user.username}</p>
            )}

            <h1 className="text-2xl font-semibold mb-6 text-center">
              {type === "Login"
                ? "Login here to continue..."
                : "Register here to continue..."}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <input
                  autoComplete="off"
                  id={`${type}-email`}
                  name="email"
                  type="text"
                  className="peer placeholder-transparent h-10 w-full max-w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                  placeholder="Email address"
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor={`${type}-email`}
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm
                             peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
                             peer-placeholder-shown:top-2 transition-all
                             peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email Address
                </label>
              </div>

              {/* Username Field (Only for Register) */}
              {type === "Register" && (
                <div className="relative">
                  <input
                    autoComplete="off"
                    id={`${type}-username`}
                    name="username"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full max-w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor={`${type}-username`}
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm
                               peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
                               peer-placeholder-shown:top-2 transition-all
                               peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Username
                  </label>
                </div>
              )}

              {/* Password Field */}
              <div className="relative">
                <input
                  autoComplete="off"
                  id={`${type}-password`}
                  name="password"
                  type="password"
                  className="peer placeholder-transparent h-10 w-full max-w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor={`${type}-password`}
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm
                             peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
                             peer-placeholder-shown:top-2 transition-all
                             peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>

              {/* Submit Button */}
              <div className="relative">
                <button
                  type="submit"
                  className="w-full bg-cyan-500 text-white rounded-md px-4 py-2 hover:bg-cyan-600 transition"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Toggle Link */}
            <div className="mt-6 text-center">
              {type === "Register" ? (
                <Link to="/login" className="text-cyan-600 hover:underline">
                  Go to login
                </Link>
              ) : (
                <Link to="/register" className="text-cyan-600 hover:underline">
                  Go to register
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
