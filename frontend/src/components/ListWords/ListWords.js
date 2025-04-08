import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import styles from "./ListWords.module.css";
import { useAuth } from "../Context/AuthContext"; // AuthContext importálása

function ListWords({ open, onClose, onSelect }) {
  const { token } = useAuth(); // Token lekérése az AuthContext-ből
  const [words, setWords] = useState([]);

  useEffect(() => {
    if (open && token) { // Ha a modal nyitva van és van token
      axios
        .get("http://localhost:8080/words/query", {
          headers: { Authorization: `Bearer ${token}` },  // Auth header hozzáadása
        })
        .then((response) => {
          setWords(response.data);
        })
        .catch((error) => {
          console.error("Hiba történt az adatok lekérésekor:", error);
        });
    }
  }, [open, token]); // Ha a modal nyitás vagy a token változik, újraindul a kérés

  const handleWordClick = (word) => {
    onSelect(word); // A kiválasztott szó átadása a parent komponensnek
    onClose(); // Modal bezárása
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
