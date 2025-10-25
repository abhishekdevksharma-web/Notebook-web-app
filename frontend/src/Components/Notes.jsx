import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useEffect } from "react";
import NoteCard from "./NoteCard";
import { useNavigate } from "react-router-dom";

function Notes() {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchallnotes } = context;
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetchallnotes();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-screen pt-20 bg-gray-900 w-[90whh] overflow-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent ">
      <div className="flex flex-row flex-wrap gap-5 items-center justify-center h-screen ">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => <NoteCard key={note._id} note={note} />)
        ) : (
          <p className="text-gray-400 text-sm">No notes yet</p>
        )}
      </div>
    </div>
  );
}

export default Notes;
