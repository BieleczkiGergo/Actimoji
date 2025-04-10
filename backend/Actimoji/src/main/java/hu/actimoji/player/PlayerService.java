package hu.actimoji.player;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.Map;

@Service
public class PlayerService {

    Map<WebSocketSession, Player> players;

    public PlayerService() {
        this.players = new HashMap<>();

    }

    public void addPlayer(Player player) {
        this.players.put(player.getSession(), player);

    }

    public void removePlayer(Player player) {
        this.players.remove(player.getSession());

    }

    public Player getPlayer(WebSocketSession session) {
        return this.players.get(session);

    }
}
