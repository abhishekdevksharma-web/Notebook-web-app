import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/noteContext";

export default function Alert({
  type = "info",
  title,
  message,
  duration = 2000,
  id,
}) {
  const context = useContext(NoteContext);
  const { open, setOpen } = context;
  const [currentMessage, setCurrentMessage] = useState(null);

  useEffect(() => {
    if (message) {
      setOpen(true);
      const timer = setTimeout(() => setOpen(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, id]);
  const colors = {
    success:
      "bg-green-50 border-green-400 text-green-800 dark:bg-green-900/30 dark:border-green-500 dark:text-green-200",
    error:
      "bg-red-50 border-red-400 text-red-800 dark:bg-red-900/30 dark:border-red-500 dark:text-red-200",
    warning:
      "bg-amber-50 border-amber-400 text-amber-800 dark:bg-amber-900/30 dark:border-amber-500 dark:text-amber-200",
    info: "bg-purple-50 border-purple-400 text-purple-900 dark:bg-purple-900/30 dark:border-purple-500 dark:text-purple-200",
  };

  return (
    <>
      {open &&
        message && ( // only render if message exists
          <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-80 p-4 rounded-full border shadow-lg ${colors[type]} animate-growFromCircle`}
          >
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">
                {title && <p className="font-semibold">{title}</p>}
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {message}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>
        )}

      <style>{`
  @keyframes growFromCircle {
    0% {
      transform: translate(-50%, 50%) scale(0);
      opacity: 0;
      border-radius: 50%;
    }
    60% {
      transform: translate(-50%, -10%) scale(1.05);
      opacity: 1;
      border-radius: 1.5rem;
    }
    100% {
      transform: translate(-50%, 0%) scale(1);
      opacity: 1;
      border-radius: 1rem;
    }
  }
  .animate-growFromCircle {
    animation: growFromCircle 0.7s ease-out forwards;
  }
  `}</style>
    </>
  );
}
