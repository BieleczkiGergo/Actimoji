package hu.actimoji.game.message;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.actimoji.game.GameEvents;
import hu.actimoji.game.GameUtils;

public class RoundMessage extends GameStateMessage{

    String placeHolder;
    long endTimeStamp;

    String word;

    public RoundMessage(String placeHolder, long endTimeStamp, String word) {
        this.placeHolder = placeHolder;
        this.endTimeStamp = endTimeStamp;
        this.word = word;

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
