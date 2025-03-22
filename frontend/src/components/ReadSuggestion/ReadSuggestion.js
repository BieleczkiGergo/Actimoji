import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReadSuggestion.module.css";
import axios from 'axios';

function ReadSuggestion() {
  const navigate = useNavigate();
  
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/review")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Hiba történt az adatok lekérésekor:", error);
      });
  }, []);

  function approveSuggestion(operation) {

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

        {/* Map-eljük ki a review-kat */}
      </div>
      <div className={styles.review}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.suggestionId} className={styles.reviewItem}>
                <p className={styles.p}><strong>Old word:</strong> {review.old_word}</p>
                <p className={styles.p}><strong>New word:</strong> {review.new_word}</p>
                <p className={styles.p}><strong>Operation:</strong> {review.operation}</p>
                <p className={styles.p}><strong>Reason:</strong> {review.reason}</p>
                <p>✔️ ❌</p>
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
