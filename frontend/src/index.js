import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ReviewProvider } from "./components/review";
import { AuthProvider } from "./components/Context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReadSuggestion from "./components/ReadSuggestion/ReadSuggestion";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* 🔹 Tokenkezelés és autentikáció */}
      <ReviewProvider> {/* 🔹 Megmaradt az értékelési provider */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/readsuggestion" element={<ReadSuggestion />} />
          </Routes>
        </BrowserRouter>
      </ReviewProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
