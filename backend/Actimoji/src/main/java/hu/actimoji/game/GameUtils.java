package hu.actimoji.game;

public class GameUtils {

    /*
        Commands:
            0: game start
            1: regular message
            2: description
            3: guessed word
            4: player joined
            5: player left
            6: round end
            7: you're describing
            8: word choice
            9: game over

     */
    public static String getActionId( GameActions action ){
        return switch( action ){
            case GameStart -> "gs";
            case RoundStart -> "rs";
            case RoundOver -> "ro";
            case GameOver -> "go";

            case SendChatMessage -> "sc";
            case GuessedWord -> "gw";
            case SendDescription -> "sd";

            case WordChoice -> "wc";

            case PlayerJoined -> "pj";
            case PlayerLeft -> "pl";

            case SetDescribing -> "dy";
            case UnsetDescribing -> "dn";

            case Error -> "ee";

            default -> "ee";

        };
    }

    public boolean validateEmojis( String message ) {
        return true;

    }
}
