package hu.actimoji.review;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
@Tag(name= "Review functions", description = "Reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @GetMapping
    @Operation(summary = "List all suggestions")
    public List<ReviewDTO> getReviews() {
        return reviewService.getAllReviews();

    }

    @PostMapping("/accept/{suggestionId}")
    @Operation(summary = "Accept a suggestion")
    public void acceptReview(@PathVariable Long suggestionId, @RequestParam Integer userId) {
        System.out.println("accept review");
        reviewService.acceptSuggestion( suggestionId, userId );

    }

    @PostMapping("/reject/{suggestionId}")
    @Operation(summary = "Reject a suggestion")
    public void rejectReview(@PathVariable Long suggestionId, @RequestParam Integer userId) {
        System.out.println("reject review");
        reviewService.rejectSuggestion( suggestionId, userId );

    }

}
