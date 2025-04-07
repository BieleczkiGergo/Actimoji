import React, { useContext, useState } from "react";
import "./App.css";
import Modal from "@mui/material/Modal";
import LoginModal from "./components/Login/LoginModal.js";
import SignUpModal from "./components/SignUp/SignUpModal.js";
import MakeSuggestion from "./components/MakeSuggestion/MakeSuggestion.js";
import { ReviewCtx } from "./components/review.js";
import { Game } from "./components/game/game.jsx";
import { GameCtx } from "./gameCtx.jsx";

function App() {

  // Itt lesznek a review-ek
  let reviews = useContext( ReviewCtx );

  let game = useContext( GameCtx );

  const [username, setUsername] = useState("");

  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const [openSignUp, setOpenSignUp] = React.useState(false);
  const handleOpenSignUp = () => {
    setOpenSignUp(true);
    setOpenLogin(false); // Bezárja a login modalt, ha szükséges
  };
  const handleCloseSignUp = () => setOpenSignUp(false);

  const [openSuggestion, setOpenSuggestion] = React.useState(false);
  const handleOpenSuggestion = () => setOpenSuggestion(true);
  const handleCloseSuggestion = () => setOpenSuggestion(false);

  const handleGotoReadSuggestions = () => window.location.href = "/readsuggestions";

  return (
    <div className="container">
      <div className="sidebar">
        <div className="profile">
          <div className="name">név</div>
          <div className="avatar">👤</div>
        </div>
        <button className="sidebarButton" onClick={handleOpenSuggestion}>
          Make suggestion
        </button>

        {/* ÚJ OLDAL MEGNYITÁSA ÚJ FÜLBEN */}
        <button 
          className="sidebarButton" 
          onClick={() => window.open("/readsuggestion", "_blank")}
        >
          Read suggestions
        </button>

        <button className="sidebarButton">
          List Words
        </button>

        <Modal open={openSuggestion} onClose={handleCloseSuggestion}>
          <div className="loginParent">
            <MakeSuggestion />

          </div>
        </Modal>
        <button className="sidebarButton">Become mod</button>

        <button className="sidebarButton" onClick={ handleGotoReadSuggestions }>Read suggestions</button>
        <button className="sidebarButton" onClick={handleOpenLogin}>
          Login
        </button>

        {/* Login Modal */}
        <Modal open={openLogin} onClose={handleCloseLogin}>
          <div className="loginParent">
            <LoginModal handleClose={handleCloseLogin} handleOpenSignUp={handleOpenSignUp} />

          </div>
        </Modal>

        {/* Sign Up Modal */}
        <Modal open={openSignUp} onClose={handleCloseSignUp}>
          <div className="loginParent">
            <SignUpModal handleClose={handleCloseSignUp} />

          </div>
        </Modal>
      </div>

      {/* Main Content */}
      <div className="main">
        <input className="input" type="text" placeholder="nickname" onChange={(e) => setUsername(e.target.value)}/>
        <button className="button">Play</button>
        <button className="joinButton" onClick={ () => game.joinGame(1, username) }>
          Join Party &nbsp;<span role="img" aria-label="party">🎉</span>
        </button>

        <Game />
      </div>
    </div>
  );
}

export default App;
