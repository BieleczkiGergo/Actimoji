import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const EmojiCtx = createContext([]);

function EmojiProvider({children}){
    const [emojis, setEmojis] = useState([]);

    const { backendApi, loading } = useContext( AuthContext );
    
    // TODO: maybe this could all be put into the same function
    async function getAllEmojis( api ){
        return (await api.get("/emoji/getAll")).data
        .map( (emojiread => {
            return {
                "emoji" : emojiread.emoji,
                "keywords" : emojiread.keywords.split(" ")
    
            };
        }))
        ;
    
    }

    async function reloadEmojis(){
        setEmojis( await getAllEmojis( backendApi ) );

    }
    // Premature abstraction because I want to look smart

    useEffect( () => {
        if( loading == 3 ){
            reloadEmojis();

        }

    }, [loading]);

    return <EmojiCtx.Provider value={emojis}>
        {children}

    </EmojiCtx.Provider>

}

export { EmojiCtx, EmojiProvider };
