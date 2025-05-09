import React, { useContext, useState } from "react";
import styles from "./EmojiKeyboard.module.css";
import { EmojiCtx } from "../Context/emojiCtx";
import { ReactComponent as BackspaceIcon } from "../../assets/backspace.svg";

// TODO: give credit to the artist

const EmojiKeyboard = ({ onEmojiSelect, onEmojiDelete }) => {
  const emojis = useContext( EmojiCtx );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmojis = emojis.filter( ( emoji ) => 
    emoji.keywords.some( keyword => keyword.startsWith( searchTerm ) )

  );

  const handleAltActions = (e) => {
    if( !( e.altKey && e.key !== "Alt" ) )
      return;
    
    switch ( e.key.toLowerCase() ){
      case "enter":
        if( filteredEmojis.length !== 0 )
          onEmojiSelect( filteredEmojis[0].emoji );
        break;

      case "backspace":
        onEmojiDelete();
        break;

      default:
        break;

    }

  }

  return (
    <div className={ styles.keyboard }>
      <div className={ styles.emojiNameInput }>
        <input
          type="text"
          title="enter emoji to find it (alt + enter: insert)"
          onInput={ e => setSearchTerm(e.target.value) }
          onKeyUp={ e => {
            handleAltActions(e);
            e.target.focus();
            
          }}
        />

        <BackspaceIcon
          className={ styles.backspaceIcon }
          title="delete last emoji (alt + backspace)"
          onClick={ onEmojiDelete }

        />

      </div>

      <div className={ styles.emojiContainer }>
        {
          filteredEmojis.map( ({emoji, keywords}) => (
            <span
              key={ emoji }
              className={ styles.emoji }
              onClick={ () => onEmojiSelect(emoji) }
              title={ keywords }

            >
              {emoji}
            </span>

          ))
        }
      </div>
    </div>
  );
};

// Regex to match emoji (covers most common emojis, though not 100% exhaustive)
const emojiRegex = /(?:\p{Emoji}(?:\p{Emoji_Modifier}|\uFE0F)?(?:\u200D\p{Emoji})*)$/gu;

function removeLastEmoji( text ) {
  if( emojiRegex.test( text ) ){
    return text.replace( emojiRegex, "" );

  }

  return text; // no emoji found at the end
}

export { EmojiKeyboard, removeLastEmoji };
