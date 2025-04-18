import { useContext } from "react";
import { GameCtx } from "../Context/gameCtx";
import { PlayersBar } from "./playersBar";
import { ChatBar } from "./chatBar";
import styles from "./game.module.css";
import { WordChoice } from "./wordChoice";
import { PlayerStats } from "./playerStats";
import { Description } from "./description";
import { CountDownTimer } from "./countdown";

function Game(){
    let game = useContext( GameCtx );

    if( !game.inGame ){
        return <></>;

    }

    let gameBody = <></>;

    if( game.cycle == "waiting" ){
        gameBody = <div className={ styles.game + " " + styles.waiting } >
            <h2>Waiting for players</h2>

        </div>

    } else if( game.cycle == "prepare" ){
        gameBody = <div className={ styles.game + " " + styles.preapring } >
            { game.writing ? 
                <WordChoice />
                :
                <div>
                    <h2>Waiting for writer to choose</h2>

                </div>
            
            }

        </div>

    } else if( game.cycle == "ingame" ){
        gameBody = <div className={ styles.game + " " + styles.ingame } >
            <Description />
            
        </div>

    } else if( game.cycle == "roundover" ){
        console.log( "round over ", game.helper );

        gameBody = <div className={ styles.game + " " + styles.roundover } >
            <h2>Round over</h2>
            <h2>The word was: { game.helper }</h2>
            <PlayerStats />
            
        </div>
        
    }else if( game.cycle == "gameover" ){
        gameBody = <div className={ styles.game + " " + styles.gameover } >
            <h2>Game over</h2>
            <PlayerStats />
            
        </div>
        
    }

    return <div className={ styles.gameFrame }>
    <h2>Player list:</h2>
    <PlayersBar />
    <CountDownTimer />
    { gameBody }
    <ChatBar chat={ game.chat } disabled={ game.isWriting } sendChatMessage={ game.sendChatMessage }/>
</div>


}

export { Game };
