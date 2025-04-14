package hu.actimoji.player;

import hu.actimoji.game.message.Message;
import hu.actimoji.room.Room;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

public class Player {

    private String username;
    private WebSocketSession session;
    private Room room;
    private boolean isWriting;
    private boolean hasGuessed;
    private int points;

    public Player(WebSocketSession session, Room room, String username) {
        this.session = session;
        this.room = room;
        this.username = username;

        this.points = 0;
        this.isWriting = false;
        this.hasGuessed = false;

    }

    public void leaveRoom(){
        System.out.println("leaving room");
        this.room.handlePlayerLeave(this);

    }

    public void broadcastMessage(String message){
        this.room.handlePlayerMessage( this, message );

    }

    public void handleCommand(Message message){
        System.out.println("sending comand to: " + this.username);
        try {
            session.sendMessage( new TextMessage( message.toJsonString() ) );

        } catch (IOException e) {
            try {
                session.sendMessage( new TextMessage("eeFailed to send message") );

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

    public void addPoints(int points){
        this.points += points;

    }

    public String getUsername() {
        return username;

    }

    public void setUsername(String username) {
        this.username = username;

    }

    public WebSocketSession getSession() {
        return session;
    }

    public void setSession(WebSocketSession session) {
        this.session = session;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public boolean isWriting() {
        return isWriting;
    }

    public void setWriting(boolean writing) {
        isWriting = writing;
    }

    public boolean hasGuessed() {
        return hasGuessed;
    }

    public void setHasGuessed(boolean hasGuessed) {
        this.hasGuessed = hasGuessed;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Override
    public String toString() {
        return "Player{" +
                "username='" + username + '\'' +
                '}';
    }
}
