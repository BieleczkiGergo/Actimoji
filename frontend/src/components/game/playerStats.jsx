import { useContext } from "react";
import styles from "./playerStats.module.css";
import { GameCtx } from "../Context/gameCtx";

function PlayerStats(){
    let game = useContext( GameCtx );

    const stats = game.playerPoints;

    console.log( "player stats: ", stats );

    return <div className={ styles.playerStats }>
        { stats.map( ({name, points}) =>
            <p key={ name } >{`${name} : ${points}`}</p>

        )}
    </div>
    

}

export { PlayerStats };
