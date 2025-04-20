import React, { useEffect, useState, useContext } from "react";
import Modal from "@mui/material/Modal";
import styles from "./ListWords.module.css";
import { AuthContext } from "../Context/AuthContext";

function ListWords({ open, onClose, onSelect }) {
  const { token, backendApi } = useContext( AuthContext );
  const [words, setWords] = useState([]);

  useEffect(() => {
    if (open && token) {

      // TODO: we should rewrite this with async
      
      backendApi
        .get("/words/query", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setWords(response.data);
        })
        .catch((error) => {
          console.error("Hiba történt az adatok lekérésekor:", error);
        });
    }
  }, [open, token, backendApi]);

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
