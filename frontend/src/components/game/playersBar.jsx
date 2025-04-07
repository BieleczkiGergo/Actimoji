import styles from "./game.module.css";

function PlayersBar({ players }){

    return <div className={ styles.playersBar }>
        
        {players.map( ({name, isWriting, hasGuessed}) => {
            <p className={hasGuessed ? styles.hasGuessed : ""} key={name}>{name}</p>

        })}

    </div>;

}

export { PlayersBar };