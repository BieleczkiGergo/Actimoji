package hu.actimoji.room;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

public class RoomInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) throws Exception {
        final String path = request.getURI().getPath();

        final String[] parts = path.split("/");
        if (parts.length != 3){
            return false;

        }
        try {
            final int roomId = Integer.parseInt(parts[2]);
            attributes.put("roomId", roomId);

        }catch (NumberFormatException e){
            return false;

        }

        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                               Exception exception) {

    }
}
