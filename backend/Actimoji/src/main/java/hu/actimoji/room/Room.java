package hu.actimoji.room;

import hu.actimoji.player.Player;

import java.util.LinkedList;
import java.util.List;

public class Room {

    private final static int MAX_PLAYERS = 8;

    private List<Player> players;
    private String currentPrompt;
    private int currentWriter;
    private int round;

    public Room() {
        this.players = new LinkedList<>();
        this.currentWriter = 0;
        this.round = 0;
        this.currentPrompt = "";

    }

    public void addUser(Player player) throws RoomFullException {
        if (players.size() >= MAX_PLAYERS) {
            throw new RoomFullException("Room full");

        }
        players.add(player);

    }

    public void removeUser(Player player) {
        // TODO: This will be a little more complicated
        players.remove(player);

    }

    public void broadCastChatMessage(Player player, String message) {
        if( message.equals(currentPrompt)) {

        }


    }

    public void broadcastDescription(){

    }

}
