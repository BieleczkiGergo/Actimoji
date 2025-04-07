package hu.actimoji.game.message;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PlayerUpdateInfo {

    @JsonProperty("name")
    String name;
    @JsonProperty("isWriting")
    boolean writing;
    @JsonProperty("hasGuessed")
    boolean guessed;

    public PlayerUpdateInfo(String name, boolean writing, boolean guessed) {
        this.name = name;
        this.writing = writing;
        this.guessed = guessed;
    }
}
