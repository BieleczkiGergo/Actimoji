import { useContext } from "react";
import { GameCtx } from "../Context/gameCtx";
import styles from "./playersBar.module.css";

function PlayersBar(){
    const game = useContext( GameCtx );

    const players = game.players;

    console.log( players );

    return <div className={ styles.playersBar }>
        
        {players.map( ({name, isWriting, hasGuessed}) =>
            <p className={hasGuessed ? styles.hasGuessed : ""} key={name}>{name}</p>

        )}

    </div>;

}

export { PlayersBar };
