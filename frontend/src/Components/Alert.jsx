import React, { useContext, useEffect } from "react";
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

  useEffect(() => {
    if (message) {
      setOpen(true);
      const timer = setTimeout(() => setOpen(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, id]);

  const colors = {
    success:
      "bg-green-100 border-green-400 text-green-800",
    error:
      "bg-red-100 border-red-400 text-red-800",
    warning:
      "bg-amber-100 border-amber-400 text-amber-800",
    info:
      "bg-violet-100 border-violet-400 text-violet-900",
  };

  return (
    <>
      {open &&
        message && (
          <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-80 p-4 rounded-full border shadow-lg ${colors[type]} animate-growFromCircle`}
          >
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">
                {title && <p className="font-semibold">{title}</p>}
                <p className="mt-1 text-gray-700">
                  {message}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600"
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
