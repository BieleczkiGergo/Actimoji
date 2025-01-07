import React from "react";
import "./App.css"; // Import the CSS file for styles

function App() {
  return (
    <div className="container">
      <div className="sidebar">
        <div className="profile">
          <div className="name">név</div>
          <div className="avatar">👤</div>
        </div>
        <button className="sidebarButton">Make suggestion</button>
        <button className="sidebarButton">Become mod</button>
        <button className="sidebarButton">Read suggestions</button>
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
