package hu.actimoji.game.message;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.actimoji.game.GameEvents;
import hu.actimoji.game.GameUtils;

import java.util.List;

public class PlayerUpdateMessage extends Message {

    @JsonProperty("players")
    List<PlayerUpdateInfo> players;

    public PlayerUpdateMessage(List<PlayerUpdateInfo> players) {
        this.players = players;

    }

    @Override
    public String toJsonString() {
        ObjectMapper mapper = new ObjectMapper();
        String actionId = GameUtils.getEventId( GameEvents.PlayerUpdate );

        try {
            return actionId + mapper.writeValueAsString( this );

        } catch (JsonProcessingException e) {
            return actionId;

        }

    }
}
