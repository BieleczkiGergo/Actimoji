package hu.actimoji.game.message;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.actimoji.game.GameEvents;
import hu.actimoji.game.GameUtils;

import java.util.List;

public class RoundOverMessage extends GameStateMessage{

    String word;
    List<PlayerStats> playerStats;
    long endTimeStamp;

    public RoundOverMessage(String word, List<PlayerStats> playerStats, long endTimeStamp) {
        this.word = word;
        this.playerStats = playerStats;
        this.endTimeStamp = endTimeStamp;

    }

    @Override
    public String toJsonString() {
        ObjectMapper mapper = new ObjectMapper();
        String actionId = GameUtils.getEventId( GameEvents.RoundOver );

        try {
            return actionId + mapper.writeValueAsString( this );

        } catch (JsonProcessingException e) {
            return actionId;

        }
    }
}
