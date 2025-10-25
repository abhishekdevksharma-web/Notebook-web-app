import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./add";
import RecentNotes from "./recently";

const Home = () => {
  const { isAuth, setnoteLenght } = useContext(NoteContext);

  useEffect(() => {
    // if (isAuth) {
    //   setnoteLenght(localStorage.getItem("User").totalNotes);
    // }
    console.log("hello");
    
  }, []);

  return (
    <div className="bg-gradient-to-b h-[100vh] pt-15 bg-gray-900 to-black text-white">
      <div className="flex flex-col md:flex-row justify-between gap-6 p-5 w-full h-full">
        <div className="md:w-1/1 w-full ">
          <AddNote />
        </div>
        <div className="md:w-1/2">
          <RecentNotes />
        </div>
      </div>
    </div>
  );
};

export default Home;
