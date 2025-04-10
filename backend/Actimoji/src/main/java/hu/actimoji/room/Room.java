package hu.actimoji.room;

import hu.actimoji.game.GameState;
import hu.actimoji.game.GameUtils;
import hu.actimoji.game.message.*;
import hu.actimoji.player.Player;
import hu.actimoji.word.WordService;

import java.time.Duration;
import java.time.Instant;
import java.util.*;

public class Room {
    // TODO: implement room closing

    private final static int MAX_PLAYERS = 8;
    private final static int MIN_PLAYERS = 2;

    // All time constants are in milliseconds
    private final static long ROUND_START_TIME = 20 * 1000;
    private final static long ROUND_TIME = 2 * 60 * 1000;
    private final static long ROUND_OVER_TIME = 10 * 1000;
    private final static long GAME_OVER_TIME = 30 * 1000;

    private final static int ROUNDS = 8;
    private final static int CHOICE_WORDS = 3;

    private final static int MAX_POINTS_PER_ROUND = 1000;

    private final List<Player> players;
    private String currentPrompt;
    private int currentWriter;
    private int round;
    private Timer timer;
    private GameState gameState;
    private Instant stateEnd;

    private List<String> wordChoice;
    private final WordService wordService;
    private String placeholder; // TODO: implement placeholder

    public Room( WordService wordService ) {
        this.players = new LinkedList<>();
        this.currentWriter = 0;
        this.round = 0;
        this.currentPrompt = "";
        this.gameState = GameState.WaitingForPlayers;
        this.wordService = wordService;

    }

    public void addPlayer(Player player) throws RoomFullException {
        // TODO: handle what happens if 2 or more players have the same name
        if (players.size() >= MAX_PLAYERS) {
            throw new RoomFullException("Room full");

        }

        players.add(player);
        this.broadcastPlayerUpdate();
        player.receiveCommand( this.getGameStateMessage( players.size() - 1 ) );

        if( this.gameState == GameState.WaitingForPlayers && players.size() >= MIN_PLAYERS ) {
            this.nextStage();

        }

    }

    private void nextStage() {
        if (timer != null) {
            timer.cancel();

        }
        timer = new Timer();

        if( this.gameState == GameState.RoundOver ) {
            currentWriter++;
            round++;

        }

        this.gameState = switch ( this.gameState ){
            case WaitingForPlayers -> GameState.RoundStart;

            case RoundStart -> GameState.InGame;
            case InGame -> GameState.RoundOver;
            case RoundOver -> ( currentWriter >= players.size() || round >= Room.ROUNDS )
                    ? GameState.GameOver
                    : GameState.RoundStart;

            case GameOver -> ( players.size() >= Room.MIN_PLAYERS )
                    ? GameState.RoundStart
                    : GameState.WaitingForPlayers;

        };

        long gameStateMillis = switch ( this.gameState ){
            case RoundStart -> Room.ROUND_START_TIME;
            case InGame -> Room.ROUND_TIME;
            case RoundOver -> Room.ROUND_OVER_TIME;
            case GameOver -> Room.GAME_OVER_TIME;

            default -> 0;
        };

        this.stateEnd = Instant.now().plusMillis( gameStateMillis );

        this.timer.schedule( new TimerTask() {
            @Override
            public void run() {
                nextStage();

            }

        }, Date.from( this.stateEnd ) );

        if( this.gameState == GameState.RoundStart ) {
            this.wordChoice = wordService.getWordChoice( Room.CHOICE_WORDS );
            this.currentPrompt = null;
            for( Player p : players ) {
                p.setHasGuessed( false );
            }

        } else if (this.gameState == GameState.InGame ) {
            if( this.currentPrompt == null ) {
                this.currentPrompt = this.wordChoice.getFirst();

            }
            this.placeholder = "_".repeat(this.currentPrompt.length());
            this.players.get( currentWriter ).setHasGuessed( true );

        }

        this.broadCastStateUpdate();

    }

    public int getPoints(){
        long remainingMillis = Duration.between( Instant.now(), stateEnd ).toMillis();

        return (int) Math.ceil( (double) (MAX_POINTS_PER_ROUND * remainingMillis) / ROUND_TIME );

    }

