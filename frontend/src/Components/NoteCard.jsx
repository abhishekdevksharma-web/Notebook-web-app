import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const NoteCard = ({ note }) => {
  const context = useContext(NoteContext);
  const { deleteNote, editNote } = context;
  const { _id, title, description, tag, createdAt } = note;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      id="notecard"
      className="bg-gray-900 shadow-xl rounded-xl p-6 border border-gray-700 w-sm   transition duration-300 hover:shadow-2xl hover:shadow-gray-800/50"
    >
      <h3 className="text-2xl font-bold text-gray-50 mb-2 truncate">{title}</h3>
      <div>
      <p className="text-gray-300 mb-4 text-sm line-clamp-3 h-10">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 text-xs font-semibold text-teal-300 bg-gray-700 rounded-full">
          {tag}
        </span>
      </div>
      <hr className="mb-4 border-gray-700" />
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400 font-medium">
          {formattedDate}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => onView(_id)}
            // Tailwind style: Sky color for visibility/action
            className=" cursor-pointer p-2 text-sm font-medium text-sky-400 hover:text-sky-300 transition duration-150"
            title="View Details"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => {
              editNote(note._id);
            }}
            className=" cursor-pointer p-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition duration-150"
            title="Edit Note"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => {
              deleteNote(note._id);
            }}
            className="cursor-pointer p-2 text-sm font-medium text-red-500 hover:text-red-400 transition duration-150"
            title="Delete Note"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
