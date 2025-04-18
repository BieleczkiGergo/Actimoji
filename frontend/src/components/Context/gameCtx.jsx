import { createContext, useState, useEffect } from "react";
import axios from "axios";

let GameCtx = createContext({});

/**
 * 
 * @returns The ID of the game room
 */
async function findRandomGame(){
    const roomResponse = await axios.get("http://localhost:8080/game/random");
    return roomResponse.data;
    
}


let socket = null;

function GameProvider({ children }){
    let [players, setPlayers] = useState( [] );
    let [chat, setChat] = useState( [] );
    let [cycle, setCycle] = useState( "waiting" ); // TODO: make enums for game cycle
    let [description, setDescription] = useState( "" );
    let [helper, setHelper] = useState( "___" );
    let [roundEnd, setRoundEnd] = useState( 0 );
    let [writing, setWriting] = useState( false );
    let [wordChoice, setWordChoice] = useState( [] );
    let [error, setError] = useState( "" );
    let [inGame, setInGame] = useState( false );
    let [playerPoints, setPlayerPoints] = useState( [] );
    let [bannedIcons, setBannedIcons] = useState( "" );

    useEffect( () => {
        setInGame( false );

    }, []);

    useEffect( () => {
        console.log("word choice: ", wordChoice);

    }, [ wordChoice ]);

    function sendChatMessage( message ){
        socket.send( message );

    }
    
    // the sendDescription and chooseWord functions are only there to provide clean code
    async function sendDescription( desc ){
        await sendChatMessage( desc );

    }

    /**
     * 
     * @param {String} chosenWord The chosen word string that the writer will have to describe
     */
    async function chooseWord( chosenWord ){
        await sendChatMessage( chosenWord );

    }

    function disconnect(){
        if (socket instanceof WebSocket) {
            socket.close();

        }
        
    }

    function joinGame( roomId, uname ){
        console.log(`joining game: ${roomId} as ${uname}`);

        disconnect();

        socket = new WebSocket(`ws://localhost:8080/game/room/${roomId}?username=${uname}`);

        socket.onopen = (e) => {
            setInGame( true );
            console.log("connected", e);

        };

        socket.onclose = (e) => {
            setInGame( false );
            console.log("disconnected", e);

        };

        socket.onerror = err => {
            console.error("socket error happened: ", err);

        };

        socket.onmessage = event => {
            const message = event.data;
            const command = message.substring(0, 2);
            let args = "";

            try {
                args = JSON.parse( message.substring(2) );

            }catch ( e ){
                args = "";

            }

            console.log(command, args);

            switch (command) {
                case "wa": // waiting
                    setCycle("waiting");
                    setChat( [] );
                    setHelper( "___" );
                    setPlayerPoints( [] );
                    break;

                case "rp": // round preparation
                    setCycle("prepare");
                    setWriting( args.isWriting );
                    setWordChoice( args.wordChoice );
                    setRoundEnd( args.endTimestamp );
                    break;

                case "rr": // round (ingame)
                    setCycle("ingame");
                    setHelper( args.placeholder.word );
                    setBannedIcons( args.placeholder.bannedIcons );
                    setRoundEnd( args.endTimestamp );
                    break;

                case "ro": // round over
                    setCycle("roundover");
                    setHelper( args.prompt );
                    setPlayerPoints( args.playerStats );
                    setRoundEnd( args.endTimestamp );
                    break;

                case "go": // game over
                    setCycle("gameover");
                    setPlayerPoints( args.playerStats );
                    setRoundEnd( args.endTimestamp );
                    break;
                
                case "pu": // player update
                    setPlayers( args.players );
                    break;
                
                case "sc": // chat message
                    setChat( ( prevChat ) => [ ...prevChat, args ] );
                    break;

                case "sd": // description
                    setDescription( args.description );
                    break;

                case "sh": // help (placeholder, not implemented yet)
                    setHelper( args.placeholder );
                    break;

                case "ee": // error
                    setError( args );
                    break;

                default:
                    // I don't even know what to put here
                    break;
            }

        };

        console.log("new socket: ", socket);

    }

    useEffect(() => {
        const handleUnload = () => {
            console.log("auto-closing the socket");
            disconnect();

        };

        window.addEventListener("beforeunload", handleUnload);
    
        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, []);
    

    return <GameCtx.Provider value={{
            players, chat, cycle, description, helper, roundEnd, writing,
            wordChoice, error, inGame, playerPoints, bannedIcons,

            sendChatMessage, sendDescription, chooseWord, disconnect, joinGame

        }}>
        { children }

    </GameCtx.Provider>
}

/* TODO: amik még kellenek:
    enum játékciklus tárolására
    emoji billentyűzet

*/

export { GameCtx, GameProvider, findRandomGame };
