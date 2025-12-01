import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteCard from "./NoteCard";
import { useNavigate } from "react-router-dom";

function Notes() {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchallnotes, colorMode } = context;


  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetchallnotes();
    } else {
      navigate("/login");
    }
  }, [fetchallnotes, navigate]);

  return (
    <div
      className={
        "h-screen pt-20 w-full overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent transition-colors duration-300 " +
        (colorMode ? "bg-slate-950" : "bg-gray-100")
      }
    >
      <div
        className={
          "flex flex-row flex-wrap gap-5 items-start justify-center min-h-screen px-4 pb-10 transition-colors duration-300 " +
          (colorMode ? "text-slate-100" : "text-gray-900")
        }
      >
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => <NoteCard key={note._id} note={note} />)
        ) : (
          <p
            className={
              "text-sm mt-10 transition-colors duration-300 " +
              (colorMode ? "text-slate-500" : "text-gray-500")
            }
          >
            No notes yet 📭
          </p>
        )}
      </div>
    </div>
  );
}

export default Notes;
