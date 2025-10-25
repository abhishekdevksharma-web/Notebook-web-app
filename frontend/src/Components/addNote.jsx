import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNoteItem() {
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = () => {
    addNote(note);  
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="min-h-screen flex items-center flex-col gap-10 justify-center bg-gray-900">
        <div className="w-80">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-white mb-2"
          >
            Title
          </label>

          <input
            id="title"
            type="text"
            name="title"
            placeholder="Type here..."
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 
                     text-white placeholder-gray-400 focus:outline-none 
                     focus:ring-2 focus:ring-[#7e22ce] transition"
            onChange={onChange}
          />
        </div>
        <div className="w-80">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-white mb-2"
          >
            Description
          </label>

          <input
            id="description"
            name="description"
            type="text"
            placeholder="Type here..."
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 
                     text-white placeholder-gray-400 focus:outline-none 
                     focus:ring-2 focus:ring-[#7e22ce] transition"
            onChange={onChange}
          />
        </div>
        <div className="w-80">
          <label
            htmlFor="tag"
            className="block text-sm font-medium text-white mb-2"
          >
            Tag
          </label>

          <input
            id="tag"
            name="tag"
            type="text"
            placeholder="Type here..."
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-600 
                     text-white placeholder-gray-400 focus:outline-none 
                     focus:ring-2 focus:ring-[#7e22ce] transition"
            onChange={onChange}
          />
          <div className="mt-6 w-80">
            <button
              type="submit"
              className="w-full cursor-pointer px-6 py-3 bg-[#7e22ce] text-white font-semibold rounded-lg
               hover:bg-[#6b21a8] active:bg-[#5b178a] focus:outline-none 
               focus:ring-2 focus:ring-[#7e22ce] transition-all duration-200"
              onClick={handleClick}
            >
              Add Not
            </button>j
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNoteItem;
