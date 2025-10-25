// HardCodedNotesDark.jsx
import React, { useState } from "react";

export default function HardCodedNotesDark() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Arrays in C",
      description:
        "Short intro to arrays, indexing, and common pitfalls. This note explains how arrays are stored in memory Short intro to arrays, indexing, and common pitfalls. This note explains how arrays are stored in memory...",
      tags: ["C", "Arrays", "Revision"],
      date: "24-10-2025",
    },
    {
      id: 2,
      title: "Functions in C",
      description:
        "Functions are reusable blocks of code. They can take parameters and return values...",
      tags: ["C", "Functions"],
      date: "23-10-2025",
    },
    {
      id: 3,
      title: "Pointers",
      description:
        "Pointers hold memory addresses of variables. Understanding them is key for dynamic memory management...",
      tags: ["C", "Pointers"],
      date: "22-10-2025",
    },
  ]);

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className=" bg-gray-900 ">
      <div className="flex gap-4 flex-wrap h-15 w-sm">
        {notes.map((note) => (
          <article
            key={note.id}
            className="max-w-md w-full bg-gray-800 rounded-2xl shadow-md p-4 ring-1 ring-gray-700 text-gray-100"
          >
            {/* Header */}
            <header className="mb-3">
              <h3 className="text-lg font-semibold truncate">{note.title}</h3>
              <p className="mt-1 text-sm h-15 overflow-clip text-gray-300 line-clamp-3">
                {note.description}
              </p>
            </header>
            <div className="flex ">
              <div className="md:w-1/1">
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 mb-4">
                    {note.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full border border-gray-600 text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="md:w-1/2"> 
                  <div className="flex gap-10 mt-3 mb-4">
                    <button
                      onClick={() => onView(_id)}
                      // Tailwind style: Sky color for visibility/action
                      className=" cursor-pointer  text-sm font-medium text-sky-400 hover:text-sky-300 transition duration-150"
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
                      className=" cursor-pointer   text-sm font-medium text-amber-400 hover:text-amber-300 transition duration-150"
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
                      className="cursor-pointer   text-sm font-medium text-red-500 hover:text-red-400 transition duration-150"
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
          </article>
        ))}
      </div>
    </div>
  );
}
