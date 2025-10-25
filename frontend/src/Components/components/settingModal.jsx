import React, { useContext, useState } from "react";
import NoteContext from "../../context/notes/noteContext";

const SettingsModal = () => {
  const context = useContext(NoteContext);
  const { settingIsOpen, setsettingIsOpen ,userInfo } = context;
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      {/* Modal Overlay */}
      {settingIsOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setsettingIsOpen(false)}
        >
          {/* Settings Modal Box */}
          <div
            className="bg-gray-900 text-white w-[90%] max-w-4xl h-[80vh] rounded-2xl shadow-2xl flex overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setsettingIsOpen(false)}
              className="absolute hover:bg-white/10 cursor-pointer p-2 rounded-lg top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            {/* Left Sidebar (Tabs) */}
            <div className="w-1/4 bg-gray-800 border-r border-gray-700 p-5 flex flex-col gap-3">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              {[
                { id: "profile", name: "Profile" },
                { id: "appearance", name: "Appearance" },
                { id: "notifications", name: "Notifications" },
                { id: "security", name: "Security" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-3 py-2 rounded-lg transition ${
                    activeTab === tab.id
                      ? "bg-blue-700 text-white"
                      : "text-gray-400 hover:bg-gray-700"
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
                  <h3 className="text-xl font-semibold mb-4">
                    Profile Settings
                  </h3>
                  <div class="space-y-1 max-w-lg">
                    <label class="block text-xs font-semibold uppercase tracking-wider text-indigo-400">
                      CURRENT ACCOUNT EMAIL
                    </label>

                    <div class="flex items-center justify-between p-3 bg-gray-800 rounded-lg shadow-inner">
                      <div class="flex items-center space-x-2">
                        <svg
                          class="w-5 h-5 text-indigo-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.974 8.974 0 01-1.255 1.255"
                          ></path>
                        </svg>

                        <span class="text-base font-medium text-gray-100 truncate">
                          {userInfo.email}
                        </span>
                      </div>

                      <span class="px-2 py-0.5 text-xs font-medium bg-indigo-900/50 text-indigo-300 rounded-full hidden sm:block">
                        Primary
                      </span>
                    </div>
                  </div>
                  <div class="mt-8 mb-4">
                    <div class="flex items-center">
                      <h3 class="text-sm font-semibold uppercase tracking-wider text-indigo-400">
                        Change Information
                      </h3>
                      <div class="flex-grow h-px ml-3 bg-gray-700"></div>
                    </div>
                    <div className="flex flex-col gap-3 max-w-md mt-10">
                      <label className="text-gray-300 text-sm">Name </label>
                      <input
                        type="text"
                        placeholder="Your Name (Optional)"
                        className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#7e22ce]"
                      />
                      <label className="text-gray-300 text-sm mt-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#7e22ce]"
                      />
                      <button className="mt-4 bg-blue-700 py-2 rounded-lg font-medium hover:bg-[#6b21c2] transition">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "appearance" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Appearance</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Customize the look and feel of your workspace.
                  </p>
                  <div className="flex gap-3">
                    <button className="bg-blue-700 px-4 py-2 rounded-lg font-medium">
                      Dark Mode
                    </button>
                    <button className="bg-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-600">
                      Light Mode
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Notifications</h3>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="accent-[#7e22ce] w-4 h-4"
                    />
                    <span>Email Notifications</span>
                  </label>
                  <label className="flex items-center gap-3 mt-3">
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
                  <h3 className="text-xl font-semibold mb-4">
                    Security Settings
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Manage your password and account safety.
                  </p>
                  <button className="bg-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-[#6b21c2] transition">
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
