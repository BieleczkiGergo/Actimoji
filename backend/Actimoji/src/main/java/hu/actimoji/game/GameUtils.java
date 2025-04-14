package hu.actimoji.game;

import com.vdurmont.emoji.EmojiParser;
import java.util.List;

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

        };
    }

    /**
     * Test if a String is made up of only emojis
     * @param text A String that should be emojis only
     * @return whether it's made up of only emojis
     */
    public static boolean validateEmojis( String text, List<String> bannedIcons ) {
        System.out.print("Running emoji filter: ");
        // TODO: make a proper filter: this matches everything that has an emoji in it
        if (text == null || text.isBlank()) return true;

        System.out.println("still safe");

        for (String icon : bannedIcons) {
            if (icon == null || icon.isBlank()) continue;

            if ( text.toLowerCase().contains( icon.toLowerCase() ) ){
                System.out.println("String contained banned characters: " + icon );
                System.out.println("banned icons: " + bannedIcons + " length: " + bannedIcons.size() );
                return false;

            }
        }

        var emojiRegex = "\\p{IsEmoji}+";
        String bigRegex = "(?:[\\uD83C\\uDF00-\\uD83D\\uDDFF]|[\\uD83E\\uDD00-\\uD83E\\uDDFF]|[\\uD83D\\uDE00-\\uD83D\\uDE4F]|[\\uD83D\\uDE80-\\uD83D\\uDEFF]|[\\u2600-\\u26FF]\\uFE0F?|[\\u2700-\\u27BF]\\uFE0F?|\\u24C2\\uFE0F?|[\\uD83C\\uDDE6-\\uD83C\\uDDFF]{1,2}|[\\uD83C\\uDD70\\uD83C\\uDD71\\uD83C\\uDD7E\\uD83C\\uDD7F\\uD83C\\uDD8E\\uD83C\\uDD91-\\uD83C\\uDD9A]\\uFE0F?|[\\u0023\\u002A\\u0030-\\u0039]\\uFE0F?\\u20E3|[\\u2194-\\u2199\\u21A9-\\u21AA]\\uFE0F?|[\\u2B05-\\u2B07\\u2B1B\\u2B1C\\u2B50\\u2B55]\\uFE0F?|[\\u2934\\u2935]\\uFE0F?|[\\u3030\\u303D]\\uFE0F?|[\\u3297\\u3299]\\uFE0F?|[\\uD83C\\uDE01\\uD83C\\uDE02\\uD83C\\uDE1A\\uD83C\\uDE2F\\uD83C\\uDE32-\\uD83C\\uDE3A\\uD83C\\uDE50\\uD83C\\uDE51]\\uFE0F?|[\\u203C\\u2049]\\uFE0F?|[\\u25AA\\u25AB\\u25B6\\u25C0\\u25FB-\\u25FE]\\uFE0F?|[\\u00A9\\u00AE]\\uFE0F?|[\\u2122\\u2139]\\uFE0F?|\\uD83C\\uDC04\\uFE0F?|\\uD83C\\uDCCF\\uFE0F?|[\\u231A\\u231B\\u2328\\u23CF\\u23E9-\\u23F3\\u23F8-\\u23FA]\\uFE0F?)";
        String nonPrintableRegex = "\\p{C}";

        //String removed = text.replaceAll(emojiRegex, "");

        /*
        String bigRemoved = text.replaceAll(bigRegex, "")
                .replaceAll("\uD83E\uDEE0", "")
                ;
         */

        String multiRemoved = text.replaceAll(bigRegex, "")
                .replaceAll(emojiRegex, "")
                .replaceAll(nonPrintableRegex, "")
                .replaceAll("\uD83D\uDE00", "")
                .strip()
                ;


        String transformed = EmojiParser.parseToAliases( text )
                .replace("\uD83E\uDEE0", ":melting:")
                ;

        System.out.println("text: " + text
                + " text length: " + text.length()
                //+ " transformed: " + transformed
                //+ " transformed length: " + transformed.length()
                //+ " removed: " + removed
                //+ " removed length: " + removed.length()
                //+ " bigRemoved: " + bigRemoved
                //+ " bigRemoved length: " + bigRemoved.length()
                + " multi removed: " + multiRemoved
                + " mutli removed length: " + multiRemoved.length()
        );

        //return !transformed.equals( text );
        //return removed.isBlank();
        //return !transformed.equals( text ) || removed.isBlank();
        //return multiRemoved.isBlank();
        return multiRemoved.length() != text.length();

    }
}
