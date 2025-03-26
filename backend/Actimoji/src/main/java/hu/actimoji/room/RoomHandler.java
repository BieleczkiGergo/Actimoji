package hu.actimoji.room;

import hu.actimoji.player.Player;
import hu.actimoji.player.PlayerService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class RoomHandler extends TextWebSocketHandler {

    @Autowired
    PlayerService playerService;

    @Autowired
    RoomService roomService;

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws Exception {
        final Integer roomId = (Integer) session.getAttributes().get("roomId");
        Room room = roomService.getRoom(roomId);

        Player player = new Player(session, room);

        room.addUser(player);

    }

    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session, TextMessage message) throws Exception {

    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, CloseStatus status) throws Exception {

    }
}
