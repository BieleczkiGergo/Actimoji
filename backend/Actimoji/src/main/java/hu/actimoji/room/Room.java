package hu.actimoji.room;

import hu.actimoji.player.Player;

import java.util.LinkedList;
import java.util.List;

public class Room {

    private final static int MAX_MESSAGES = 50;

    private List<Player> players;
    private String currentPrompt;
    private int currentWriter;

    private String[] messages;

    public Room() {
        players = new LinkedList<>();
        currentWriter = 0;
        currentPrompt = "";
        messages = new String[MAX_MESSAGES];

    }

    public void addUser(Player player) {
        players.add(player);

    }

    public void removeUser(Player player) {
        // This will be a little more complicated
        players.remove(player);

    }

    public void broadCastChatMessage(Player player, String message) {
        if( message.equals(currentPrompt)) {

        }


    }

    public void broadcastDescription(){

    }

}
