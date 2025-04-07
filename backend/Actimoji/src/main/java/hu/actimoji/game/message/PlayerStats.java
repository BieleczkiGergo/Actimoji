package hu.actimoji.game.message;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PlayerStats {

    @JsonProperty("name")
    String name;
    @JsonProperty("points")
    int points;

}
