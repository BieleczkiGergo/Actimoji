import React, { useState } from "react";
import "./App.css";
import Modal from "@mui/material/Modal";
import LoginModal from "./components/Login/LoginModal.js";
import SignUpModal from "./components/SignUp/SignUpModal.js";
import MakeSuggestion from "./components/MakeSuggestion/MakeSuggestion.js";
import ListWords from "./components/ListWords/ListWords.js";

function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const [openSignUp, setOpenSignUp] = useState(false);
  const handleOpenSignUp = () => {
    setOpenSignUp(true);
    setOpenLogin(false);
  };
  const handleCloseSignUp = () => setOpenSignUp(false);

  const [openSuggestion, setOpenSuggestion] = useState(false);
  const handleOpenSuggestion = () => setOpenSuggestion(true);
  const handleCloseSuggestion = () => setOpenSuggestion(false);

  const [openWordsModal, setOpenWordsModal] = useState(false);
  const handleOpenWords = () => setOpenWordsModal(true);
  const handleCloseWords = () => setOpenWordsModal(false);

  const handleGotoReadSuggestions = () => window.location.href = "/readsuggestions";

  return (
    <div className="container">
      <div className="sidebar">
        <div className="profile">
          <div className="name">Név</div>
          <div className="avatar">👤</div>
        </div>
        
        <button className="sidebarButton" onClick={handleOpenSuggestion}>
          Make suggestion
        </button>
        
        <button className="sidebarButton" onClick={() => window.open("/readsuggestion", "_blank")}>
          Read suggestions
        </button>
        
        <button className="sidebarButton" onClick={handleOpenWords}>
          List Words
        </button>
        
        <Modal open={openSuggestion} onClose={handleCloseSuggestion}>
          <div className="loginParent">
            <MakeSuggestion />
          </div>
        </Modal>

        <button className="sidebarButton">Become mod</button>
        <button className="sidebarButton" onClick={handleGotoReadSuggestions}>
          Read suggestions
        </button>
        <button className="sidebarButton" onClick={handleOpenLogin}>
          Login
        </button>
        
        <Modal open={openLogin} onClose={handleCloseLogin}>
          <div className="loginParent">
            <LoginModal handleClose={handleCloseLogin} handleOpenSignUp={handleOpenSignUp} />
          </div>
        </Modal>
        
        <Modal open={openSignUp} onClose={handleCloseSignUp}>
          <div className="loginParent">
            <SignUpModal handleClose={handleCloseSignUp} />
          </div>
        </Modal>
      </div>

      {/* Main Content */}
      <div className="main">
        <input className="input" type="text" placeholder="nickname" />
        <button className="button">Play</button>
        <button className="joinButton">Join Party 🎉</button>
      </div>

      {/* List Words Modal */}
      <ListWords open={openWordsModal} onClose={handleCloseWords} />
    </div>
  );
}

export default App;
