import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./add";
import RecentNotes from "./recently";

const Home = () => {
  const { isAuth, setnoteLenght, colorMode } = useContext(NoteContext);

  useEffect(() => {
    // if (isAuth) {
    //   setnoteLenght(localStorage.getItem("User").totalNotes);
    // }
  }, []);

  return (
    <div
      className={`${
        !colorMode ? "bg-gray-300" : "bg-black"
      } h-[100vh] pt-15`}
    >
      <div className="flex flex-col md:flex-row justify-between gap-6 p-5 w-full h-full">
        {/* Left - Add Note */}
        <div className="md:w-1/1 w-full">
          <AddNote />
        </div>

        {/* Right - Recent Notes */}
        <div className="md:w-1/2 w-full">
          <RecentNotes />
        </div>
      </div>
    </div>
  );
};

export default Home;
