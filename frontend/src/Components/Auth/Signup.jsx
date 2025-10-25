import React, { useContext, useState } from "react";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import NoteContext from "../../context/notes/noteContext";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const context = useContext(NoteContext);
  const { signup } = context;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError({ type: "error", msg: "Please fill in all fields" });
      return;
    }

    if (password !== confirmPassword) {
      setError({ type: "error", msg: "Passwords do not match.s" });
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call
    const res = await signup({ username: name, email, password });
    if (res == true) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      setError({ type: "success", msg: "Sign up successful! Please login." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition duration-500">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
          Create your account
        </h2>

        {error && (
          <div
            className={`mb-4 p-3 text-sm rounded-lg ${
              error.type === "error"
                ? "text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200"
                : "text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200"
            }`}
            role="alert"
          >
            {error.msg}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete=""
              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
            />
            <div
              className="absolute top-2.5 right-3 cursor-pointer text-gray-400 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
            />
            <div
              className="absolute top-2.5 right-3 cursor-pointer text-gray-400 dark:text-gray-300"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } dark:focus:ring-offset-gray-800`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
