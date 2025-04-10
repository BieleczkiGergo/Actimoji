const nickname_input = document.getElementById("nickname_input");
const room_input = document.getElementById("room_input");
const players_element = document.getElementById("players");
const description_element = document.getElementById("description");
const comments_element = document.getElementById("comments");
const join_btn = document.getElementById("joinbtn");
const timer_element = document.getElementById("timer");

let socket;
let writer = false;
let round_end;

join_btn.addEventListener("click", () => {
    if (socket instanceof WebSocket) {
        socket.close();

    }

    const uname = nickname_input.value;
    const room_num = parseInt( room_input.value );

    if( uname === "" || room_num == null ){
        console.log("can't join the room like that");
        return;

    }

    socket = new WebSocket(`/game/room/${room_num}?username=${uname}`);

    let msg_input = document.createElement("input");
    msg_input.type = "text";
    let msg_label = document.createElement("label");
    msg_label.innerText = "message";
    let msg_send = document.createElement("button");
    msg_send.innerText = "send";

    msg_send.addEventListener("click", () => {
        const text = msg_input.value;
        socket.send( text );

    });

    description_element.appendChild( msg_input );
    description_element.appendChild( msg_label );
    description_element.appendChild( msg_send  );


    socket.addEventListener("message", (event) => {
        const message = event.data;

        const command = message.substring(0, 2);
        let text = "";

        try {
            text = JSON.parse( message.substring(2) );

        }catch ( e ){

        }

        console.log( command, text );

    });
});
