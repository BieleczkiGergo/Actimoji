import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReadSuggestion.module.css";

function ReadSuggestion() {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <div className="name">Név</div>
          <div className="avatar">👤</div>
        </div>

        <button className="sidebarButton" onClick={() => navigate("/")}>
          Home
        </button>

        <button className="sidebarButton" onClick={() => navigate("/readsuggestion")}>
          Read suggestions
        </button>

        <button className="sidebarButton">List Words</button>

        <button className="sidebarButton">Become mod</button>

        <button className="sidebarButton">Login</button>
      </div>
    </div>
  );
}

export default ReadSuggestion;
