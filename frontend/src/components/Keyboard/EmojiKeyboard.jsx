import React, { useContext, useState } from "react";
import styles from "./EmojiKeyboard.module.css"; // CSS-modul importálása
import { EmojiCtx } from "../Context/emojiCtx";

const EmojiKeyboard = ({ onEmojiSelect }) => {
  const emojis = useContext( EmojiCtx );
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={ styles.keyboard }>
      <div className={ styles.emojiNameInput }>
        <input
          type="text"
          onInput={ e => setSearchTerm(e.target.value) }
        />

      </div>

      <div className={ styles.emojiContainer }>
        {
          emojis.filter( ( emoji ) => 
            emoji.keywords.some( keyword => keyword.startsWith( searchTerm ) )

          )
          .map( ({emoji}) => (
            <span
              key={ emoji }
              className={ styles.emoji }
              onClick={ () => onEmojiSelect(emoji) }
            >
              {emoji}
            </span>

          ))
        }
      </div>
    </div>
  );
};

export default EmojiKeyboard;
