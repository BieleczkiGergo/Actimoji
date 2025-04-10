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
    public static String getEventId(GameEvents action ){
        return switch( action ){
            // lifecycle events
            case Waiting -> "wa";
            case RoundPrepare -> "rp";
            case Round -> "rr";
            case RoundOver -> "ro";
            case GameOver -> "go";

            // non-lifecycle events
            case PlayerUpdate -> "pu";
            case SendChatMessage -> "sc";
            case SendDescription -> "sd";
            case SendHelp -> "sh";

            case Error -> "ee";

            default -> "ee";

        };
    }

    public static boolean validateEmojis( String message ) {
        return true; // TODO: implement emoji checking

    }
}
