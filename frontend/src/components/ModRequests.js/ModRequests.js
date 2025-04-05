import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { Snackbar } from "@mui/material";
import './ModRequest.css';

const ModReview = () => {
  const { token, user } = useAuth();
  const [modRequests, setModRequests] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (!user?.roles?.includes("ROLE_MODERATOR")) {
      setSnackbarMessage("You must be a mod to view mod requests.");
      setOpenSnackbar(true);
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
        setSnackbarMessage("Failed to load mod requests.");
        setOpenSnackbar(true);
        console.error("Error loading mod requests:", error);
      });
  };

  const handleDecision = (requestId, action) => {
    const url = `http://localhost:8080/mod/review/${action}/${requestId}`;
    const payload = {
      id: requestId,           // <- mod kérvény ID-je (request.id)
      moderatorId: user?.id,   // <- aki elbírálja (a mod user ID-ja)
    };

    axios
      .post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setSnackbarMessage(`Request ${action}ed successfully!`);
        setOpenSnackbar(true);
        fetchModRequests(); // frissítés
      })
      .catch((error) => {
        setSnackbarMessage(`Failed to ${action} request.`);
        setOpenSnackbar(true);
        console.error(`Error on ${action}:`, error);
      });
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

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
