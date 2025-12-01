import { useContext, useState } from "react";

import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "General",
  });

  const [tags] = useState(["General", "Work", "Study", "Personal"]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addNote(note);
  };
  const handleTagClick = (selectedTag) => {
    setNote({ ...note, tag: selectedTag });
  };
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-gray-700 shadow-lg w-full z-10">
      <h2 className="text-2xl text-center p-3 font-semiboldrounde text-white mb-4 border-b-2 border-solid border-gray-700">
        Add a New Note
      </h2>
      <div className="p-10 pt-2">
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 bg-[#121212] border border-gray-500 rounded-lg text-white focus:outline-none focus:border-purple-400"
            required
          />
          <textarea
            name="description"
            value={note.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full h-50 p-3 bg-transparent border border-gray-500 rounded-lg text-white focus:outline-none focus:border-purple-400"
            required
          ></textarea>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Choose Tag
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  onClick={() => handleTagClick(t)}
                  className={`cursor-pointer select-none px-4 py-1 rounded-full text-sm font-medium border transition-all ${
                    note.tag === t
                      ? "bg-purple-700   text-white border-purple-700 shadow-md shadow-purple-800"
                      : "bg-[#242424] text-blue-300 border border-purple-900 hover:bg-[#2d2d2d]"
                  }`}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Or Create Custom Tag
            </label>
            <input
              type="text"
              name="tag"
              value={note.tag}
              onChange={handleChange}
              placeholder="Type custom tag..."
              className="w-full bg-[#121212] text-gray-200 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-700 rounded-xl p-3 outline-none transition"
            />
          </div>
          <div className="w-full text-center">
            <button
              type="submit"
              className="  cursor-pointer bg-blue-700 hover:bg-purple-800 transition-all py-2 rounded-lg text-white font-semibold w-100"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
