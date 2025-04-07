import styles from "./game.module.css";

function PlayerStats({ stats }){

    return <div className={styles.playerStats}>
        { stats.map( ({name, points}) =>
            <p>{`${name} : ${points}`}</p>

        )}
    </div>
    

}

export { PlayerStats };
