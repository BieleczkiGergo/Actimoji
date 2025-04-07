import { createContext, useState } from "react";


let GameCtx = createContext({});

/**
 * 
 * @returns The ID of the game room
 */
async function findRandomGame(){
    // TODO: implemet finding random game
    return 1;
}

/**
 * 
 * @param {number} timestamp The timestamp
 * @returns a date object, showing the end of the current game cycle
 */
function decodeTimestamp( timestamp ){
    return new Date( timestamp );

}

/**
 * 
 * @param {Date} cycleEndTime The end of the game cycle
 * @returns A string representing how much time is left of the current game cycle
 */
function formatTimestamp( cycleEndTime ){
    return cycleEndTime.toLocaleString; // TODO: implement a better formatting for this

}

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

    let socket;

    function sendChatMessage( message ){
        socket.send( message );

    }
    
    // the sendDescription and chooseWord functions are only there to provide clean code
    function sendDescription( desc ){
        sendChatMessage( desc );

    }

    /**
     * 
     * @param {String} chosenWord The chosen word string that the writer will have to describe
     */
    function chooseWord( chosenWord ){
        sendChatMessage( chosenWord );

    }

    function joinGame( roomId, uname ){
        console.log(`joining game: ${roomId} as ${uname}`);

        if (socket instanceof WebSocket) {
            socket.close();

        }

        socket = new WebSocket(`/game/room/${roomId}?username=${uname}`);

        socket.addEventListener( "open", () => {
            setInGame( true );
            console.log("connected");

        });

        socket.addEventListener("close", () => {
            setInGame( false );
            console.log("disconnected");

        });

        socket.addEventListener( "message", event => {
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
                    break;

                case "rp": // round preparation
                    setCycle("prepare");
                    setWriting( args.isWriting );
                    setRoundEnd( decodeTimestamp( args.endTimestamp ) );
                    break;

                case "rr": // round (ingame)
                    setCycle("ingame");
                    setHelper( args.placeholder );
                    setRoundEnd( decodeTimestamp( args.endTimestamp ) );
                    break;

                case "ro": // round over
                    setCycle("roundover");
                    setHelper( args.prompt );
                    setPlayerPoints( args.playerStats );
                    setRoundEnd( decodeTimestamp( args.endTimestamp ) );
                    break;

                case "go": // game over
                    setCycle("gameover");
                    setPlayerPoints( args.playerStats );
                    setRoundEnd( decodeTimestamp( args.endTimestamp ) );
                    break;
                
                case "pu": // player update
                    setPlayers( args.players );
                    break;
                
                case "sc": // chat message
                    let newChat = JSON.parse(JSON.stringify( chat ));
                    newChat.push( args );
                    setChat( newChat );
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

        });

    }

    return <GameCtx.Provider value={{
            players, chat, cycle, description, helper, roundEnd, writing,
            wordChoice, error, inGame, playerPoints,

            sendChatMessage, sendDescription, chooseWord, joinGame

        }}>
        { children }

    </GameCtx.Provider>
}

export { GameCtx, GameProvider, findRandomGame };
