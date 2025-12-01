import React, { useContext, useState } from "react";
import NoteContext from "../../context/notes/noteContext";

const SettingsModal = () => {
  const context = useContext(NoteContext);
  const { settingIsOpen, setsettingIsOpen } = context;
  const [activeTab, setActiveTab] = useState("profile");
  const userInfo = JSON.parse(localStorage.getItem("User"));

  return (
    <>
      {/* Modal Overlay */}
      {settingIsOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-100"
          onClick={() => setsettingIsOpen(false)}
        >
          {/* Settings Modal Box */}
          <div
            className="bg-white text-gray-900 w-[90%] max-w-4xl h-[80vh] rounded-2xl shadow-2xl flex overflow-hidden relative border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setsettingIsOpen(false)}
              className="absolute hover:bg-gray-100 cursor-pointer p-2 rounded-lg top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            {/* Left Sidebar (Tabs) */}
            <div className="w-1/4 bg-gray-50 border-r border-gray-200 p-5 flex flex-col gap-3">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">
                Settings
              </h2>
              {[
                { id: "profile", name: "Profile" },
                { id: "appearance", name: "Appearance" },
                { id: "notifications", name: "Notifications" },
                { id: "security", name: "Security" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-3 py-2 rounded-lg transition cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-violet-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Right Content Pane */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === "profile" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    Profile Settings
                  </h3>

                  {/* Current Email Block */}
                  <div className="space-y-1 max-w-lg">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-violet-600">
                      CURRENT ACCOUNT EMAIL
                    </label>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-5 h-5 text-violet-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.974 8.974 0 01-1.255 1.255"
                          ></path>
                        </svg>

                        <span className="text-base font-medium text-gray-900 truncate">
                          {userInfo?.email || "Not available"}
                        </span>
                      </div>

                      <span className="px-2 py-0.5 text-xs font-medium bg-violet-100 text-violet-700 rounded-full hidden sm:block">
                        Primary
                      </span>
                    </div>
                  </div>

                  {/* Change Info */}
                  <div className="mt-8 mb-4">
                    <div className="flex items-center">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-600">
                        Change Information
                      </h3>
                      <div className="flex-grow h-px ml-3 bg-gray-200"></div>
                    </div>

                    <div className="flex flex-col gap-3 max-w-md mt-10">
                      <label className="text-gray-700 text-sm">Name</label>
                      <input
                        type="text"
                        placeholder="Your Name (Optional)"
                        className="bg-white border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-[#7e22ce] focus:ring-2 focus:ring-violet-200"
                      />

                      <label className="text-gray-700 text-sm mt-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="bg-white border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-[#7e22ce] focus:ring-2 focus:ring-violet-200"
                      />

                      <button className="mt-4 bg-violet-600 py-2 rounded-lg font-medium text-white hover:bg-violet-700 transition">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "appearance" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    Appearance
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Customize the look and feel of your workspace.
                  </p>
                  <div className="flex gap-3">
                    <button className="bg-violet-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-700 transition">
                      Light Mode
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
                      Dark Mode
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    Notifications
                  </h3>
                  <label className="flex items-center gap-3 text-gray-800">
                    <input
                      type="checkbox"
                      className="accent-[#7e22ce] w-4 h-4"
                    />
                    <span>Email Notifications</span>
                  </label>
                  <label className="flex items-center gap-3 mt-3 text-gray-800">
                    <input
                      type="checkbox"
                      className="accent-[#7e22ce] w-4 h-4"
                    />
                    <span>Push Alerts</span>
                  </label>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    Security Settings
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Manage your password and account safety.
                  </p>
                  <button className="bg-violet-600 px-4 py-2 rounded-lg font-medium text-white hover:bg-violet-700 transition">
                    Change Password
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsModal;
