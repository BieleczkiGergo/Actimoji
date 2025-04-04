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

    axios
      .get("http://localhost:8080/mod/review", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setModRequests(response.data);
      })
      .catch((error) => {
        setSnackbarMessage("Failed to load mod requests.");
        setOpenSnackbar(true);
        console.error("Error loading mod requests:", error);
      });
  }, [token, user, setModRequests]);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <div className="modReviewContainer">
      <h1>Mod Requests</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reason</th>
            <th>Requested By</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {modRequests.length > 0 ? (
            modRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.reason}</td>
                <td>{request.requested.userName}</td>
                <td>{request.approved ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No mod requests available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ backgroundColor: "#FF6B35", color: "#fff", fontWeight: "bold" }}
      />
    </div>
  );
};

export default ModReview;
