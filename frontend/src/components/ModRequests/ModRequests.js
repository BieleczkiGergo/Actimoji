import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import './ModRequest.css';

const ModRequests = () => {
  const { token, user } = useAuth();
  const [modRequests, setModRequests] = useState([]);

  useEffect(() => {
    console.log("User in ModRequests:", user);
    if (!user?.roles?.includes("ROLE_MODERATOR")) {
      console.log("User is not a moderator or not logged in.");
      return;
    }

    fetchModRequests();
  }, [token, user]);

  const fetchModRequests = () => {
    console.log("Fetching mod requests...");
    axios
      .get("http://localhost:8080/mod/review", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Mod Requests:", response.data);
        setModRequests(response.data);
      })
      .catch((error) => {
        console.error("Error loading mod requests:", error);
      });
  };

const handleAccept = (requestId) => {
  console.log("Accepting request with ID:", requestId); 
  console.log("User object in decision handler:", user);

  const url = `http://localhost:8080/mod/review/accept/${requestId}?moderatorId=${user?.userId}`;
  
  axios
    .post(url, null, { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      fetchModRequests();
    })
    .catch((error) => {
      console.error(`Error on accept:`, error);
    });
};


const handleReject = (requestId) => {
  console.log("Rejecting request with ID:", requestId);
  console.log("User object in decision handler:", user);

  const url = `http://localhost:8080/mod/review/reject/${requestId}?moderatorId=${user?.userId}`;
  
  axios
    .post(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      fetchModRequests();
    })
    .catch((error) => {
      console.error(`Error on reject:`, error);
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
                        onClick={() => handleAccept(request.id)} // Elfogadás
                      >
                        ✅
                      </button>
                      <button
                        className="actionBtn reject"
                        onClick={() => handleReject(request.id)} // Elutasítás
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

export default ModRequests;
