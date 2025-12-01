import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../../context/notes/noteContext";
import {
  UserCircleIcon,
  ClipboardListIcon,
  InformationCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import Avatar from "../Avatar";

// Dummy data for demonstration
let userData = {
  username: "User",
  email: "user@example.com",
  date: "January 15, 2023",
  totalNotes: 999,
};

const getAvatarChar = (name) => {
  return name ? name.charAt(0).toUpperCase() : "U";
};

const ProfileModal = () => {
  const {
    profileisOpen,
    setprofileisOpen,
    noteLenght,
    setnoteLenght,
    setIsAuth,
    isAuth,
  } = useContext(NoteContext);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoding, setIsLoding] = useState(true);

  useEffect(() => {
    if (profileisOpen) {
      const localStorageData = JSON.parse(localStorage.getItem("User"));
      if (localStorageData) {
        userData.username = localStorageData.username;
        userData.email = localStorageData.email;
        userData.date = localStorageData.date;
        userData.totalNotes = localStorageData.totalNotes;
        setIsLoding(false);
      } else {
        setTimeout(() => {
          setIsLoding(false);
          setIsAuth(false);
        }, 2000);
      }
    }
  }, [profileisOpen]);

  const closeModal = () => {
    setIsTransitioning(false);
    setTimeout(() => setprofileisOpen(false), 300);
  };

  useEffect(() => {
    if (profileisOpen) {
      setTimeout(() => setIsTransitioning(true), 10);

      const handleEscape = (e) => {
        if (e.key === "Escape") closeModal();
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [profileisOpen, setprofileisOpen]);

  const modalClasses = `
    bg-white rounded-xl shadow-2xl w-full max-w-md border border-violet-200
    transition-all duration-300 ease-out z-50
    ${isTransitioning ? "scale-100 opacity-100" : "scale-90 opacity-0"}
  `;

  if (!profileisOpen && !isTransitioning) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 transition-opacity duration-300"
        onClick={closeModal}
      >
        <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
          {/* Header and Close Button */}
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <UserCircleIcon className="w-7 h-7 mr-2 text-violet-600" />
              User Profile
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Profile Body */}
          {isLoding ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-12 h-12 border-4 border-t-violet-600 border-violet-200 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Photo/Avatar and Name */}
              <div className="flex flex-col items-center">
                {/* <Avatar char={getAvatarChar(userData.username)} /> */}

                <h3 className="mt-4 text-3xl font-extrabold text-gray-900">
                  {userData.username}
                </h3>
                <p className="text-sm text-violet-600 mt-1">
                  {userData.email}
                </p>

                {!isAuth ? (
                  <p className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md text-sm max-w-xs mx-auto mt-4 text-center shadow-sm">
                    Please login to see profile
                  </p>
                ) : null}
              </div>

              {/* Stats Section (Total Notes) */}
              <div className="bg-violet-50 p-4 rounded-lg text-center border border-violet-100">
                <ClipboardListIcon className="w-8 h-8 text-violet-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-gray-900">
                  {noteLenght}
                </p>
                <p className="text-sm text-gray-500">Total Notes Created</p>
              </div>

              {/* Other Info */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 mr-2 text-blue-500" />
                  Account Details
                </h4>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Member Since:</span>
                  <span className="font-medium text-gray-900">
                    {userData.date}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Account Status:</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer / Action */}
          <div className="p-5 border-t border-gray-200 text-right">
            <button
              onClick={closeModal}
              className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
