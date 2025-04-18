import { useContext } from "react";
import { GameCtx } from "../Context/gameCtx";
import styles from "./wordChoice.module.css";

function WordChoice(){
    const game = useContext( GameCtx );

    const { wordChoice, chooseWord } = game;

    console.log( wordChoice[0].bannedIcons );

    return <div className={ styles.wordChooser }>
        { wordChoice.map( ({word, bannedIcons}) =>
            <h2 
                key={ word }
                className={ styles.wordChoice }
                onClick={ () => chooseWord( word ) }
            >
                <p>{ word }</p>
                <br />
                <p>{ bannedIcons }</p>

            </h2>

        )}
    </div>

}

export { WordChoice };
