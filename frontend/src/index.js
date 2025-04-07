import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ReviewProvider } from './components/review';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ReadSuggestion from './components/ReadSuggestion/ReadSuggestion';
import { GameProvider } from './gameCtx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {  <Route path="/readsuggestion" element={<ReadSuggestion/>} />  }
        </Routes>
      </BrowserRouter>

    </GameProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
