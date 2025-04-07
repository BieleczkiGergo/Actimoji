import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import styles from "./ListWords.module.css"; 

function ListWords({ open, onClose, onSelect }) {
  const [words, setWords] = useState([]);
  const { token } = useAuth(); // Auth token lekérése

  useEffect(() => {
    if (open && token) {
      axios
        .get("http://localhost:8080/words/query", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setWords(response.data);
        })
        .catch((error) => {
          console.error("Hiba történt az adatok lekérésekor:", error);
        });
    }
  }, [open, token]);

  const handleWordClick = (word) => {
    onSelect(word);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.modalContent}>
        {words.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Word</th>
                <th>Banned icons</th>
              </tr>
            </thead>
            <tbody>
              {words.map((word, index) => (
                <tr key={index} onClick={() => handleWordClick(word)}>
                  <td>{word.word}</td>
                  <td>{word.bannedIcons}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No words available.</p>
        )}
        <button onClick={onClose} className={styles.closeButton}>Close</button>
      </div>
    </Modal>
  );
}

export default ListWords;
