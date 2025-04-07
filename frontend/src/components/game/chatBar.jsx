import styles from "./game.module.css";
import { useState } from "react";

function ChatBar({ chat, disabled, sendChatMessage }){
    let [currentMsg, setCurrentMsg] = useState("");

    return <div className={ styles.chatBar }>

        <div className={ styles.messages } >
            {chat.map( (username, message) => 
                <p>{`${username} : ${message}`}</p>

            )}

        </div>

        <div className={ styles.yourMessage } >
            { disabled ?
                <>
                    <input placeholder="send to chat" disabled/>
                    <button disabled>Send</button>

                </>
                :
                <>
                    <input onChange={ (e) => setCurrentMsg(e.target.value) } placeholder="send to chat" />
                    <button onClick={ () => sendChatMessage(currentMsg) }>Send</button>

                </>
            }
            
        </div>
    </div>


}

export { ChatBar };