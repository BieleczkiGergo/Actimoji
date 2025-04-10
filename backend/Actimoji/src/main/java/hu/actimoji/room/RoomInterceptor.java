package hu.actimoji.room;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.net.URI;
import java.util.Map;

public class RoomInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) throws Exception {
        final URI uri = request.getURI();
        final String path = uri.getPath();
        final String query = uri.getQuery();

        if (query == null || query.isEmpty()) {
            return false;

        }

        final String[] parts = path.split("/");
        if (parts.length < 4){
            return false;

        }

        try {
            // set room id
            final int roomId = Integer.parseInt( parts[3] );
            attributes.put("roomId", roomId);

            // set username
            final String[] params = uri.getQuery().split("&");
            final String uname = params[0].split("=")[1];
            attributes.put("username", uname);


        }catch (Exception e){
            return false;

        }

        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
                               Exception exception) {

    }
}
