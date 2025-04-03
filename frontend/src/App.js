import React, { useState, useEffect } from "react";
import "./App.css";
import Modal from "@mui/material/Modal";
import LoginModal from "./components/Login/LoginModal.js";
import SignUpModal from "./components/SignUp/SignUpModal.js";
import MakeSuggestion from "./components/MakeSuggestion/MakeSuggestion.js";
import ListWords from "./components/ListWords/ListWords.js";
import BecomeMod from "./components/ModRequest/BecomeMod.js";
import { useAuth } from "./components/Context/AuthContext";
import { Snackbar } from "@mui/material"; // Modern popup használata

function App() {
  const { token, logout, user } = useAuth(); // Token és logout funkció beállítása
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [openWordsModal, setOpenWordsModal] = useState(false);
  const [openBecomeMod, setOpenBecomeMod] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openModAlert, setOpenModAlert] = useState(false);
  const [openBecomeModAlert, setOpenBecomeModAlert] = useState(false); // Become mod alert

  const isMod = user?.role === "mod"; // Check if user is a mod

  // Javaslat megnyitása
  const handleSuggestionClick = () => {
    if (token) {
      setOpenSuggestion(true);
    } else {
      setAlertMessage("Please log in to make a suggestion.");
      setOpenAlert(true); // Nyisd meg az alertet
    }
  };

  // Read suggestion click - Check if user is mod
  const handleReadSuggestionClick = () => {
    if (isMod) {
      window.open("/readsuggestion", "_blank");
    } else {
      setOpenModAlert(true); // Nyisd meg a mod alertet
    }
  };

  // Become mod click - Check if user is mod
  const handleBecomeModClick = () => {
    if (isMod) {
      setOpenBecomeMod(true); // Nyisd meg a Become Mod modal-t
    } else {
      setOpenBecomeModAlert(true); // Nyisd meg a become mod alertet
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false); // Alert bezárása
  };

  const handleCloseModAlert = () => {
    setOpenModAlert(false); // Mod alert bezárása
  };

  const handleCloseBecomeModAlert = () => {
    setOpenBecomeModAlert(false); // Become Mod alert bezárása
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="profile">
          <div className="name">{user?.name || "Guest"}</div> {/* User name display */}
          <div className="avatar">👤</div>
        </div>

        <button className="sidebarButton" onClick={handleSuggestionClick}>
          Make suggestion
        </button>

        <button
          className="sidebarButton"
          onClick={handleReadSuggestionClick} // Handle Read Suggestion
        >
          Read suggestions
        </button>

        <Modal open={openSuggestion} onClose={() => setOpenSuggestion(false)}>
          <div className="loginParent">
            <MakeSuggestion />
          </div>
        </Modal>

        <button className="sidebarButton" onClick={handleBecomeModClick}>
          Become Mod
        </button>

        <Modal open={openBecomeMod} onClose={() => setOpenBecomeMod(false)}>
          <div className="loginParent">
            <BecomeMod />
          </div>
        </Modal>

        {token ? (
          <button className="sidebarButton" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <button className="sidebarButton" onClick={() => setOpenLogin(true)}>
              Login
            </button>
            <button className="sidebarButton" onClick={() => setOpenSignUp(true)}>
              Sign Up
            </button>
          </>
        )}

        <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
          <div className="loginParent">
            <LoginModal handleClose={() => setOpenLogin(false)} />
          </div>
        </Modal>

        <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
          <div className="loginParent">
            <SignUpModal handleClose={() => setOpenSignUp(false)} />
          </div>
        </Modal>
      </div>

      <div className="main">
        <input className="input" type="text" placeholder="nickname" />
        <button className="button">Play</button>
        <button className="joinButton">Join Party 🎉</button>
      </div>

      <ListWords open={openWordsModal} onClose={() => setOpenWordsModal(false)} />

      {/* Snackbar for login alert */}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message={alertMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          backgroundColor: "#FF6B35",
          color: "#fff",
          fontWeight: "bold",
        }}
      />

      {/* Snackbar for mod alert */}
      <Snackbar
        open={openModAlert}
        autoHideDuration={6000}
        onClose={handleCloseModAlert}
        message="You must be a mod to view suggestions."
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          backgroundColor: "#FF6B35",
          color: "#fff",
          fontWeight: "bold",
        }}
      />

      {/* Snackbar for become mod alert */}
      <Snackbar
        open={openBecomeModAlert}
        autoHideDuration={6000}
        onClose={handleCloseBecomeModAlert}
        message="You must be a mod to access Become Mod."
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          backgroundColor: "#FF6B35",
          color: "#fff",
          fontWeight: "bold",
        }}
      />
    </div>
  );
}

export default App;
