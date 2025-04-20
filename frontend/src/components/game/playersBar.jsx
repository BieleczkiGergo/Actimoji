import { useContext } from "react";
import { GameCtx } from "../Context/gameCtx";
import styles from "./playersBar.module.css";

function PlayersBar({ gridArea }){
    const game = useContext( GameCtx );

    const players = game.players;

    return <div className={ styles.playersBar + " " + gridArea }>
        
        {players.map( ({name, isWriting, hasGuessed}, index) => <>
            <p 
                className={(hasGuessed ? styles.hasGuessed : "") + " " + styles.player}
                key={name}

            >
                {name}
            
            </p>

            { ( index < players.length-1 ) ? <hr key={name + "hr"} /> : <></> }
            

        </>)}

    </div>;

}

export { PlayersBar };
