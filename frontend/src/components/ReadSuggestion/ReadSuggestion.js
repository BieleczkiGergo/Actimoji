import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./ReadSuggestion.module.css";
import axios from "axios";
import Modal from "@mui/material/Modal";
import LoginModal from "../Login/LoginModal.js";
import SignUpModal from "../SignUp/SignUpModal.js";
import MakeSuggestion from "../MakeSuggestion/MakeSuggestion.js";
import BecomeMod from "../ModRequest/BecomeMod.js";

function ReadSuggestion() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(1);
  const [reviews, setReviews] = useState([]);

  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const [openSignUp, setOpenSignUp] = useState(false);
  const handleOpenSignUp = () => {
    setOpenSignUp(true);
    setOpenLogin(false);
  };
  const handleCloseSignUp = () => setOpenSignUp(false);

  const [openSuggestion, setOpenSuggestion] = useState(false);
  const handleOpenSuggestion = () => setOpenSuggestion(true);
  const handleCloseSuggestion = () => setOpenSuggestion(false);

  const [openBecomeMod, setOpenBecomeMod] = useState(false);
  const handleOpenBecomeMod = () => setOpenBecomeMod(true);
  const handleCloseBecomeMod = () => setOpenBecomeMod(false);

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

        <button className="sidebarButton" onClick={handleOpenSuggestion}>
          Make suggestion
        </button>

        <button className="sidebarButton" onClick={() => navigate("/readsuggestion")}>
          Read suggestions
        </button>

        <button className="sidebarButton" onClick={handleOpenBecomeMod}>
          Become mod
        </button>

        <button className="sidebarButton" onClick={handleOpenLogin}>
          Login
        </button>

        {/* Modalok */}
        <Modal open={openSuggestion} onClose={handleCloseSuggestion}>
          <div className="loginParent">
            <MakeSuggestion />
          </div>
        </Modal>

        <Modal open={openBecomeMod} onClose={handleCloseBecomeMod}>
          <div className="loginParent">
            <BecomeMod />
          </div>
        </Modal>

        <Modal open={openLogin} onClose={handleCloseLogin}>
          <div className="loginParent">
            <LoginModal handleClose={handleCloseLogin} handleOpenSignUp={handleOpenSignUp} />
          </div>
        </Modal>

        <Modal open={openSignUp} onClose={handleCloseSignUp}>
          <div className="loginParent">
            <SignUpModal handleClose={handleCloseSignUp} />
          </div>
        </Modal>
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
  );
}

export default ReadSuggestion;
