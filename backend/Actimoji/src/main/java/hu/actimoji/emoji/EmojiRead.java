package hu.actimoji.emoji;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class EmojiRead {

    @JsonProperty("emoji")
    String emoji;

    @JsonProperty("keywords")
    String keywords;

    public EmojiRead(String emoji, String keywords) {
        this.emoji = emoji;
        this.keywords = keywords;
    }

    public EmojiRead(Emoji emoji) {
        this.emoji = emoji.getEmoji();
        this.keywords = emoji.getKeywords();

    }

    public String getEmoji() {
        return emoji;
    }

    public void setEmoji(String emoji) {
        this.emoji = emoji;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    @Override
    public String toString() {
        return emoji + ": " + keywords;

    }
}
