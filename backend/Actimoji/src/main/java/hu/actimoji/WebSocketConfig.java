package hu.actimoji;


import hu.actimoji.game.GameHandler;
import hu.actimoji.room.RoomInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    GameHandler gameHandler;

    public WebSocketConfig(GameHandler gameHandler) {
        this.gameHandler = gameHandler;

    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler( this.gameHandler, "/game/room/{roomId}" )
                .setAllowedOrigins("*")
                .addInterceptors(new RoomInterceptor());
    }
}
