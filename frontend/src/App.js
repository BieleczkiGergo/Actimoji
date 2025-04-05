import React, { useState } from "react";
import "./App.css";
import Modal from "@mui/material/Modal";
import LoginModal from "./components/Login/LoginModal";
import SignUpModal from "./components/SignUp/SignUpModal";
import MakeSuggestion from "./components/MakeSuggestion/MakeSuggestion";
import ListWords from "./components/ListWords/ListWords";
import BecomeMod from "./components/ModRequest/BecomeMod";
import { useAuth } from "./components/Context/AuthContext";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function App() {
  const { token, logout, user } = useAuth();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [openWordsModal, setOpenWordsModal] = useState(false);
  const [openBecomeMod, setOpenBecomeMod] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openModAlert, setOpenModAlert] = useState(false);
  const [openBecomeModAlert, setOpenBecomeModAlert] = useState(false);

  const isMod = user?.roles?.includes("ROLE_MODERATOR");

  const handleSuggestionClick = () => {
    if (token) {
      setOpenSuggestion(true);
    } else {
      setAlertMessage("Please log in to make a suggestion.");
      setOpenAlert(true);
    }
  };

  const handleReadSuggestionClick = () => {
    if (isMod) {
      window.open("/readsuggestion", "_blank");
    } else {
      setOpenModAlert(true);
    }
  };

  const handleModRequestClick = () => {
    if (isMod) {
      window.open("/mod/requests", "_blank"); // Új gomb, ami elvezet a mod requestekhez
    } else {
      setOpenModAlert(true);
    }
  };

  const handleBecomeModClick = () => {
    if (token) {
      setOpenBecomeMod(true);
    } else {
      setOpenBecomeModAlert(true);
    }
  };

  const handleCloseAlert = () => setOpenAlert(false);
  const handleCloseModAlert = () => setOpenModAlert(false);
  const handleCloseBecomeModAlert = () => setOpenBecomeModAlert(false);

  return (
    <div className="container">
      <div className="sidebar">
        <div className="profile">
          <div className="name">{user?.userName || "Guest"}</div>
          <div className="avatar">👤</div>
        </div>

        <button className="sidebarButton" onClick={handleSuggestionClick}>
          Make suggestion
        </button>

        <Modal open={openSuggestion} onClose={() => setOpenSuggestion(false)}>
          <div className="loginParent">
            <MakeSuggestion />
          </div>
        </Modal>

        {/* Megmarad a "Read suggestions" gomb */}
        <button className="sidebarButton" onClick={handleReadSuggestionClick}>
          Read suggestions
        </button>

        {/* Új gomb a mod requestekhez */}
        <button className="sidebarButton" onClick={handleModRequestClick}>
          View Mod Requests
        </button>

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

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message={alertMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ backgroundColor: "#FF6B35", color: "#fff", fontWeight: "bold" }}
      />

      <Snackbar
        open={openModAlert}
        autoHideDuration={6000}
        onClose={handleCloseModAlert}
        message="You must be a mod to view suggestions."
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ backgroundColor: "#FF6B35", color: "#fff", fontWeight: "bold" }}
      />

      <Snackbar
        open={openBecomeModAlert}
        autoHideDuration={6000}
        onClose={handleCloseBecomeModAlert}
        message="You must be logged in to access Become Mod."
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ backgroundColor: "#FF6B35", color: "#fff", fontWeight: "bold" }}
      />
    </div>
  );
}

export default App;
