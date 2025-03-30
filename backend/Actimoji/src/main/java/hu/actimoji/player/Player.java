package hu.actimoji.player;

import hu.actimoji.game.GameActions;
import hu.actimoji.game.GameUtils;
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
            receiveCommand( GameActions.SendChatMessage, "You guessed correctly!" );

        }else {
            room.broadCastChatMessage( this, message );

        }

    }

    public void receiveCommand(GameActions command, String message){
        String action = GameUtils.getActionId( command );

        try {
            session.sendMessage( new TextMessage( action + message) );

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
