import { useContext, useState } from "react";
import { Bot } from "lucide-react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const {
    addNote,
    GenerateDesByChatbot,
    isChatbotResponding,
    setisChatbotResponding,
    colorMode, // 👈 yaha se aa raha hai
  } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "General",
  });

  const [tags] = useState(["General", "Work", "Study", "Personal"]);

  const handleChange = (e) => {
    const lenght = e.target.value.length;
    setNote({ ...note, [e.target.name]: e.target.value });
    setisChatbotResponding({ desWord: lenght });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addNote(note);
  };

  const handleTagClick = (selectedTag) => {
    setNote({ ...note, tag: selectedTag });
  };

  const GenerateFun = async () => {
    try {
      setisChatbotResponding({ aiResponding: true, desWord: 0 });

      const BotDes = await GenerateDesByChatbot(note.title);
      setNote((prev) => ({ ...prev, description: BotDes }));
    } catch (err) {
      console.error(err);
    } finally {
      setisChatbotResponding(false);
    }
  };

  return (
    <div
      className={
        "backdrop-blur-sm rounded-2xl border shadow-md w-full z-10 transition-colors duration-300 " +
        (colorMode
          ? "bg-slate-900/95 border-slate-800"
          : "bg-white/90 border-gray-200")
      }
    >
      {/* Header */}
      <div
        className={
          "border-b mb-4 grid grid-cols-[70%_30%] transition-colors duration-300 " +
          (colorMode ? "border-slate-800" : "border-gray-200")
        }
      >
        <div>
          <h2
            className={
              "text-2xl text-center p-3 font-semibold transition-colors duration-300 " +
              (colorMode ? "text-slate-100" : "text-gray-900")
            }
          >
            Add a New Note
          </h2>
        </div>

        <div className="place-self-center">
          <button
            type="button"
            disabled={isChatbotResponding.desWord === 0}
            onClick={GenerateFun}
            className={
              `group relative overflow-hidden flex items-center justify-center font-medium text-white transition-all duration-300 ease-in-out ` +
              (isChatbotResponding.aiResponding
                ? "w-12 h-12 rounded-full bg-violet-600 cursor-wait"
                : "w-32 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-indigo-700 hover:to-violet-700 cursor-pointer shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed")
            }
          >
            {/* Normal text + icon */}
            <span
              className={
                `flex items-center gap-2 text-sm transition-opacity duration-150 ` +
                (isChatbotResponding.aiResponding ? "opacity-0" : "opacity-100")
              }
            >
              Generate
              <Bot className="transition-transform duration-300 group-hover:scale-110" />
            </span>

            {/* Loader when loading */}
            {isChatbotResponding.aiResponding && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="p-10 pt-2">
        <form onSubmit={handleAdd} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Title"
            className={
              "w-full p-3 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-colors duration-300 " +
              (colorMode
                ? "bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500"
                : "bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400")
            }
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={note.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className={
              "w-full h-50 p-3 rounded-lg border border-dashed focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-colors duration-300 " +
              (colorMode
                ? "bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
                : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400")
            }
            required
          ></textarea>

          {/* Tags */}
          <div>
            <label
              className={
                "block text-sm font-medium mb-2 transition-colors duration-300 " +
                (colorMode ? "text-slate-200" : "text-gray-700")
              }
            >
              Choose Tag
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  onClick={() => handleTagClick(t)}
                  className={
                    "cursor-pointer select-none px-4 py-1 rounded-full text-sm font-medium border transition-all " +
                    (note.tag === t
                      ? "bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-300"
                      : colorMode
                      ? "bg-slate-800 text-slate-100 border-slate-600 hover:bg-slate-700"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200")
                  }
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Custom Tag */}
          <div>
            <label
              className={
                "block text-sm font-medium mb-1 transition-colors duration-300 " +
                (colorMode ? "text-slate-200" : "text-gray-700")
              }
            >
              Or Create Custom Tag
            </label>
            <input
              type="text"
              name="tag"
              value={note.tag}
              onChange={handleChange}
              placeholder="Type custom tag..."
              className={
                "w-full rounded-xl p-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 " +
                (colorMode
                  ? "bg-slate-900 text-slate-100 border border-slate-700 placeholder:text-slate-500"
                  : "bg-white text-gray-900 border border-gray-300 placeholder:text-gray-400")
              }
            />
          </div>

          {/* Submit */}
          <div className="w-full text-center">
            <button
              type="submit"
              className={
                "cursor-pointer py-2 rounded-lg font-semibold w-full shadow-sm transition-all " +
                (colorMode
                  ? "bg-violet-600 hover:bg-violet-500 text-white"
                  : "bg-violet-600 hover:bg-violet-700 text-white")
              }
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
