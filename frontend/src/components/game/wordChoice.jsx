import styles from "./game.module.css";
import { useContext } from "react";
import { GameCtx } from "../../gameCtx";

function WordChoice(){
    const game = useContext( GameCtx );

    const { wordChoice, chooseWord } = game;

    console.log( wordChoice );

    return <div className={ styles.wordChooser }>
        { wordChoice.map( word =>
            <h2 
                className={ styles.wordChoice } onClick={ () => chooseWord(word)}
                >
                {word} </h2>

        )}
    </div>

}

export { WordChoice };