// ../Avatar.jsx
import React from "react";

const Avatar = ({ char }) => {
  return (
    <div
      className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold 
                 bg-purple-600 text-white border-4 border-purple-400 ring-2 ring-offset-2 ring-offset-gray-800 ring-purple-600 shadow-lg"
    >
      {char}
    </div>
  );
};

export default Avatar;
