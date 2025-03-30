package hu.actimoji.game.message;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ChatMessage extends Message {

    private final static String commandId = "cm";

    private String message;
    private String username;

    public ChatMessage(String message, String username) {
        this.message = message;
        this.username = username;

    }


    @Override
    public String toJsonString() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return ChatMessage.commandId + mapper.writeValueAsString( this );

        } catch (JsonProcessingException e) {
            return ChatMessage.commandId;

        }
    }
}
