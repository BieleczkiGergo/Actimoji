import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReadSuggestion.module.css";
import axios from 'axios';

function ReadSuggestion() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(1);
  const [reviews, setReviews] = useState([]);

  function loadData() {
    axios.get("http://localhost:8080/review")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("An error occured when getting the data: ", error);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  function approveSuggestion(suggestionId) {
    axios.post(`http://localhost:8080/review/accept/${suggestionId}?userId=${userId}`)
      .then(() => {
        alert(`Suggestion ${suggestionId} approved by user ${userId}!`);
        setReviews((prevReviews) => prevReviews.filter((r) => r.suggestionId !== suggestionId));
      })
      .catch((error) => {
        console.error(`An error occurred while accepting suggestion ${suggestionId}:`, error);
      });
  }
  
  function declineSuggestion(suggestionId) {
    axios.post(`http://localhost:8080/review/reject/${suggestionId}?userId=${userId}`)
      .then(() => {
        alert(`Suggestion ${suggestionId} rejected by user ${userId}!`);
        setReviews((prevReviews) => prevReviews.filter((r) => r.suggestionId !== suggestionId));
      })
      .catch((error) => {
        console.error(`An error occurred while rejecting suggestion ${suggestionId}:`, error);
      });
  }
  
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
      
      {/* Review lista */}
      <div className={styles.review}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.suggestionId} className={styles.reviewItem}>
              <p className={styles.p}><strong>Old word:</strong> {review.old_word}</p>
              <p className={styles.p}><strong>New word:</strong> {review.new_word}</p>
              <p className={styles.p}><strong>Operation:</strong> {review.operation}</p>
              <p className={styles.p}><strong>Reason:</strong> {review.reason}</p>
              
              <p onClick={() => approveSuggestion(review.suggestionId)}>✔️</p>
              <p onClick={() => declineSuggestion(review.suggestionId)}>❌</p>
              <hr />
            </div>
          ))
        ) : (
          <p>Nincsenek elérhető javaslatok.</p>
        )}
      </div>
    </div>
  );
}

export default ReadSuggestion;
