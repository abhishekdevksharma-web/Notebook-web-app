import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";

const RecentNotes = () => {
  const context = useContext(NoteContext);
  const { fetchRecentAddedNotes, recentNote, colorMode } = context;

  useEffect(() => {
    fetchRecentAddedNotes();
  }, [fetchRecentAddedNotes]);


  return (
    <div
      className={
        `h-full overflow-hidden rounded-2xl border shadow-lg transition-all duration-300 ` +
        (colorMode
          ? "border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950"
          : "border-violet-100 bg-white")
      }
    >
      {/* Header */}
      <div
        className={
          `flex items-center justify-between px-6 pt-5 pb-3 border-b transition-colors duration-300 ` +
          (colorMode
            ? "border-slate-800"
            : "border-violet-100")
        }
      >
        <div>
          <h2
            className={
              `text-xl font-semibold transition-colors duration-300 ` +
              (colorMode ? "text-slate-100" : "text-gray-900")
            }
          >
            Recently Added Notes
          </h2>
          <p
            className={
              `text-xs mt-1 transition-colors duration-300 ` +
              (colorMode ? "text-slate-400" : "text-gray-500")
            }
          >
            Last 5 notes you created
          </p>
        </div>

        <span
          className={
            `rounded-full text-xs font-medium px-3 py-1 transition-colors duration-300 ` +
            (colorMode
              ? "bg-slate-800 text-slate-100 border border-slate-700"
              : "bg-violet-100 text-violet-700")
          }
        >
          {Array.isArray(recentNote) ? recentNote.length : 0} Notes
        </span>
      </div>

      {/* Notes List */}
      <div className="h-full overflow-y-auto px-6 pb-25 pt-4 space-y-4 scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-transparent">
        {Array.isArray(recentNote) && recentNote.length > 0 ? (
          recentNote.map((note) => (
            <div
              key={note._id}
              className={
                `relative rounded-xl border p-4 shadow-sm hover:shadow-md transition-all duration-200 ` +
                (colorMode
                  ? "bg-slate-900 border-slate-700 hover:border-violet-500/60"
                  : "bg-white border-gray-200 hover:border-violet-200")
              }
            >
              {/* Accent line */}
              <div
                className={
                  `absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b ` +
                  (colorMode
                    ? "from-violet-400 to-sky-500"
                    : "from-violet-500 to-indigo-500")
                }
              ></div>

              <div className="pl-4">
                <div className="flex justify-between items-center gap-2">
                  <h3
                    className={
                      `text-lg font-semibold truncate transition-colors duration-300 ` +
                      (colorMode ? "text-violet-200" : "text-violet-700")
                    }
                  >
                    {note.title || "Untitled Note"}
                  </h3>

                  {note.tag && (
                    <span
                      className={
                        `text-xs px-3 py-1 rounded-full transition-colors duration-300 ` +
                        (colorMode
                          ? "bg-violet-500/10 text-violet-200 border border-violet-500/30"
                          : "bg-violet-100 text-violet-700")
                      }
                    >
                      {note.tag}
                    </span>
                  )}
                </div>

                <p
                  className={
                    `text-sm mt-2 line-clamp-2 transition-colors duration-300 ` +
                    (colorMode ? "text-slate-300" : "text-gray-700")
                  }
                >
                  {note.description || "No description available."}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span
                    className={
                      `text-xs transition-colors duration-300 ` +
                      (colorMode ? "text-slate-500" : "text-gray-400")
                    }
                  >
                    Recently added
                  </span>
                  <span
                    className={
                      `text-xs font-medium cursor-pointer hover:underline transition-colors duration-300 ` +
                      (colorMode ? "text-violet-300" : "text-violet-600")
                    }
                  >
                    View / Edit
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div
              className={
                `w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300 ` +
                (colorMode ? "bg-slate-800" : "bg-violet-100")
              }
            >
              <span className="text-xl">📝</span>
            </div>
            <p
              className={
                `text-sm font-semibold transition-colors duration-300 ` +
                (colorMode ? "text-slate-100" : "text-gray-800")
              }
            >
              No recent notes found
            </p>
            <p
              className={
                `text-xs mt-1 max-w-xs transition-colors duration-300 ` +
                (colorMode ? "text-slate-400" : "text-gray-500")
              }
            >
              Start adding notes and they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentNotes;
