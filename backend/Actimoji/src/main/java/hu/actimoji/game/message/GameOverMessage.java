package hu.actimoji.game.message;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.actimoji.game.GameEvents;
import hu.actimoji.game.GameUtils;

import java.util.List;

public class GameOverMessage extends GameStateMessage {

    List<PlayerStats> playerStats;

    public GameOverMessage(List<PlayerStats> playerStats) {
        this.playerStats = playerStats;

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
