package hu.actimoji.moderatorRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mod")
public class ModeratorRequestController {
    @Autowired
    private ModeratorRequestService moderatorRequestService;

    @PostMapping("/request")
    public ModeratorRequest saveRequest(@RequestBody ModeratorRequest request) {
        return moderatorRequestService.saveRequest(request);
    }

    @GetMapping("/review")
    public List<ModeratorRequest> getAllRequests() {
        return moderatorRequestService.getAllRequests();
    }

    @PostMapping("/review/accept/{id}")
    public void acceptRequest(@PathVariable Long id) {
        moderatorRequestService.acceptRequest(id);
    }

    @PostMapping("/review/reject/{id}")
    public void rejectRequest(@PathVariable Long id) {
        moderatorRequestService.rejectRequest(id);
    }
}
