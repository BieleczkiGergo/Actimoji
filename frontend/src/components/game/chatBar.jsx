import { GameCtx } from "../Context/gameCtx";
import styles from "./chatBar.module.css";
import { useContext, useEffect, useRef, useState } from "react";

function ChatBar({ gridArea }){
    let [currentMsg, setCurrentMsg] = useState("");

    const { chat, isWriting, sendChatMessage } = useContext( GameCtx );

    const messagesRef = useRef(null);

    useEffect( () => {
        if( messagesRef.current ){
            messagesRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"

            });

        }

    }, [ chat ]);

    return <div className={ styles.chatBar + " " + gridArea }>

        <div className={ styles.messages } >
            {chat.map( ({username, message}, index) => 
                <p key={ index }>{`${username} : ${message}`}</p>

            )}

            <div className={ styles.anchor } ref={ messagesRef } />
        </div>

        <div className={ styles.yourMessage } >
            { isWriting ?
                <>
                    <input placeholder="send to chat" disabled/>
                    <button disabled>Send</button>

                </>
                :
                <>
                    <input 
                        onChange={ (e) => setCurrentMsg(e.target.value) } placeholder="send to chat"
                        onKeyUp={ (e) => {
                            if( e.key !== "Enter" )
                                return;

                            sendChatMessage( currentMsg );
                            e.target.value = "";

                            e.stopPropagation();
                            e.preventDefault();

                        }}
                        
                    />
                    <button onClick={ () => sendChatMessage(currentMsg) }>Send</button>

                </>
            }
            
        </div>
    </div>


}

export { ChatBar };