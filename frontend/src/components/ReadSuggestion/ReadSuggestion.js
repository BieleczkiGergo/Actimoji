import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReadSuggestion.module.css";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";  // Importáljuk az AuthContext-et

function ReadSuggestion() {
  const navigate = useNavigate();
  const { user } = useAuth();  // A user adatokat lekérjük az AuthContext-ből
  const [userId, setUserId] = useState(1);
  const [reviews, setReviews] = useState([]);

  function loadData() {
    axios
      .get("http://localhost:8080/review")
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("An error occurred:", error));
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleSuggestion(suggestionId, action) {
    axios
      .post(`http://localhost:8080/review/${action}/${suggestionId}?userId=${userId}`)
      .then(() => {
        alert(`Suggestion ${suggestionId} ${action}ed by user ${userId}!`);
        setReviews((prev) => prev.filter((r) => r.suggestionId !== suggestionId));
      })
      .catch((error) => console.error(`Error ${action}ing suggestion:`, error));
  }

  // A `review.operation` alapján a megfelelő szöveg visszaadása
  function getOperationText(operation) {
    switch (operation) {
      case 0:
        return "Create";
      case 1:
        return "Modify";
      case 2:
        return "Delete";
      default:
        return "Unknown";
    }
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarProfile}>
            {/* Felhasználó neve dinamikusan */}
            <div className={styles.profileName}>{user?.sub || "Guest"}</div> {/* Ha nincs bejelentkezve, akkor "Guest" */}
            <div className={styles.profileAvatar}>👤</div>
          </div>
        </div>
        <button className={styles.sidebarButton} onClick={() => navigate("/")}>
          Home
        </button>
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        <div className={styles.reviewList}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.suggestionId} className={styles.reviewItem}>
                <p className={styles.p}><strong>Old word:</strong> {review.old_word}</p>
                <p className={styles.p}><strong>New word:</strong> {review.new_word}</p>
                <p className={styles.p}><strong>Operation:</strong> {getOperationText(review.operation)}</p> {/* Operáció szöveg */}
                <p className={styles.p}><strong>Reason:</strong> {review.reason}</p>

                <div className={styles.buttonContainer}>
                  <button className={styles.approveBtn} onClick={() => handleSuggestion(review.suggestionId, "accept")}>
                    ✔️ Approve
                  </button>
                  <button className={styles.rejectBtn} onClick={() => handleSuggestion(review.suggestionId, "reject")}>
                    ❌ Reject
                  </button>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <div className={styles.noSuggestion}>
              <h1>There are no available suggestions</h1>
              <p>In order to access this, you need to be a mod</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReadSuggestion;
