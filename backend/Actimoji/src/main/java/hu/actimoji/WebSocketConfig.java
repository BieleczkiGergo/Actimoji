package hu.actimoji;


import hu.actimoji.room.RoomHandler;
import hu.actimoji.room.RoomInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler( new RoomHandler(), "/game/room/{roomId}" )
                .setAllowedOrigins("*")
                .addInterceptors(new RoomInterceptor());
    }
}
