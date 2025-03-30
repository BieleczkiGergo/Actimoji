package hu.actimoji.room;

import hu.actimoji.game.GameActions;
import hu.actimoji.game.GameState;
import hu.actimoji.player.Player;

import java.util.LinkedList;
import java.util.List;
import java.util.Timer;

public class Room {

    private final static int MAX_PLAYERS = 8;
    private final static int MIN_PLAYERS = 2;

    private List<Player> players;
    private String currentPrompt;
    private int currentWriter;
    private int round;
    private Timer timer;
    private GameState gameState;

    public Room() {
        this.players = new LinkedList<>();
        this.currentWriter = 0;
        this.round = 0;
        this.currentPrompt = "";
        this.gameState = GameState.WaitingForPlayers;

    }

    public void addPlayer(Player player) throws RoomFullException {
        if (players.size() >= MAX_PLAYERS) {
            throw new RoomFullException("Room full");

        }
        players.add(player);

        if( this.gameState == GameState.WaitingForPlayers && players.size() >= MIN_PLAYERS ) {

        }

    }

    public void removePlayer(Player player) {
        // TODO: This will be a little more complicated
        players.remove(player);

    }

    public void broadCastChatMessage(Player player, String message) {
        for (Player p : players) {
            p.receiveCommand( GameActions.SendChatMessage, message );

        }

    }

    public void broadcastDescription(String description) {
        for (Player p : players) {
            p.receiveCommand( GameActions.SendDescription, description );

        }

    }

    public boolean guessPrompt(String prompt) {
        return prompt.equals( currentPrompt );

    }



    public void startRound() {
        this.gameState = GameState.RoundStart;

    }

}
