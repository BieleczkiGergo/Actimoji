package hu.actimoji.room;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

@Data
public class RoomRead {

    @JsonProperty("roomId")
    private Long id;
    @JsonProperty("players")
    private int players;

    public RoomRead(Map.Entry<Long, Room> roomEntry) {
        this.id = roomEntry.getKey();
        this.players = roomEntry.getValue().getNumberOfPlayers();

    }

}
