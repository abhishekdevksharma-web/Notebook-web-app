import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";
import { NotebookText, Bell, User, Settings, LogOut } from "lucide-react";
import { useState, useEffect, useRef, useContext } from "react";

function Navbar() {
  const context = useContext(NoteContext);
  const {
    profileisOpen,
    setprofileisOpen,
    setIsOpen,
    setsettingIsOpen,
    isAuth,
    colorMode,
    setcolorMode,
  } = context;

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goToSign = () => {
    navigate("/signup");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  function toggleDarkMode() {
    if (colorMode) {
      // currently light → go dark
      document.documentElement.classList.add("dark");
      setcolorMode(false);
    } else {
      // currently dark → go light
      document.documentElement.classList.remove("dark");
      setcolorMode(true);
    }
  }

  return (
    <nav
      className={
        "fixed w-full h-[9vh] backdrop-blur border-b z-[100] transition-colors duration-300 " +
        (colorMode
          ? "bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.6)]"
          : "bg-white/90 border-gray-200 shadow-sm")
      }
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 h-16 items-center w-full">
          {/* Left Logo */}
          <div className="flex justify-start">
            <div className="flex items-center gap-2">
              <div
                className={
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300 " +
                  (colorMode ? "bg-violet-500/15" : "bg-violet-100")
                }
              >
                <NotebookText
                  className={colorMode ? "text-violet-300" : "text-violet-600"}
                />
              </div>
              <span
                className={
                  "hidden sm:inline text-lg font-semibold transition-colors duration-300 " +
                  (colorMode ? "text-slate-100" : "text-gray-800")
                }
              >
                {/* App Name yaha likh sakte ho */}
              </span>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex justify-center gap-6">
            <Link
              to="/"
              className={
                "text-center flex items-center px-3 py-1 text-sm sm:text-base rounded-md transition duration-200 ease-in-out " +
                (location.pathname === "/"
                  ? colorMode
                    ? "bg-violet-500/20 text-violet-200"
                    : "bg-violet-50 text-violet-700"
                  : colorMode
                  ? "text-slate-200 hover:text-violet-200 hover:bg-slate-800/70"
                  : "text-gray-700 hover:text-violet-700 hover:bg-violet-50")
              }
            >
              Home
            </Link>

            <Link
              to="/notes"
              className={
                "text-center px-3 py-1 text-sm sm:text-base rounded-md transition duration-200 ease-in-out " +
                (location.pathname === "/notes"
                  ? colorMode
                    ? "bg-violet-500/20 text-violet-200"
                    : "bg-violet-50 text-violet-700"
                  : colorMode
                  ? "text-slate-200 hover:text-violet-200 hover:bg-slate-800/70"
                  : "text-gray-700 hover:text-violet-700 hover:bg-violet-50")
              }
            >
              Notes
            </Link>

            <Link
              to="/about"
              className={
                "text-center px-3 py-1 text-sm sm:text-base rounded-md transition duration-200 ease-in-out " +
                (location.pathname === "/about"
                  ? colorMode
                    ? "bg-violet-500/20 text-violet-200"
                    : "bg-violet-50 text-violet-700"
                  : colorMode
                  ? "text-slate-200 hover:text-violet-200 hover:bg-slate-800/70"
                  : "text-gray-700 hover:text-violet-700 hover:bg-violet-50")
              }
            >
              About
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex justify-end items-center gap-3">
            {/* Notification */}
            <button
              type="button"
              className={
                "p-1 ml-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition " +
                (colorMode
                  ? "text-slate-300 hover:text-white focus:ring-offset-slate-900"
                  : "text-gray-500 hover:text-gray-700 focus:ring-offset-white")
              }
            >
              <Bell className="h-6 w-6 cursor-pointer" aria-hidden="true" />
            </button>

            {/* User Dropdown */}
            <div className="ml-3 relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                type="button"
                className={
                  "max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors " +
                  (colorMode
                    ? "bg-slate-800 focus:ring-offset-slate-900"
                    : "bg-gray-100 focus:ring-offset-white")
                }
              >
                <User
                  className={
                    "h-8 w-8 cursor-pointer rounded-full p-1 transition-colors " +
                    (colorMode
                      ? "text-violet-300 hover:bg-slate-700"
                      : "text-violet-600 hover:bg-gray-200")
                  }
                />
              </button>

              {open && (
                <div
                  className={
                    "absolute right-0 mt-2 w-52 rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden z-[500] origin-top animate-slide-down backdrop-blur-sm transition-colors duration-200 " +
                    (colorMode
                      ? "bg-slate-900 text-slate-100"
                      : "bg-white text-gray-800")
                  }
                >
                  {/* Profile */}
                  <div
                    onClick={() => {
                      setprofileisOpen(true);
                      setOpen(false);
                    }}
                    className={
                      "flex items-center cursor-pointer space-x-3 px-4 py-2.5 text-sm transition duration-150 " +
                      (colorMode ? "hover:bg-slate-800" : "hover:bg-gray-50")
                    }
                  >
                    <User className="w-4 h-4 " />
                    <span className="font-medium">Profile</span>
                  </div>

                  {/* Settings */}
                  <div
                    onClick={() => {
                      setsettingIsOpen(true);
                      setOpen(false);
                    }}
                    className={
                      "flex items-center cursor-pointer space-x-3 px-4 py-2.5 text-sm transition duration-150 " +
                      (colorMode ? "hover:bg-slate-800" : "hover:bg-gray-50")
                    }
                  >
                    <Settings className="w-4 h-4 " />
                    <span className="font-medium">Settings</span>
                  </div>

                  {/* Divider + Logout */}
                  <div
                    className={
                      "border-t " +
                      (colorMode ? "border-slate-800" : "border-gray-100")
                    }
                  ></div>

                  <p
                    onClick={logout}
                    className={
                      "flex cursor-pointer items-center space-x-3 px-4 py-2.5 text-sm transition duration-150 " +
                      (colorMode
                        ? "text-red-400 hover:bg-red-500/10"
                        : "text-red-600 hover:bg-red-50")
                    }
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </p>

                  <div
                    className={
                      "border-t " +
                      (colorMode ? "border-slate-800" : "border-gray-100")
                    }
                  ></div>

                  {/* Dark / Light Mode Slider */}
                  <div
                    onClick={toggleDarkMode}
                    className={
                      "flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors duration-300 ease-in-out " +
                      (colorMode ? "hover:bg-slate-800" : "hover:bg-gray-50")
                    }
                  >
                    <span className="font-medium">
                      {colorMode ? "Dark Mode" : "Light Mode"}
                    </span>

                    <div
                      className={
                        "w-11 h-6 rounded-full flex items-center px-1 transition-all duration-300 ease-in-out " +
                        (colorMode ? "bg-blue-700" : "bg-gray-300")
                      }
                    >
                      <div
                        className={
                          "bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out " +
                          (colorMode ? "translate-x-5" : "translate-x-0")
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {!isAuth ? (
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={goToLogin}
                  className={
                    "text-sm sm:text-base font-semibold px-4 sm:px-5 py-1.5 rounded-md border transition cursor-pointer " +
                    (colorMode
                      ? "border-violet-500 text-violet-200 hover:bg-violet-500/10"
                      : "border-violet-600 text-violet-700 hover:bg-violet-50")
                  }
                >
                  Login
                </button>

                <button
                  onClick={goToSign}
                  className={
                    "text-sm sm:text-base font-semibold px-4 sm:px-5 py-1.5 rounded-md border transition cursor-pointer " +
                    (colorMode
                      ? "border-violet-500 bg-violet-600 text-white hover:bg-violet-500"
                      : "border-violet-600 bg-violet-600 text-white hover:bg-violet-700")
                  }
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
