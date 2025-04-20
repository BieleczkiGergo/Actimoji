import { backendApi } from "../../backendApi";
import { createContext, useEffect, useState } from "react";

const EmojiCtx = createContext([]);

async function getAllEmojis(){
    return (await backendApi.get("/emoji/getAll")).data
    .map( (emojiread => {
        return {
            "emoji" : emojiread.emoji,
            "keywords" : emojiread.keywords.split(" ")

        };
    }))
    ;

}

function EmojiProvider({children}){
    const [emojis, setEmojis] = useState([]);

    async function reloadEmojis(){
        setEmojis( await getAllEmojis() );

    }
    // Premature abstraction because I want to look smart

    useEffect( () => {
        reloadEmojis();

    }, []);

    return <EmojiCtx.Provider value={emojis}>
        {children}

    </EmojiCtx.Provider>

}

export { EmojiCtx, EmojiProvider };
