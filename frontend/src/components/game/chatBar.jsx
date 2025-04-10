import { GameCtx } from "../../gameCtx";
import styles from "./game.module.css";
import { useContext, useState } from "react";

function ChatBar(){
    let [currentMsg, setCurrentMsg] = useState("");

    const game = useContext( GameCtx );
    const { chat, isWriting, sendChatMessage } = game;

    return <div className={ styles.chatBar }>

        <div className={ styles.messages } >
            {chat.map( ({username, message}, index) => 
                <p key={ index }>{`${username} : ${message}`}</p>

            )}

        </div>

        <div className={ styles.yourMessage } >
            { isWriting ?
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