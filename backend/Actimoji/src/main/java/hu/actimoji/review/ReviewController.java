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

    @PostMapping("/accept/{id}")
    public void acceptReview(@PathVariable Long id, Long userId) {

    }

    @PostMapping("/reject/id")
    public void rejectReview(@PathVariable Long id, Long userId) {

    }

}
