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

    @PostMapping("/request")
    @Operation(summary = "Create new moderator request")
    @ResponseStatus(HttpStatus.CREATED)
    public ModeratorRequest saveRequest(@RequestBody ModeratorRequest request) {
        return moderatorRequestService.saveRequest(request);
    }

    @GetMapping("/review")
    public List<ModeratorRequest> getAllRequests() {
        return moderatorRequestService.getAllRequests();
    }

    @PostMapping("/review/accept/{id}")
    public void acceptRequest(@PathVariable Integer id) {
        moderatorRequestService.acceptRequest(id);
    }

    @PostMapping("/review/reject/{id}")
    public void rejectRequest(@PathVariable Integer id) {
        moderatorRequestService.rejectRequest(id);
    }
}
