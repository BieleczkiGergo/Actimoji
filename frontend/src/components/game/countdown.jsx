import { useContext, useState, useEffect } from "react";
import { GameCtx } from "../Context/gameCtx";
import styles from "./countdown.module.css";

function formatCountdown(targetTimestamp) {
    const now = Date.now();
    let diff = Math.max(0, Math.floor((targetTimestamp - now) / 1000)); // in seconds

    const minutes = String(Math.floor(diff / 60)).padStart(2, '0');
    const seconds = String(diff % 60).padStart(2, '0');

    return `${minutes}:${seconds}`;

}

function CountDownTimer({ gridArea }) {
    const { roundEnd, cycle } = useContext(GameCtx);
    const [timeStr, setTimeStr] = useState("");

    function updateTimeStr(){
        setTimeStr( formatCountdown( roundEnd ) );

    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateTimeStr();

        }, 500);

        return () => clearInterval(intervalId);

    }, [ roundEnd, updateTimeStr ]);

    if( "waiting" === cycle )
        return <></>;

    return <p className={ styles.countdown + " " + gridArea } >{ timeStr }</p>;

}

export { CountDownTimer };
