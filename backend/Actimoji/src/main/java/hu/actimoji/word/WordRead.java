package hu.actimoji.word;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class WordRead {

    @JsonProperty("word")
    private String word;

    @JsonProperty("bannedIcons")
    private List<String> bannedIcons;

    public WordRead( Word word ) {
        this.word = word.getWord();
        this.bannedIcons = Arrays.asList( word.getBannedIcons().split(" ") );

    }

    public WordRead( String word, List<String> bannedIcons ) {
        this.word = word;
        this.bannedIcons = bannedIcons;

    }

    public WordRead() {
        this.word = "";
        this.bannedIcons = new ArrayList<>();

    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public List<String> getBannedIcons() {
        return bannedIcons;
    }

    public void setBannedIcons(List<String> bannedIcons) {
        this.bannedIcons = bannedIcons;
    }
}
