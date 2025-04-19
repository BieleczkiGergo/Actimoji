import React, { useState, useContext } from "react";
import "./App.css";
import Modal from "@mui/material/Modal";
import { Snackbar, Alert } from "@mui/material";
import LoginModal from "./components/Login/LoginModal";
import SignUpModal from "./components/SignUp/SignUpModal";
import MakeSuggestion from "./components/MakeSuggestion/MakeSuggestion";
import ListWords from "./components/ListWords/ListWords";
import BecomeMod from "./components/ModRequest/BecomeMod";
import { useAuth } from "./components/Context/AuthContext";
import { Game } from "./components/game/game.jsx";
import { findRandomGame, GameCtx } from "./components/Context/gameCtx.jsx";

function App() {
  const { token, logout, user } = useAuth();
  const isMod = user?.roles?.includes("ROLE_MODERATOR");

  const [activeModal, setActiveModal] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openModAlert, setOpenModAlert] = useState(false);
  const [openBecomeModAlert, setOpenBecomeModAlert] = useState(false);
  const [openModAlreadyAlert, setOpenModAlreadyAlert] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [hasRequestedMod, setHasRequestedMod] = useState(false);
  const [nickname, setNickname] = useState("");

  const game = useContext(GameCtx);

  const handleSuggestionClick = () => {
    if (token) setActiveModal("suggestion");
    else {
      setAlertMessage("Please log in to make a suggestion.");
      setOpenAlert(true);
    }
  };

  const handleReadSuggestionClick = () => {
    if (isMod) window.open("/readsuggestion", "_blank");
    else setOpenModAlert(true);
  };

  const handleModRequestClick = () => {
    if (isMod) window.open("/mod/requests", "_blank");
    else setOpenModAlert(true);
  };

  const handleBecomeModClick = () => {
    if (hasRequestedMod) {
      setSnackbarMessage("You have already submitted your request to become a mod.");
      setOpenSnackbar(true);
    } else if (isMod) {
      setOpenModAlreadyAlert(true);
    } else if (token) {
      setActiveModal("becomeMod");
    } else {
      setOpenBecomeModAlert(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleJoinRandomGame = async () => {
    const rid = await findRandomGame();
    game.joinGame(rid, nickname);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="profile">
          <div className="name">{user?.sub || "Guest"}</div>
          <div className="avatar">👤</div>
        </div>

        <button className="sidebarButton" onClick={handleSuggestionClick}>Make suggestion</button>
        <button className="sidebarButton" onClick={handleReadSuggestionClick}>Read suggestions</button>
        <button className="sidebarButton" onClick={handleModRequestClick}>View Mod Requests</button>
        <button className="sidebarButton" onClick={handleBecomeModClick}>Become Mod</button>

        {token ? (
          <button className="sidebarButton" onClick={logout}>Logout</button>
        ) : (
          <>
            <button className="sidebarButton" onClick={() => setActiveModal("login")}>Login</button>
            <button className="sidebarButton" onClick={() => setActiveModal("signup")}>Sign Up</button>
          </>
        )}
      </div>

      <div className="main">
        {game.inGame ? (
          <Game />
        ) : (
          <>
            <input
              className="input"
              type="text"
              placeholder="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button className="button" onClick={handleJoinRandomGame}>Play</button>
            <button className="joinButton" onClick={() => game.joinGame(1, nickname)}>Join Party 🎉</button>
          </>
        )}
      </div>

      <Modal open={activeModal === "login"} onClose={() => setActiveModal(null)}>
        <div className="loginParent">
          <LoginModal
            handleClose={() => setActiveModal(null)}
            handleOpenSignUp={() => setActiveModal("signup")}
          />
        </div>
      </Modal>

      <Modal open={activeModal === "signup"} onClose={() => setActiveModal(null)}>
        <div className="loginParent">
          <SignUpModal handleClose={() => setActiveModal(null)} />
        </div>
      </Modal>

      <Modal open={activeModal === "suggestion"} onClose={() => setActiveModal(null)}>
        <div className="loginParent">
          <MakeSuggestion />
        </div>
      </Modal>

      <Modal open={activeModal === "becomeMod"} onClose={() => setActiveModal(null)}>
        <div className="loginParent">
          <BecomeMod
            onRequestSubmitted={() => {
              setHasRequestedMod(true);
              setActiveModal(null);
            }}
          />
        </div>
      </Modal>

      <ListWords open={false} onClose={() => {}} />

      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)} message={alertMessage} />
      <Snackbar open={openModAlert} autoHideDuration={6000} onClose={() => setOpenModAlert(false)} message="You must be a mod to view suggestions." />
      <Snackbar open={openBecomeModAlert} autoHideDuration={6000} onClose={() => setOpenBecomeModAlert(false)} message="You must be logged in to access Become Mod." />
      <Snackbar open={openModAlreadyAlert} autoHideDuration={6000} onClose={() => setOpenModAlreadyAlert(false)} message="You are already a mod!" />

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
