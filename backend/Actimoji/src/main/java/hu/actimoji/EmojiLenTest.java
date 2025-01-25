package hu.actimoji;

public class EmojiLenTest {

    public static final int zwj = '\u200D';

    public static void main(String[] args) {
        System.out.println("zwj: " + zwj);

        String cat_heart = "\uD83D\uDE3B";
        printEmojiData(cat_heart);

        // love hotel
        printEmojiData("\uD83C\uDFE9");

        // family
        printEmojiData("\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66");

        // man with skin tone
        printEmojiData("\uD83E\uDDD1\uD83C\uDFFD");

        // System.out.println("\uD83D\uDC93".length());

    }

    public static void printEmojiData(String emoji) {
        System.out.println( emoji + " : " + getEmojiLength(emoji) + " | " + getEmojiParts(emoji) + " | " + getEmojiBytes(emoji));

    }

    public static int getEmojiLength(String emoji) {
        return emoji.getBytes().length;

    }

    public static String getEmojiBytes(String emoji) {
        byte[] bytes = emoji.getBytes();
        StringBuilder emojiChars = new StringBuilder();

        for (int i = 1; i < bytes.length; i++) {
            emojiChars.append(" ").append( bytes[i] );

        }

        return emojiChars.toString();
    }

    public static String getEmojiParts(String emoji) {
        StringBuilder builder = new StringBuilder();

        emoji.codePoints().forEach(emojiChar -> {
            if(emojiChar == zwj) {
                builder.append(" +");

            }else {
                builder.append(" ").append(Character.toChars(emojiChar));

            }
        });

        return builder.toString();
    }
}
