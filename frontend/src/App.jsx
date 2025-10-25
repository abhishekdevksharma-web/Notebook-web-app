import React, { useContext, useEffect } from "react";
import Home from "./Components/Home.jsx";
import noteContext from "./context/notes/noteContext";
import Navbar from "./Components/Navbar.jsx";
import About from "./Components/About.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import Contact from "./Components/Contact.jsx";
import Services from "./Components/Services.jsx";
import Notes from "./Components/Notes.jsx";
import Alert from "./Components/Alert.jsx";
import ProfileModal from "./Components/components/profileModal.jsx";
import SettingsModal from "./Components/components/settingModal.jsx";
import LoginPage from "./Components/Auth/Login.jsx";
import SignupPage from "./Components/Auth/Signup.jsx"; 

function App() {
  const context = useContext(noteContext);
  const { alert, setIsAuth } = context;

  let location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    setIsAuth(!!token);
  }, [location]);

  return (
    <div>
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          id={alert.id}
        />
      )}
      <Navbar />
      <ProfileModal />
      <SettingsModal />

      <Routes>
        (if (localStorage.getItem("auth-token")) {})? (
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> ):
      </Routes>
    </div>
  );
}

export default App;
