import { useContext, useEffect, useState } from "react";
import { GameCtx } from "../Context/gameCtx";
import { EmojiKeyboard, removeLastEmoji } from "../Keyboard/EmojiKeyboard";
import styles from "./description.module.css";

function Description(){
    const { bannedIcons, writing, helper, description, sendDescription }
        = useContext( GameCtx );

    const [desc, setDesc] = useState("");

    function sendDesc(){
        if( writing )
            sendDescription( desc );

    }

    useEffect( () => {
        sendDesc();

    }, [desc]);

    console.log("banned icons:", bannedIcons);

    return <div className={ styles.description }>
        {
            writing ? (
            <>
                <h2>{ helper }</h2>
                {bannedIcons.length > 0 && bannedIcons[0] !== "" ?
                    <h2>Banned icons: <span>{ bannedIcons.join(" ") }</span></h2>
                    :
                    <></>
                }
                
                <h2>{ desc }</h2>
                <EmojiKeyboard
                    onEmojiSelect={ emoji => setDesc( desc + emoji) }
                    onEmojiDelete={ () => setDesc(removeLastEmoji(desc)) }

                />

            </>)
            :
            (<>
                <h2>{ helper }</h2>
                <h2>{ description }</h2>

            </>)
        }
    </div>;

}

export { Description };
