import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import './ModRequest.css';

const ModReview = () => {
  const { token, user } = useAuth();
  const [modRequests, setModRequests] = useState([]);

  useEffect(() => {
    if (!user?.roles?.includes("ROLE_MODERATOR")) {
      return;
    }

    fetchModRequests();
  }, [token, user]);

  const fetchModRequests = () => {
    axios
      .get("http://localhost:8080/mod/review", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setModRequests(response.data))
      .catch((error) => {
        console.error("Error loading mod requests:", error);
      });
  };

  const handleDecision = (requestId, action) => {
    const url = `http://localhost:8080/mod/review/${action}/${requestId}`;
    const payload = {
      id: requestId,
      moderatorId: user?.userId,
    };

    axios
      .post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchModRequests(); // Frissítés döntés után
      })
      .catch((error) => {
        console.error(`Error on ${action}:`, error);
      });
  };

  return (
    <div className="modReviewContainer">
      <h1>Mod Requests</h1>
      <table className="modRequestTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Reason</th>
            <th>Requested By</th>
            <th>Approved</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {modRequests.length > 0 ? (
            modRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.reason}</td>
                <td>{request.requested?.userName}</td>
                <td>{request.approved ? "Yes" : "No"}</td>
                <td>
                  {!request.approved && (
                    <>
                      <button
                        className="actionBtn approve"
                        onClick={() => handleDecision(request.id, "accept")}
                      >
                        ✅
                      </button>
                      <button
                        className="actionBtn reject"
                        onClick={() => handleDecision(request.id, "reject")}
                      >
                        ❌
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No mod requests available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ModReview;
