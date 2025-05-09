package hu.actimoji.game.message;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.actimoji.game.GameEvents;
import hu.actimoji.game.GameUtils;
import hu.actimoji.word.WordRead;

public class RoundMessage extends GameStateMessage{

    @JsonProperty("placeholder")
    WordRead placeHolder;

    @JsonProperty("endTimestamp")
    long endTimeStamp;

    public RoundMessage(WordRead placeHolder, long endTimeStamp) {
        this.placeHolder = placeHolder;
        this.endTimeStamp = endTimeStamp;

    }

    @Override
    public String toJsonString() {
        ObjectMapper mapper = new ObjectMapper();
        String actionId = GameUtils.getEventId( GameEvents.Round );

        try {
            return actionId + mapper.writeValueAsString( this );

        } catch (JsonProcessingException e) {
            return actionId;

        }
    }
}
