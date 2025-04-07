package hu.actimoji.game.message;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.actimoji.game.GameEvents;
import hu.actimoji.game.GameUtils;

import java.util.List;

public class RoundPrepareMessage extends GameStateMessage {

    @JsonProperty("isWriting")
    boolean writing;
    @JsonProperty("wordChoice")
    List<String> words;
    @JsonProperty("endTimestamp")
    long endTimeStamp;

    public RoundPrepareMessage(boolean writing, List<String> words, long endTimeStamp) {
        this.writing = writing;
        this.words = words;
        this.endTimeStamp = endTimeStamp;

    }

    @Override
    public String toJsonString() {

        ObjectMapper mapper = new ObjectMapper();
        String actionId = GameUtils.getEventId( GameEvents.RoundPrepare );

        try {
            return actionId + mapper.writeValueAsString( this );

        } catch (JsonProcessingException e) {
            return actionId;

        }
    }
}
