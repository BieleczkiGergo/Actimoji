package hu.actimoji.room;

import hu.actimoji.word.WordService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class RoomService {

    Map<Long, Room> rooms = new HashMap<>();
    private long nextRoomId = 1;

    @Autowired
    WordService wordService;

    @PostConstruct
    public void initRooms(){
        final long start_rooms = 5;
        for ( long i = 0; i < start_rooms; i++ ) {
            this.createRoom();

        }


    }

    private void createRoom() {
        Room room = new Room( this.wordService );
        this.rooms.put( nextRoomId, room );
        nextRoomId++;

    }

    public Room getRoom(long roomId) {
        if( rooms.containsKey(roomId)){
            return rooms.get(roomId);

        } else {
            throw new RoomNotFoundException("Room with id " + roomId + " not found");

        }

    }
}
