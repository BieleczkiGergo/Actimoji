package hu.actimoji.game.message;

import hu.actimoji.game.GameEvents;
import hu.actimoji.game.GameUtils;

public class WaitingMessage extends GameStateMessage {

    @Override
    public String toJsonString() {
        return GameUtils.getEventId( GameEvents.Waiting );

    }
}
