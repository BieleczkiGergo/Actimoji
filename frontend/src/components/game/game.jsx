import { useContext, useState } from "react";
import { GameCtx } from "../../gameCtx";
import { PlayersBar } from "./playersBar";
import { ChatBar } from "./chatBar";
import styles from "./game.module.css";
import { WordChoice } from "./wordChoice";
import { PlayerStats } from "./playerStats";

function Game(){
    let game = useContext( GameCtx );

    let [desc, setDesc] = useState("");

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
            { game.isWriting ? 
                <>
                    <h2>{ game.helper }</h2>
                    <input onChange={ (e) => setDesc(e.target.value) }/>
                    <button onClick={ () => game.sendDescription(desc) }/>

                </>
                :
                <>
                    <h2>{ game.helper }</h2>
                    <h2>{ game.description }</h2>

                </>
            
            
            }
            
        </div>

    } else if( game.cycle == "roundover" ){
        gameBody = <div className={ styles.game + " " + styles.roundover } >
            <h2>Round over</h2>
            <PlayerStats />
            
        </div>
        
    }else if( game.cycle == "gameover" ){
        gameBody = <div className={ styles.game + " " + styles.gameover } >
            <h2>Game over</h2>
            <PlayerStats />
            
        </div>
        
    }

    return <div style={ styles.gameFrame }>
        <h2>This is the game element</h2>
        <PlayersBar />

        { gameBody }

        <ChatBar chat={ game.chat } disabled={ game.isWriting } sendChatMessage={game.sendChatMessage}/>

    </div>

}

export { Game };
