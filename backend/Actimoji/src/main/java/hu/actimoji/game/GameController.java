package hu.actimoji.game;

import hu.actimoji.room.RoomRead;
import hu.actimoji.room.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/")
    public List<RoomRead> getRooms() {
        return roomService.getRooms();

    }

    @GetMapping("/random")
    public Long getRandomRoom(){
        return roomService.getRandomRoomId();

    }

}
