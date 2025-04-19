import { useContext } from "react";
import { GameCtx } from "../Context/gameCtx";
import styles from "./wordChoice.module.css";

function WordChoice(){
    const game = useContext( GameCtx );

    const { wordChoice, chooseWord } = game;

    console.log( wordChoice[0].bannedIcons );

    return <div className={ styles.wordChooser }>
        { wordChoice.map( ({word, bannedIcons}) =>
            <p 
                key={ word }
                className={ styles.wordChoice }
                onClick={ () => chooseWord( word ) }
            >
                <span>{ word }</span>
                <br />
                <span>{ bannedIcons }</span>

            </p>

        )}
    </div>

}

export { WordChoice };
