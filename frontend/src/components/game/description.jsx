import { useContext, useEffect, useState } from "react";
import { GameCtx } from "../../gameCtx";
import EmojiKeyboard from "../Keyboard/EmojiKeyboard";

function Description(){
    const game = useContext( GameCtx );

    const [desc, setDesc] = useState("");

    function sendDesc(){
        if( game.writing )
            game.sendDescription( desc );

    }

    useEffect( () => {
        sendDesc();

    }, [desc]);

    return <div className="description">
        {
            game.writing ? (
            <>
                <h2>{ game.helper }</h2>
                <h2>{ game.bannedIcons.join(" ") }</h2>
                <h2>{ desc }</h2>
                <EmojiKeyboard onEmojiSelect={ emoji => setDesc( desc + emoji) } />

            </>)
            :
            (<>
                <h2>{ game.helper }</h2>
                <h2>{ game.description }</h2>

            </>)
        }
    </div>;

}

export { Description };
