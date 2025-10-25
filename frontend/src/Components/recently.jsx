import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteCard from "./NoteCard";

const RecentNotes = () => {
  const context = useContext(NoteContext);
  const {
    notes,
    fetchallnotes,
    fetchRecentAddedNotes,
    recentNote,
    setrecentNote,
  } = context;

  useEffect(() => {
    fetchRecentAddedNotes();
  }, []); 

  return (
    <div className="items-center p-6  h-[90vh] max-h-[88vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-white/10 bg-white/10 rounded-2xl border border-gray-700 shadow-lg ">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Your 5 Recently Added Notes
      </h2>
      <div className="flex flex-col-reverse gap-5">
        {Array.isArray(recentNote) && recentNote.length > 0 ? (
          recentNote.map((note) => (
            <div
              key={note._id}
              className="py-1 px-3 max-h-30 overflow-hidden bg-white/5 border border-gray-600 rounded-lg"
            >
              <div className="flex gap-2 items-center">
                <h3 className="text-lg font-semibold text-purple-300">
                  {note.title}
                </h3>
                <button
                  onClick={() => onView(note._id)}
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
              </div>
              <p className="text-gray-300 text-sm max-h-10 overflow-hidden">
                {note.description}
              </p>
              <span className="px-3 py-1 text-xs text-teal-300 bg-gray-700 rounded-full">
                {note.tag}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-5">No notes available</p>
        )}
      </div>
    </div>
  );
};

export default RecentNotes;
