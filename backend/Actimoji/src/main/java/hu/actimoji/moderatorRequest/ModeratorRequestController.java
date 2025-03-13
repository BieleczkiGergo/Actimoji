package hu.actimoji.moderatorRequest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mod")
@Tag(name= "Moderator request functions", description = "Moderator requests")
public class ModeratorRequestController {
    @Autowired
    private ModeratorRequestService moderatorRequestService;


}
