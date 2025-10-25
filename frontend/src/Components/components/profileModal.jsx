import React, { useContext, useState, useEffect, useId } from "react";
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
  const { profileisOpen, setprofileisOpen, noteLenght,setnoteLenght, setIsAuth, isAuth } =
    useContext(NoteContext);

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
    bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-purple-500/30
    transition-all duration-300 ease-out
    ${isTransitioning ? "scale-100 opacity-100" : "scale-90 opacity-0"}
  `;

  if (!profileisOpen && !isTransitioning) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 transition-opacity duration-300"
        onClick={closeModal}
      >
        <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
          {/* Header and Close Button */}
          <div className="p-5 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <UserCircleIcon className="w-7 h-7 mr-2 text-purple-400" />
              User Profile
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Profile Body */}
          {isLoding ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-12 h-12 border-4 border-t-purple-700 border-purple-300 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Photo/Avatar and Name */}
              <div className="flex flex-col items-center">
                <Avatar char={getAvatarChar(userData.username)} />

                <h3 className="mt-4 text-3xl font-extrabold text-white">
                  {userData.username}
                </h3>
                <p className="text-sm text-purple-400 mt-1">{userData.email}</p>

                {!isAuth ? (
                  <p className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm max-w-xs mx-auto mt-4 text-center shadow-sm">
                    Please login to see profile
                  </p>
                ) : null}
              </div>

              {/* Stats Section (Total Notes) */}
              <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                <ClipboardListIcon className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <p className="text-xl font-bold text-white">{noteLenght}</p>
                <p className="text-sm text-gray-400">Total Notes Created</p>
              </div>

              {/* Other Info */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-1 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 mr-2 text-blue-400" />
                  Account Details
                </h4>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Member Since:</span>
                  <span className="font-medium text-white">
                    {userData.date}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Account Status:</span>
                  <span className="font-medium text-green-400">Active</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer / Action */}
          <div className="p-5 border-t border-gray-700 text-right">
            <button
              onClick={closeModal}
              className="px-5 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
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
