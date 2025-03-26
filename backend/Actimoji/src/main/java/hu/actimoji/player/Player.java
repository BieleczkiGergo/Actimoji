package hu.actimoji.player;

import hu.actimoji.room.Room;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

@Getter
@Setter
public class Player {

    private WebSocketSession session;
    private Room room;

    public Player(WebSocketSession session, Room room) {
        this.session = session;
        this.room = room;

    }

    public void leaveRoom(){

    }

    public void broadcastMessage(String message){

    }

    public void receiveMessage(String message){

    }

    public void guessPrompt(String prompt){

    }

}
