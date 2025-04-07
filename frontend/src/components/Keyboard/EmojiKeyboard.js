import React from "react";
import styles from "./EmojiKeyboard.module.css";

const EmojiKeyboard = ({ onEmojiSelect }) => {
  const emojis = ["😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎"];

  return (
    <div className={styles.keyboard}>
      {emojis.map((emoji, index) => (
        <span key={index} onClick={() => onEmojiSelect(emoji)} className={styles.emoji}>
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default EmojiKeyboard;
