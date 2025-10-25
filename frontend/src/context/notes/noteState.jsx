import { useEffect, useState } from "react";
import NoteContext from "./noteContext";
import Alert from "../../Components/Alert";
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const notesInitial = [];
  // states
  const [notes, setNotes] = useState(notesInitial);
  const [alert, setAlert] = useState(null);
  const [open, setOpen] = useState(false);
  const [recentNote, setrecentNote] = useState([]);

  // this state is for profile modal
  const [profileisOpen, setprofileisOpen] = useState(false);

  // this state is for setting modal
  const [settingIsOpen, setsettingIsOpen] = useState(false);

  //user authenticated
  const [isAuth, setIsAuth] = useState(false);

  //Modal loding state
  const [isLoding, setIsLoding] = useState(true);

  //this state for length of note
  const [noteLenght, setNoteLenght] = useState(0);

  const openProfile = () => {
    setprofileisOpen(true);
    if (localStorage.getItem("User")) {
      setIsLoding(false);
    } else {
      setTimeout(() => {
        setIsLoding(false);
        setIsAuth(false);
      }, 3000);
    }
  };

  const navigate = useNavigate();
  let host = "http://localhost:3000";

  // fetch all notes
  const fetchallnotes = async () => {
    const responce = await fetch(`${host}/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await responce.json();
    setNotes(json);
    console.log(json);

    notesInitial.push(json);
  };

  const fetchRecentAddedNotes = async () => {
    const responce = await fetch(`${host}/note/fetchRecentAddedNotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await responce.json();
    setrecentNote(json);
  };

  const showAlert = () => {
    setAlert({});
  };

  // add note
  const addNote = async ({ title, description, tag }) => {
    const auth = localStorage.getItem("auth-token");
    if (!auth) {
      setAlert({
        type: "error",
        title: "error",
        message: "Please Login First to Save Note",
        id: Date.now(),
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    const responce = await fetch(`${host}/note/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const data = await responce.json();
    const dbData = data[1].note;
    const { _id, user, ...recentDatauser } = dbData;
    setrecentNote((prev) => [...prev, recentDatauser]);
    setNoteLenght(noteLenght + 1);
    setNotes((prevNotes) => [...prevNotes, data[1].note]);

    setAlert({
      type: `${data[0].type}`,
      title: `${data[0].type}`,
      message: `${data[0].Success}`,
      id: Date.now(),
    });
  };

  // delte note
  const deleteNote = async (id) => {
    const responce = await fetch(`${host}/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const data = await responce.json();

    const newNote = notes.filter((e) => {
      return e._id !== id;
    });

    setNotes(newNote);

    setAlert({
      type: `${data.type}`,
      title: `${data.type}`,
      message: `${data.Success}`,
      id,
    });
  };

  // edit note
  const editNote = async () => {
    const responce = await fetch(`${host}/note/updatenote/${id}`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(data),
    });

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  //signup route: user register
  const signup = async (userData) => {
    try {
      const response = await fetch(`${host}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error:", data.message || "Something went wrong");
        return;
      }
      console.log("Signup successful:", data);
      return true;
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const login = async (userData) => {
    try {
      const response = await fetch(`${host}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error:", data.message || "Something went wrong");
        return;
      }
      return data;
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        alert,
        addNote,
        deleteNote,
        editNote,
        open,
        setOpen,
        fetchallnotes,
        profileisOpen,
        setprofileisOpen,
        settingIsOpen,
        setsettingIsOpen,
        signup,
        login,
        isAuth,
        setIsAuth,
        fetchRecentAddedNotes,
        recentNote,
        setrecentNote,
        openProfile,
        isLoding,
        setIsLoding,
        noteLenght,
        setNoteLenght,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
