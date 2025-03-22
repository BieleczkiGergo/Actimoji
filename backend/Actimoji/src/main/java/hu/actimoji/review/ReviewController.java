package hu.actimoji.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @GetMapping
    public List<ReviewDTO> getReviews() {
        return reviewService.getAllReviews();

    }

    @PostMapping("/accept/{suggestionId}")
    public void acceptReview(@PathVariable Long suggestionId, Integer userId) {
        reviewService.acceptSuggestion( suggestionId, userId );

    }

    @PostMapping("/reject/{suggestionId}")
    public void rejectReview(@PathVariable Long suggestionId, Integer userId) {
        reviewService.rejectSuggestion( suggestionId, userId );

    }

}
