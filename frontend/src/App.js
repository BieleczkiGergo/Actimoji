import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Modal from "@mui/material/Modal";
import { Snackbar } from "@mui/material";
import LoginModal from "./components/Login/LoginModal";
import SignUpModal from "./components/SignUp/SignUpModal";
import MakeSuggestion from "./components/MakeSuggestion/MakeSuggestion";
import ListWords from "./components/ListWords/ListWords";
import BecomeMod from "./components/ModRequest/BecomeMod";
import { useAuth } from "./components/Context/AuthContext";
import EmojiKeyboard from "./components/Keyboard/EmojiKeyboard";

function App() {
  const { token, logout, user } = useAuth();

  const [nickname, setNickname] = useState("");
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const inputRef = useRef(null);
  const emojiKeyboardRef = useRef(null); // Hozzáadjuk a billentyűzet ref-jét

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [openWordsModal, setOpenWordsModal] = useState(false);
  const [openBecomeMod, setOpenBecomeMod] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openModAlert, setOpenModAlert] = useState(false);
  const [openBecomeModAlert, setOpenBecomeModAlert] = useState(false);
  const [openModAlreadyAlert, setOpenModAlreadyAlert] = useState(false); // New state for "Already a mod" alert

  const isMod = user?.roles?.includes("ROLE_MODERATOR");

  const handleEmojiSelect = (emoji) => {
    const input = inputRef.current;
    if (input) {
      // Get the current text and append the emoji
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const newValue = nickname.slice(0, start) + emoji + nickname.slice(end);
      setNickname(newValue);

      // After emoji is added, place the cursor at the end of the new emoji
      setTimeout(() => {
        input.setSelectionRange(start + emoji.length, start + emoji.length);
        input.focus();
      }, 0);
    }
  };

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
      window.open("/mod/requests", "_blank");
    } else {
      setOpenModAlert(true);
    }
  };

  const handleBecomeModClick = () => {
    if (isMod) {
      // If user is already a moderator, show an alert instead of opening the modal
      setOpenModAlreadyAlert(true);
    } else if (token) {
      setOpenBecomeMod(true);
    } else {
      setOpenBecomeModAlert(true);
    }
  };

  // Hook for handling outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close emoji keyboard if clicked outside
      if (emojiKeyboardRef.current && !emojiKeyboardRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
        setShowEmojiKeyboard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <button className="sidebarButton" onClick={handleReadSuggestionClick}>
          Read suggestions
        </button>
        <button className="sidebarButton" onClick={handleModRequestClick}>
          View Mod Requests
        </button>
        <button className="sidebarButton" onClick={handleBecomeModClick}>
          Become Mod
        </button>

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

        <Modal open={openSuggestion} onClose={() => setOpenSuggestion(false)}>
          <div className="loginParent">
            <MakeSuggestion />
          </div>
        </Modal>

        <Modal open={openBecomeMod} onClose={() => setOpenBecomeMod(false)}>
          <div className="loginParent">
            <BecomeMod />
          </div>
        </Modal>
      </div>

      <div className="main">
        <input
          className="input"
          type="text"
          placeholder="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          ref={inputRef}
          onFocus={() => setShowEmojiKeyboard(true)}
          onBlur={() => {
            // Ne zárd be az emoji billentyűzetet, ha az inputra van fókuszálva
            if (!showEmojiKeyboard) setTimeout(() => setShowEmojiKeyboard(false), 200);
          }} 
        />

        {showEmojiKeyboard && (
          <div ref={emojiKeyboardRef}>
            <EmojiKeyboard onEmojiSelect={handleEmojiSelect} />
          </div>
        )}

        <button className="button">Play</button>
        <button className="joinButton">Join Party 🎉</button>
      </div>

      <ListWords open={openWordsModal} onClose={() => setOpenWordsModal(false)} />

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
        message={alertMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ backgroundColor: "#FF6B35", color: "#fff", fontWeight: "bold" }}
      />

      <Snackbar
        open={openModAlert}
        autoHideDuration={6000}
        onClose={() => setOpenModAlert(false)}
        message="You must be a mod to view suggestions."
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ backgroundColor: "#FF6B35", color: "#fff", fontWeight: "bold" }}
      />

      <Snackbar
        open={openBecomeModAlert}
        autoHideDuration={6000}
        onClose={() => setOpenBecomeModAlert(false)}
        message="You must be logged in to access Become Mod."
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ backgroundColor: "#FF6B35", color: "#fff", fontWeight: "bold" }}
      />

      {/* Snackbar for users who are already mods */}
      <Snackbar
        open={openModAlreadyAlert}
        autoHideDuration={6000}
        onClose={() => setOpenModAlreadyAlert(false)}
        message="You are already a mod!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ backgroundColor: "#FF6B35", color: "#fff", fontWeight: "bold" }}
      />
    </div>
  );
}

export default App;
