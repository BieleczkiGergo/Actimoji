import styles from "./game.module.css";

function WordChoice({ words, chooseWord }){

    return <div className={ styles.wordChooser }>
        { words.map( word =>
            <h2 
                className={ styles.wordChoice } onClick={ () => chooseWord(word)}
                >
                {word} </h2>

        )}
    </div>

}

export { WordChoice };