package hu.actimoji.moderatorRequest;

import hu.actimoji.account.Account;
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

    @Autowired
    private ModeratorRequestConverter moderatorRequestConverter;

    @PostMapping("/request")
    @Operation(summary = "Apply for moderator")
    public ModeratorRequest createModeratorRequest(@RequestBody ModeratorRequestDTO moderatorRequestDTO) {
        ModeratorRequest moderatorRequest = moderatorRequestConverter.toEntity(moderatorRequestDTO);
        return moderatorRequestService.createModeratorRequest(moderatorRequest);
    }

    @GetMapping("/review")
    @Operation(summary = "List all moderator requests")
    public List<ModeratorRequest> getModeratorRequests() {
        return moderatorRequestService.listModeratorRequests();
    }

    @PostMapping("/review/accept/{id}")
    @Operation(summary = "Accept a moderator request")
    public ModeratorRequest acceptModeratorRequest(@PathVariable("id") Integer id, @RequestParam("moderatorId") Integer moderatorId) {
        return moderatorRequestService.acceptModeratorRequest(id, moderatorId);
    }

    @DeleteMapping("/review/reject/{id}")
    @Operation(summary = "Reject a moderator request")
    public ModeratorRequest rejectModeratorRequest(@PathVariable("id") Integer id,@RequestParam("moderatorId") Integer moderatorId) {
        return moderatorRequestService.rejectModeratorRequest(id, moderatorId);
    }



}
