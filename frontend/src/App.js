import React from "react";
import "./App.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LoginModal from "./components/Login/LoginModal.js";
import MakeSuggestion from "./components/MakeSuggestion/MakeSuggestion.js";

function App() {
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const [openSuggestion, setOpenSuggestion] = React.useState(false);
  const handleOpenSuggestion = () => setOpenSuggestion(true);
  const handleCloseSuggestion = () => setOpenSuggestion(false);

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="profile">
          <div className="name">név</div>
          <div className="avatar">👤</div>
        </div>
        <button className="sidebarButton" onClick={handleOpenSuggestion}>Make suggestion</button>
          <Modal
            open={openSuggestion}
            onClose={handleCloseSuggestion}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={boxStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                
               <MakeSuggestion/>

              </Typography>
            </Box>
          </Modal>
        <button className="sidebarButton">Become mod</button>
        <button className="sidebarButton">Read suggestions</button>
        <button className="sidebarButton" onClick={handleOpenLogin}>Login</button>
          <Modal
            open={openLogin}
            onClose={handleCloseLogin}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={boxStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                
              <LoginModal></LoginModal> {/* KOMPONENS */}
              
              </Typography>
            </Box>
          </Modal>
      </div>

      {/* Main Content */}
      <div className="main">
        <input className="input" type="text" placeholder="nickname" />
        <button className="button">Play</button>
        <button className="joinButton">
          Join Party &nbsp;<span role="img" aria-label="party">🎉</span>
        </button>
      </div>
    </div>
  );
}

export default App;