import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const NoteCard = ({ note, onView }) => {
  const context = useContext(NoteContext);
  const { deleteNote, editNote, colorMode } = context;

  const { _id, title, description, tag, createdAt } = note;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      id="notecard"
      className={
        "rounded-xl p-6 w-sm transition duration-300 border shadow-xl hover:shadow-2xl hover:shadow-gray-300/50 " +
        (colorMode
          ? "bg-slate-900 border-slate-800 hover:shadow-slate-900/70"
          : "bg-white border-gray-200 hover:shadow-gray-300/50")
      }
    >
      <h3
        className={
          "text-2xl font-bold mb-2 truncate transition-colors duration-200 " +
          (colorMode ? "text-slate-100" : "text-gray-900")
        }
      >
        {title}
      </h3>

      <div>
        <p
          className={
            "mb-4 text-sm line-clamp-3 h-10 transition-colors duration-200 " +
            (colorMode ? "text-slate-300" : "text-gray-700")
          }
        >
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={
              "px-3 py-1 text-xs font-semibold rounded-full " +
              (colorMode
                ? "text-violet-200 bg-violet-500/10 border border-violet-500/40"
                : "text-violet-700 bg-violet-100")
            }
          >
            {tag}
          </span>
        </div>

        <hr
          className={
            "mb-4 transition-colors duration-200 " +
            (colorMode ? "border-slate-700" : "border-gray-200")
          }
        />

        <div className="flex justify-between items-center">
          <span
            className={
              "text-xs font-medium transition-colors duration-200 " +
              (colorMode ? "text-slate-500" : "text-gray-500")
            }
          >
            {formattedDate}
          </span>

          <div className="flex space-x-2">
            {/* View */}
            <button
              onClick={() => onView && onView(_id)}
              className={
                "cursor-pointer p-2 text-sm font-medium transition duration-150 " +
                (colorMode
                  ? "text-sky-300 hover:text-sky-200"
                  : "text-sky-600 hover:text-sky-700")
              }
              title="View Details"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>

            {/* Edit */}
            <button
              onClick={() => editNote(_id)}
              className={
                "cursor-pointer p-2 text-sm font-medium transition duration-150 " +
                (colorMode
                  ? "text-amber-300 hover:text-amber-200"
                  : "text-amber-600 hover:text-amber-700")
              }
              title="Edit Note"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>

            {/* Delete */}
            <button
              onClick={() => deleteNote(_id)}
              className={
                "cursor-pointer p-2 text-sm font-medium transition duration-150 " +
                (colorMode
                  ? "text-red-400 hover:text-red-300"
                  : "text-red-600 hover:text-red-700")
              }
              title="Delete Note"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
