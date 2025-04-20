import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./components/Context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReadSuggestion from "./components/ReadSuggestion/ReadSuggestion";
import ModReview from "./components/ModRequests/ModRequests.js";
import { GameProvider } from "./components/Context/gameCtx.jsx";
import { EmojiProvider } from "./components/Context/emojiCtx.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ // tudom, ez csúnya, de ha nem tetszik rendezd el jobban
            <EmojiProvider><GameProvider>
              <App />
            </GameProvider></EmojiProvider>
          } />

          <Route path="/readsuggestion" element={<ReadSuggestion />} />

          <Route path="/mod/requests" element={<ModReview />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
