package hu.actimoji.room;

import hu.actimoji.game.GameState;
import hu.actimoji.game.GameUtils;
import hu.actimoji.game.message.*;
import hu.actimoji.player.Player;
import hu.actimoji.word.WordRead;
import hu.actimoji.word.WordService;

import java.time.Duration;
import java.time.Instant;
import java.util.*;

/**
 * This class handles the meat of the game logic, and it's the most complicated one. However, with some clever naming
 * conventions, it can be made easier to understand. These naming conventions might apply to other classes as well, such
 * as the Player class.
 * <br>
 * Event handling methods are prefixed with "handle" such as: handlePlayerMessage, handlePlayerLeave etc...
 * Methods that directly affect all players are prefixed with "broadcast" such as:  broadcastPlayerUpdate
 * <br>
 * Future developers: please give very clear names to everything in this file.
 */
public class Room {
    // TODO: implement room closing

    public final static int MAX_PLAYERS = 8;
    public final static int MIN_PLAYERS = 2;

    // All time constants are in milliseconds
    private final static long ROUND_START_TIME = 20 * 1000;
    private final static long ROUND_TIME = 2 * 60 * 1000;
    private final static long ROUND_OVER_TIME = 10 * 1000;
    private final static long GAME_OVER_TIME = 30 * 1000;

    private final static int ROUNDS = 8;
    private final static int CHOICE_WORDS = 3;

    private final static int MAX_POINTS_PER_ROUND = 1000;

    private final List<Player> players;
    private WordRead currentPrompt;
    private int currentWriter;
    private int round;
    private Timer timer;
    private GameState gameState;
    private Instant stateEnd;

    private List<WordRead> wordChoice;
    private final WordService wordService;
    private WordRead placeholder; // TODO: implement placeholder

    public Room( WordService wordService ) {
        this.players = new LinkedList<>();
        this.wordService = wordService;

        this.resetGame();

    }

    private void resetGame(){
        if (timer != null)
            this.timer.cancel();

        this.gameState = GameState.WaitingForPlayers;
        this.currentPrompt = new WordRead();
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

    private void nextStage() {
        if (timer != null) {
            timer.cancel();

        }
        timer = new Timer();

        if( this.gameState == GameState.RoundOver ) {
            currentWriter++;
            round++;

        } if( this.gameState == GameState.GameOver ) {
            currentWriter = 0;
            round = 0;

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

        if (this.gameState != GameState.WaitingForPlayers)
            this.timer.schedule( new TimerTask() {
            @Override
            public void run() {
                nextStage();

            }

        }, Date.from( this.stateEnd ) );

        if( this.gameState == GameState.RoundStart ) {
            this.wordChoice = wordService.getWordChoice( Room.CHOICE_WORDS );
            this.currentPrompt = null;
            if( round == 0 ){
                // Reset player points only if it's the first round
                // TODO: maybe this could be done by calling resetGame
                // anyway, this is in a very bad place
                for( Player p : players ) {
                    p.setHasGuessed( false );
                    p.setPoints( 0 );

                }

            }


        } else if (this.gameState == GameState.InGame ) {
            if( this.currentPrompt == null ) {
                this.currentPrompt = this.wordChoice.getFirst();

            }
            this.placeholder = new WordRead("_".repeat(this.currentPrompt.getWord().length()), new ArrayList<>());
            this.players.get( currentWriter ).setHasGuessed( true );

        }

        this.broadCastStateUpdate();

    }

    private int getPoints(){
        long remainingMillis = Duration.between( Instant.now(), stateEnd ).toMillis();

        return (int) Math.ceil( (double) (MAX_POINTS_PER_ROUND * remainingMillis) / ROUND_TIME );

    }

    private boolean checkUsernameExists(String username) {
        for (Player p : players) {
            if (username.equals(p.getUsername())) {
                return true;
            }
        }

        return false;
    }

    /**
     * Handle what should happen if 2 or more players (would) have the same username
     * For now, it just adds 1 to the end of the name
     * <br>
     * <small> Maybe we'll add a profanity filter too in the future </small>
     * @param player The player whose username has to be adjusted
     */
    private void adjustUsername(Player player) {
        while ( checkUsernameExists( player.getUsername() ) ) {
            player.setUsername(player.getUsername() + "1");

        }

    }

    public void handleAddPlayer(Player player) throws RoomFullException {
        if (players.size() >= MAX_PLAYERS) {
            throw new RoomFullException("Room full");

        }

        // This is supposed to handle what happens if 2 or more players have the same name
        this.adjustUsername( player );

        players.add(player);
        this.broadcastPlayerUpdate();
        player.handleCommand( this.getGameStateMessage( players.size() - 1 ) );

        if( this.gameState == GameState.WaitingForPlayers && players.size() >= MIN_PLAYERS ) {
            this.nextStage();

        }

    }

    public void handlePlayerMessage(Player player, String message) {
        int index = players.indexOf(player);

        // bruh I don't even know how this could happen
        // this would run if the player is not found in the list
        if (index == -1) {
            handlePlayerLeave(player);
            System.out.println("The unthinkable just happened");
            // TODO: implement something crazier for this
            return;

        }

        if( this.gameState == GameState.InGame ) {
            if ( currentWriter == index ) {
                boolean valid = GameUtils.validateEmojis( message, currentPrompt.getBannedIcons() );
                if ( valid )
                    this.broadcastDescription( message );
                else
                    player.handleCommand( new ErrorMessage("The prompt is invalid") );

            } else {
                if( message.equals( currentPrompt.getWord() ) ) {
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
                for( WordRead word : wordChoice ) {
                    if( message.equals(word.getWord()) ) {
                        this.currentPrompt = word;
                        this.nextStage();

                    }
                }

            }

        } else {
            this.broadCastChatMessage( player, message );

        }

    }

    public void handlePlayerLeave(Player player) {
        final boolean wasCurrentWriter = players.indexOf(player) < currentWriter;

        if ( players.indexOf(player) < currentWriter ){
            currentWriter--;

        }

        players.remove( player );
        System.out.println( players );
        this.broadcastPlayerUpdate();

        if (players.size() < MIN_PLAYERS && gameState != GameState.GameOver ) {
            resetGame();

        } else if ( wasCurrentWriter ) {
            this.nextStage();

        }
    }

    private void broadCastChatMessage(Player player, String message) {
        ChatMessage chatMessage = new ChatMessage( message, player.getUsername() );

        for (Player p : players) {
            p.handleCommand( chatMessage );

        }

    }

    private void broadcastDescription(String description) {
        DescriptionMessage descMessage = new DescriptionMessage( description );

        for (Player p : players) {
            p.handleCommand( descMessage );

        }

    }

    private void broadcastPlayerUpdate() {
        List<PlayerUpdateInfo> updateInfos = new LinkedList<>();

        for (int i = 0; i < players.size(); i++) {
            Player player = players.get(i);
            updateInfos.add( new PlayerUpdateInfo(player.getUsername(), currentWriter == i, player.hasGuessed()) );

        }

        PlayerUpdateMessage message = new PlayerUpdateMessage(updateInfos);

        for (Player player : players) {
            player.handleCommand( message );

        }
    }

    private void broadCastStateUpdate() {
        for (int i = 0; i < players.size(); i++) {
            Player player = players.get(i);
            player.handleCommand( this.getGameStateMessage( i ) );

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

    public int getNumberOfPlayers(){
        return this.players.size();

    }

}
