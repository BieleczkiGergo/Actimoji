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

