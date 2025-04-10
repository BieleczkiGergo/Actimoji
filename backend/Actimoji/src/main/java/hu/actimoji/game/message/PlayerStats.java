package hu.actimoji.game.message;

import com.fasterxml.jackson.annotation.JsonProperty;
import hu.actimoji.player.Player;

public class PlayerStats {

    @JsonProperty("name")
    String name;
    @JsonProperty("points")
    int points;

    public PlayerStats(Player player) {
        this.name = player.getUsername();
        this.points = player.getPoints();

    }

}
