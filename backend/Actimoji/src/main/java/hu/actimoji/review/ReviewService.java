package hu.actimoji.review;

import hu.actimoji.suggestion.SuggestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    SuggestionRepository suggestionRepository;

    public List<ReviewDTO> getAllReviews() {
        return suggestionRepository.findAll().stream().map(ReviewDTO::new).collect(Collectors.toList());

    }
}
