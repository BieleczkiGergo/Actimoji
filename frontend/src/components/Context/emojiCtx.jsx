import { backendApi } from "../../backendApi";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const EmojiCtx = createContext([]);

const getAllEmojis = async () => {
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
    const { loaded, logout } = useAuth();

    const reloadEmojis = async () => {
        try {
            const allEmojis = await getAllEmojis();
            setEmojis( allEmojis );
            
        } catch (e) {
            logout();
            
        }

    }
    // Premature abstraction because I want to look smart

    useEffect( () => {
        if( 3 === loaded ){
            reloadEmojis();

        }

    }, [ loaded ]);

    return <EmojiCtx.Provider value={emojis}>
        {children}

    </EmojiCtx.Provider>

}

export { EmojiCtx, EmojiProvider };
