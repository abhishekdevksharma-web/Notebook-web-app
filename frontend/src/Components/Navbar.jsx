import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";
import { NotebookText, Home, User, Bell, Settings, LogOut } from "lucide-react";
import { useState, useEffect, useRef, useContext } from "react";
import { GoHomeFill } from "react-icons/go";
function Navbar() {
  const context = useContext(NoteContext);
  const {
    profileisOpen,
    setprofileisOpen,
    setIsOpen,
    setsettingIsOpen,
    isAuth,
  } = context;
  let location = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navigate = useNavigate();

  const goToSign = () => {
    navigate("/signup"); // ya navigate("/") agar home route hai
  };

  const goToLogin = () => {
    navigate("/login");
  };
  function logout() {
    localStorage.clear();
  }

  return (
    <nav className="fixed w-full h-[9vh] bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white shadow-lg border-1 border-white/10 z-100">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 h-16 items-center w-full ">
          {/* <div className="hidden md:flex items-center space-x-8"> */}
          {/* First Section */}
          <div className="flex justify-start">
            <div className="flex-shrink-0">
              <NotebookText />
            </div>
          </div>

          {/* Center Section */}
          <div className="flex justify-center gap-6">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "bg-white/20 rounded text-white"
                  : "text-white"
              } text-center flex items-center hover:text-purple-300 px-3 py-1 transition duration-500 ease-in-out transform hover:scale-105`}
            >
              Home
            </Link>
            {/* Notes Link */}
            <Link
              to="/notes"
              className={`${
                location.pathname === "/notes"
                  ? "bg-white/20 rounded text-white"
                  : "text-white"
              } text-center hover:text-purple-300 px-3 py-1 transition duration-500 ease-in-out transform hover:scale-105`}
            >
              Notes
            </Link>
            {/* About Link */}
            <Link
              to="/about"
              className={`${
                location.pathname === "/about"
                  ? "bg-white/20 rounded text-white "
                  : "text-white"
              } text-center hover:text-purple-300 px-3 py-1 transition duration-500 ease-in-out transform hover:scale-105`}
            >
              About
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex justify-end items-center gap-3">
            <button
              type="button"
              className="p-1 ml-4 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transition duration-150 ease-in-out"
            >
              <Bell className="h-6 cursor-pointer w-6" aria-hidden="true" />
            </button>
            {/* User Dropdown */}
            <div className="ml-3 relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                type="button"
                className="max-w-xs bg-gray-800 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
              >
                <User className="h-8 w-8 cursor-pointer rounded-full hover:bg-white/5 text-indigo-400 p-1 bg-gray-700" />
              </button>

              {/* Profile Dropdown */}

              {open && (
                <div className="absolute right-0 mt-2 w-52 bg-gray-800 text-gray-200 rounded-xl shadow-2xl ring-1 ring-white/10 overflow-hidden z-500 animate-slide-down origin-top backdrop-blur-lg ">
                  {/* Profile Link */}
                  <div
                    onClick={() => setprofileisOpen(true)}
                    className="flex items-center cursor-pointer space-x-3 px-4 py-2.5 transition duration-200 hover:bg-gray-700 hover:text-white"
                  >
                    <User className="w-4 h-4 text-indigo-400 " />
                    <span className="font-medium">Profile</span>
                  </div>

                  {/* Settings Link */}
                  <div
                    onClick={() => {
                      setsettingIsOpen(true);
                    }}
                    className="flex items-center cursor-pointer space-x-3 px-4 py-2.5 transition duration-200 hover:bg-gray-700 hover:text-white"
                  >
                    <Settings className="w-4 h-4 text-indigo-400" />
                    <span className="font-medium">Settings</span>
                  </div>

                  {/* Divider + Logout Link */}
                  <div className="border-t border-gray-700"></div>
                  <p
                    onClick={logout}
                    className="flex cursor-pointer items-center space-x-3 px-4 py-2.5 transition duration-200 hover:bg-red-800 hover:text-white text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </p>
                </div>
              )}
            </div>
            {!isAuth ? (
              <div className="flex gap-4">
                <button
                  onClick={goToLogin}
                  className="bg-blue-700 cursor-pointer text-white font-semibold px-6 py-1 rounded hover:bg-blue-800 transition"
                >
                  Login
                </button>

                <button
                  onClick={goToSign}
                  className="border-2 border-blue-700 cursor-pointer text-blue-500 font-semibold px-5 py-1 rounded hover:bg-blue-700 hover:text-white transition"
                >
                  Signup
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
