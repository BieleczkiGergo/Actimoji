import React, { useState, useRef, useEffect, useContext } from "react";
import "./App.css";
import Modal from "@mui/material/Modal";
import { Snackbar, Alert } from "@mui/material";
import LoginModal from "./components/Login/LoginModal";
import SignUpModal from "./components/SignUp/SignUpModal";
import MakeSuggestion from "./components/MakeSuggestion/MakeSuggestion";
import ListWords from "./components/ListWords/ListWords";
import BecomeMod from "./components/ModRequest/BecomeMod";
import { useAuth } from "./components/Context/AuthContext";
import EmojiKeyboard from "./components/Keyboard/EmojiKeyboard";
import { useNavigate } from "react-router-dom";
import { Game } from "./components/game/game.jsx";
import { findRandomGame, GameCtx } from "./gameCtx.jsx";

function App() {
  const { token, logout, user } = useAuth();
  const isMod = user?.roles?.includes("ROLE_MODERATOR");

  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const inputRef = useRef(null);
  const emojiKeyboardRef = useRef(null);
  
  const [activeModal, setActiveModal] = useState(null); // Centralized modal state
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openModAlert, setOpenModAlert] = useState(false);
  const [openBecomeModAlert, setOpenBecomeModAlert] = useState(false);
  const [openModAlreadyAlert, setOpenModAlreadyAlert] = useState(false);
  
  const game = useContext( GameCtx );
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState( 0 ); // Garantálom hogy előjön majd valahol

  // Snackbar for Become Mod request status
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Track if Become Mod request has been submitted
  const [hasRequestedMod, setHasRequestedMod] = useState(false);

  const handleEmojiSelect = (emoji) => {
    const input = inputRef.current;
    if (input) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const newValue = nickname.slice(0, start) + emoji + nickname.slice(end);
      setNickname(newValue);
      setTimeout(() => {
        input.setSelectionRange(start + emoji.length, start + emoji.length);
        input.focus();
      }, 0);
    }
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiKeyboardRef.current &&
        !emojiKeyboardRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)

      ) {
        setShowEmojiKeyboard(false);

      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);

  };

  const handleJoinRandomGame = async () => {
    const rid = await findRandomGame();
    setRoomId( rid );
    game.joinGame( rid, nickname );

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
        {
          game.inGame ? ( <Game /> ) : (<>
            <input
              className="input"
              type="text"
              placeholder="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              ref={inputRef}
              onFocus={() => setShowEmojiKeyboard(true)}
            />
            {showEmojiKeyboard && (
              <div ref={emojiKeyboardRef}>
                <EmojiKeyboard onEmojiSelect={handleEmojiSelect} />

              </div>
            )}
            <button 
              className="button"
              onClick={ handleJoinRandomGame }
            >
              Play</button>
            <button className="joinButton" onClick={ () => game.joinGame(1, nickname) }>Join Party 🎉</button>

          </>)
        }
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
              setHasRequestedMod(true); // Set flag after successful request
              setActiveModal(null); // Close modal
            }} 
          />
        </div>
      </Modal>

      <ListWords open={false} onClose={() => {}} />

      {/* Snackbars */}
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)} message={alertMessage} />
      <Snackbar open={openModAlert} autoHideDuration={6000} onClose={() => setOpenModAlert(false)} message="You must be a mod to view suggestions." />
      <Snackbar open={openBecomeModAlert} autoHideDuration={6000} onClose={() => setOpenBecomeModAlert(false)} message="You must be logged in to access Become Mod." />
      <Snackbar open={openModAlreadyAlert} autoHideDuration={6000} onClose={() => setOpenModAlreadyAlert(false)} message="You are already a mod!" />
      
      {/* Snackbar for Become Mod submission status */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );


}

export default App;
