import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ReviewProvider } from './components/review';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReviewProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={ <App /> }/>
          <Route path="/readsuggestions" element={<h2>Read suggestions</h2>} />
        </Routes>
      </BrowserRouter>

    </ReviewProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
