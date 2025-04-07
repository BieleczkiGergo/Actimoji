package hu.actimoji.game.message;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.actimoji.game.GameEvents;
import hu.actimoji.game.GameUtils;

import java.util.List;

public class GameOverMessage extends GameStateMessage {

    @JsonProperty("total_points")
    List<PlayerStats> playerStats;
    @JsonProperty("endTimestamp")
    long end;

    public GameOverMessage(List<PlayerStats> playerStats, long end) {
        this.playerStats = playerStats;
        this.end = end;

    }

    @Override
    public String toJsonString() {
        ObjectMapper mapper = new ObjectMapper();
        String eventId = GameUtils.getEventId( GameEvents.GameOver );

        try {
            return eventId + mapper.writeValueAsString( this );

        } catch (JsonProcessingException e) {
            return eventId;

        }
    }
}
