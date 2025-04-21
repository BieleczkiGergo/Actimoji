import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import styles from "./ListWords.module.css";
import { useAuth } from "../Context/AuthContext"; // AuthContext importálása
import { backendApi } from "../../backendApi";

const max_words = 20;

function ListWords({ open, onClose, onSelect }) {
  const { token } = useAuth(); // Token lekérése az AuthContext-ből
  const [words, setWords] = useState([]);
  const [ page, setPage ] = useState( 0 );

  useEffect(() => {
    if (open && token) {

      // TODO: we should rewrite this with async
      
      backendApi
        .get(`/words/query?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
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
    onSelect(word);
    onClose();

  };

  const handleNextClick = () => {
    if( max_words <= words.length ){
      setPage( page => page + 1 )

    }

  };

  const handlePrevClick = () => {
    if( 0 < page ){
      setPage( page => page - 1 );

    }

  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.modalContent}>
        {words.length > 0 ? (
          <div className={ styles.tableWrapper }>
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

          </div>
        ) : (
          <p>No words available.</p>

        )}

        <div className={ styles.buttons }>
          <button
            onClick={ handlePrevClick }
            className={ styles.prevButton }

          > Prev </button>

          <button
            onClick={onClose}
            className={styles.closeButton}
            
          >Close</button>

          <button
            onClick={ handleNextClick }
            className={ styles.nextButton }

          > Next </button>

        </div>


      </div>
    </Modal>
  );
}

export default ListWords;
