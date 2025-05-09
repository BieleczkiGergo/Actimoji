package hu.actimoji.game.message;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.actimoji.game.GameEvents;
import hu.actimoji.game.GameUtils;
import hu.actimoji.word.WordRead;

import java.util.List;

public class RoundOverMessage extends GameStateMessage{

    @JsonProperty("prompt")
    String prompt;

    @JsonProperty("playerStats")
    List<PlayerStats> playerStats;

    @JsonProperty("endTimestamp")
    long endTimeStamp;

    public RoundOverMessage(WordRead prompt, List<PlayerStats> playerStats, long endTimeStamp) {
        this.prompt = prompt.getWord();
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
