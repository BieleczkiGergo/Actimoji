import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import styles from "./ListWords.module.css"; // Moduláris CSS helyes importálása

function ListWords({ open, onClose, onSelect }) {
  const [words, setWords] = useState([]);

  useEffect(() => {
    if (open) {
      axios
        .get("http://localhost:8080/words/query")
        .then((response) => {
          setWords(response.data);
        })
        .catch((error) => {
          console.error("Hiba történt az adatok lekérésekor:", error);
        });
    }
  }, [open]);

  const handleWordClick = (word) => {
    onSelect(word);  // Kiválasztott szó továbbítása
    onClose();  // Modal bezárása
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



/*

RÉGI KÓD

import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import styles from "./ListWords.module.css"; // Moduláris CSS helyes importálása

function ListWords({ open, onClose }) {
  const [words, setWords] = useState([]);

  useEffect(() => {
    if (open) {
      axios
        .get("http://localhost:8080/words/query")
        .then((response) => {
          setWords(response.data);
        })
        .catch((error) => {
          console.error("Hiba történt az adatok lekérésekor:", error);
        });
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.modalContent}> {/* CSS moduláris használata }
      {words.length > 0 ? (
        <table className={styles.table}> {/* Táblázatra is alkalmazzuk }
          <thead>
            <tr>
              <th>Word</th>
              <th>Banned icons</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word, index) => (
              <tr key={index}>
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


*/
