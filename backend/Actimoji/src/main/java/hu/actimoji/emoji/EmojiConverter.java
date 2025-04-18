package hu.actimoji.emoji;

public class EmojiConverter {

    static EmojiRead emojiToEmojiRead( Emoji emoji ) {
        return new EmojiRead( emoji );

    }

    static Emoji emojiReadtoEmoji( EmojiRead emojiRead ) {
        Emoji emoji = new Emoji();
        emoji.setEmoji( emojiRead.getEmoji() );
        emoji.setKeywords( emojiRead.getKeywords() );

        return emoji;
    }
}
