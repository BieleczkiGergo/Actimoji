import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReadSuggestion.module.css";
import { AuthContext } from "../Context/AuthContext";  // AuthContext importálása

function ReadSuggestion() {
  const navigate = useNavigate();
  const { user, backendApi } = useContext( AuthContext );  // A user adatokat lekérjük az AuthContext-ből
  const [userId, setUserId] = useState(1);
  const [reviews, setReviews] = useState([]);

  function loadData() {
    backendApi
      .get("/review")
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("An error occurred:", error));
  }

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    }
    loadData();
  }, [user]);

  function handleSuggestion(suggestionId, action) {
    backendApi
      .post(`/review/${action}/${suggestionId}?userId=${userId}`)
      .then(() => {
        setReviews((prev) => prev.filter((r) => r.suggestionId !== suggestionId));
      })
      .catch((error) => console.error(`Error ${action}ing suggestion:`, error));
  }

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
      <div className={styles.sidebar}>
        <div className={styles.sidebarFixed}>
          <div className={styles.sidebarProfile}>
            <div className={styles.profileName}>{user?.sub || "Guest"}</div>
            <div className={styles.profileAvatar}>👤</div>
          </div>
          <button className={styles.sidebarButton} onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.sidebarSpacer}></div>
        <div className={styles.reviewList}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.suggestionId} className={styles.reviewItem}>
                {review.operation !== 0 && (
                  <p className={styles.p}><strong>Old word:</strong> {review.old_word}</p>
                )}
                {review.old_icons && review.old_icons.trim() !== "" && (
                  <p className={styles.p}><strong>Old emojis:</strong> {review.old_icons}</p>
                )}
                {review.operation !== 2 && (
                  <p className={styles.p}><strong>New word:</strong> {review.new_word}</p>
                )}
                {review.new_icons && review.new_icons.trim() !== "" && (
                  <p className={styles.p}><strong>New emojis:</strong> {review.new_icons}</p>
                )}
                <p className={styles.p}><strong>Operation:</strong> {getOperationText(review.operation)}</p>
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
