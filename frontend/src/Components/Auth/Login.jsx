import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import NoteContext from "../../context/notes/noteContext";
import { useContext } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const context = useContext(NoteContext);
  const { login, noteLenght, setNoteLenght, setIsAuth } = context;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNoteLenght(564);
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call
    let totalNotes = 0;
    const loginResponce = await login({ email, password });
    const notes = Object.entries(loginResponce.user.notesByDate);

    notes.map((note) => {
      totalNotes += note[1].length;
    });
    setNoteLenght(totalNotes);

    if (loginResponce.success == true) {
      const { username, email } = loginResponce.user;
      let date = new Date(loginResponce.user.date);

      date = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      setLoading(false);
      localStorage.setItem("auth-token", loginResponce.authToken);
      localStorage.setItem(
        "User",
        JSON.stringify({ username, email, date, totalNotes })
      );
      setIsAuth(true);
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition duration-500">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
          Sign in to your account
        </h2>

        {error && (
          <div
            className="mb-4 p-3 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
            />
            <div
              className="absolute top-2.5 right-3 cursor-pointer text-gray-400 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 dark:text-white"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Forgot your password?
              </a>
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
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : null}
              {loading ? "Logging in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Not a member?{" "}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Start a 14-day free trial
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
