import React, { useState } from "react";
import styles from "./EmojiKeyboard.module.css"; // CSS-modul importálása

const EmojiKeyboard = ({ onEmojiSelect }) => {
  // Az emojik és oldalak kezelése
  const emojis = [
    // Oldal 1: Alapvető emojik
    ["😊", "😂", "😍", "🥺", "😢", "😎", "😇", "🤔", "😏", "🙃", "😜", "😝"],
  
    // Oldal 2: Arckifejezések és érzelmek
    ["🤩", "😈", "👻", "💀", "🌞", "🌛", "⭐", "🌟", "✨", "💫", "🐶", "🐱"],
  
    // Oldal 3: Állatok
    ["🐰", "🐻", "🐯", "🦁", "🐵", "🐨", "🐸", "🦋", "🐝", "🐛", "🦗", "🐍"],
  
    // Oldal 4: Gyümölcsök
    ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍", "🍑", "🍈", "🍋", "🍊", "🥝"],
  
    // Oldal 5: Zöldségek és étel
    ["🥦", "🥬", "🍄", "🌽", "🍕", "🍔", "🍟", "🍝", "🍣", "🍩", "🍪", "🍫"],
  
    // Oldal 6: Italkategóriák
    ["🍺", "🍻", "🍷", "🍸", "🍹", "🍾", "🥂", "🥤", "🍵", "☕", "🥛", "🍶"],
  
    // Oldal 7: Időjárás
    ["🌞", "🌧️", "⛈️", "🌩️", "🌨️", "🌪️", "🌫️", "🌈", "☀️", "🌥️", "🌦️"],
  
    // Oldal 8: Természet
    ["🌲", "🌳", "🌴", "🌵", "🌻", "🌼", "🌷", "🌸", "🌺", "🌾", "🍃", "🌿"],
  
    // Oldal 9: Ünnepek és események
    ["🎉", "🎊", "🎂", "🎁", "🎈", "🎀", "🎭", "🎨", "🎼", "🎤", "🎧", "🎬"],
  ];
  

  const [currentPage, setCurrentPage] = useState(0); // Kezdeti oldal

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < emojis.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.keyboard}>
      <div className={styles.emojiContainer}>
        {emojis[currentPage].map((emoji, index) => (
          <span
            key={index}
            className={styles.emoji}
            onClick={() => onEmojiSelect(emoji)} // Emoji kiválasztása
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        <span>{currentPage + 1} / {emojis.length}</span>
        <button
          className={styles.paginationButton}
          onClick={() => handlePageChange("next")}
          disabled={currentPage === emojis.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmojiKeyboard;