    public void handlePlayerMessage(Player player, String message) {
        int index = players.indexOf(player);

        // bruh I don't even know how this could happen
        // this would run if the player is not found in the list
        if (index == -1) {
            removePlayer(player);
            System.out.println("The unthinkable just happened");
            // TODO: implement something crazier for this
            return;

        }

        if( this.gameState == GameState.InGame ) {
            if ( currentWriter == index ) {
                if ( GameUtils.validateEmojis(message) )
                    this.broadcastDescription( message );

            } else {
                if( message.equals(currentPrompt)) {
                    player.setHasGuessed(true);
                    player.addPoints( getPoints() );
                    this.broadcastPlayerUpdate();

                    boolean allGuessed = true;
                    for ( Player p : players )
                        allGuessed = allGuessed && p.hasGuessed();

                    if ( allGuessed ) {
                        nextStage();

                    }


                } else {
                    this.broadCastChatMessage( player, message );

                }

            }

        } else if ( this.gameState == GameState.RoundStart ) {
            if ( currentWriter != index ) {
                this.broadCastChatMessage( player, message );

            } else {
                for( String word : wordChoice ) {
                    if( message.equals(word) ) {
                        this.currentPrompt = message;
                        this.nextStage();

                    }
                }

            }

        } else {
            this.broadCastChatMessage( player, message );

        }

    }

    private void resetGame(){
        this.timer.cancel();
        this.gameState = GameState.WaitingForPlayers;
        this.currentPrompt = "";
        this.currentWriter = 0;
        this.round = 0;
        this.broadCastStateUpdate();

        for (Player p: this.players ) {
            p.setHasGuessed( false );
            p.setPoints( 0 );
            p.setWriting( false );

        }
        broadcastPlayerUpdate();

    }

    public void removePlayer(Player player) {
        if ( players.indexOf(player) < currentWriter){
            currentWriter--;

        }

        players.remove(player);
        this.broadcastPlayerUpdate();

        if (players.size() < MIN_PLAYERS && gameState == GameState.GameOver ) {
            resetGame();

        } else if ( players.indexOf(player) == currentWriter ) {
            this.nextStage();

        }
    }

    private void broadCastChatMessage(Player player, String message) {
        ChatMessage chatMessage = new ChatMessage( message, player.getUsername() );

        for (Player p : players) {
            p.receiveCommand( chatMessage );

        }

    }

    private void broadcastDescription(String description) {
        DescriptionMessage descMessage = new DescriptionMessage( description );

        for (Player p : players) {
            p.receiveCommand( descMessage );

        }

    }

    private void broadcastPlayerUpdate() {
        List<PlayerUpdateInfo> updateInfos = new LinkedList<>();
        System.out.print( this.players );
        System.out.println(" ; current state: " + gameState.toString() );

        for (int i = 0; i < players.size(); i++) {
            Player player = players.get(i);
            updateInfos.add( new PlayerUpdateInfo(player.getUsername(), currentWriter == i, player.hasGuessed()) );

        }

        PlayerUpdateMessage message = new PlayerUpdateMessage(updateInfos);

        for (Player player : players) {
            player.receiveCommand( message );

        }
    }

    private void broadCastStateUpdate() {
        for (int i = 0; i < players.size(); i++) {
            Player player = players.get(i);
            player.receiveCommand( this.getGameStateMessage( i ) );

        }

    }

    private GameStateMessage getGameStateMessage( int playerIndex ) {
        boolean isWriter = playerIndex == currentWriter;

        return switch ( gameState ){
            case WaitingForPlayers -> new WaitingMessage();

            case RoundStart -> new RoundPrepareMessage(
                    isWriter, isWriter ? this.wordChoice : null,
                    this.stateEnd.toEpochMilli()
            );

            case InGame -> new RoundMessage(
                    isWriter ? this.currentPrompt : this.placeholder,
                    this.stateEnd.toEpochMilli()
            );

            case RoundOver -> new RoundOverMessage(
                    this.currentPrompt, this.getPlayerStats(),
                    this.stateEnd.toEpochMilli()
            );

            case GameOver -> new GameOverMessage( this.getPlayerStats(), this.stateEnd.toEpochMilli() );
        };
    }

    private List<PlayerStats> getPlayerStats() {
        List<PlayerStats> playerStats = new LinkedList<>();

        for (Player player : players) {
            playerStats.add( new PlayerStats( player ) );

        }

        return playerStats;
    }

}
