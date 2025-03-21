package hu.actimoji.room;

import java.util.HashMap;
import java.util.Map;

public class RoomService {


    Map<Integer, Room> rooms = new HashMap<>();

    public void initRooms(){


    }

    public Room getRoom(int roomId) {
        if( rooms.containsKey(roomId)){
            return rooms.get(roomId);

        } else {
            throw new RoomNotFoundException("Room with id " + roomId + " not found");

        }

    }
}
