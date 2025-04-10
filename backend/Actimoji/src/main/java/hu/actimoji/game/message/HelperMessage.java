package hu.actimoji.game.message;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.actimoji.game.GameEvents;
import hu.actimoji.game.GameUtils;

public class HelperMessage extends Message {

    @JsonProperty("placeholder")
    private String placeholer;

    @Override
    public String toJsonString() {
        ObjectMapper mapper = new ObjectMapper();
        String actionId = GameUtils.getEventId( GameEvents.SendHelp );

        try {
            return actionId + mapper.writeValueAsString( this );

        } catch (JsonProcessingException e) {
            return actionId;

        }

    }
}
