package hu.actimoji.player;

import hu.actimoji.game.GameEvents;
import hu.actimoji.game.GameUtils;
import hu.actimoji.game.message.Message;
import hu.actimoji.room.Room;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

@Getter
@Setter
public class Player {

    private String username;
    private WebSocketSession session;
    private Room room;
    private boolean isWriting;
    private boolean hasGuessed;

    public Player(WebSocketSession session, Room room, String username) {
        this.session = session;
        this.room = room;

    }

    public void leaveRoom(){

    }

    public void broadcastMessage(String message){

        if ( isWriting ){
            room.broadcastDescription(message);
            return;

        }

        if( room.guessPrompt( message ) ) {
            // TODO: implement correct guess

        }else {
            room.broadCastChatMessage( this, message );

        }

    }

    public void receiveCommand(Message message){
        try {
            session.sendMessage( new TextMessage( message.toJsonString() ) );

        } catch (IOException e) {
            try {
                session.sendMessage( new TextMessage("eFailed to send message") );

            } catch (IOException e1) {
                System.out.println("failed to send error message");
                e1.printStackTrace();

            }

            try {
                session.close( CloseStatus.BAD_DATA );

            }catch (IOException e1) {
                System.out.println("failed to close session");
                e1.printStackTrace();

            }

        }

    }

}
