package hu.actimoji.game;

import hu.actimoji.player.Player;
import hu.actimoji.player.PlayerService;
import hu.actimoji.room.Room;
import hu.actimoji.room.RoomService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class GameHandler extends TextWebSocketHandler {

    @Autowired
    PlayerService playerService;

    @Autowired
    RoomService roomService;

    public GameHandler( PlayerService playerService, RoomService roomService ) {
        this.playerService = playerService;
        this.roomService = roomService;

    }

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws Exception {
        final Integer roomId = (Integer) session.getAttributes().get("roomId");
        final String uname = (String) session.getAttributes().get("username");

        Room room = roomService.getRoom(roomId);

        Player player = new Player(session, room, uname);

        room.handleAddPlayer(player);

        playerService.addPlayer(player);

    }

    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session, TextMessage message) throws Exception {
        Player player = playerService.getPlayer(session);

        player.broadcastMessage(message.getPayload());

    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, CloseStatus status) throws Exception {
        Player player = playerService.getPlayer(session);

        player.leaveRoom();
        playerService.removePlayer(player);

    }
}
