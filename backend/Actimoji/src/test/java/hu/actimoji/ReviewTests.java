package hu.actimoji;

import hu.actimoji.review.ReviewDTO;
import hu.actimoji.review.ReviewService;
import hu.actimoji.suggestion.SuggestionSave;
import hu.actimoji.suggestion.SuggestionService;
import hu.actimoji.word.Word;
import hu.actimoji.word.WordService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class ReviewTests {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private SuggestionService suggestionService;

    @Autowired
    private WordService wordService;

    @Test
    public void longTest(){
        SuggestionSave suggestionSave = new SuggestionSave();
        suggestionSave.setType( 0 );
        suggestionSave.setWord_id( 1 );
        suggestionSave.setNew_word( "longtest" );
        suggestionSave.setNew_icons("");
        suggestionSave.setReason( "because we are testing" );
        // 2 can mean the user id of anyone except the admin
        suggestionSave.setPoster( 2 );
        suggestionService.save( suggestionSave );

        List<ReviewDTO> reviews = reviewService.getAllReviews();
        ReviewDTO relevant = null;
        for (ReviewDTO review : reviews) {
            if (review.getNew_word().equals( "longtest" )) {
                relevant = review;
                break;

            }
        }
        Assertions.assertNotNull( relevant );

        // 1 is supposed to be the admin
        reviewService.acceptSuggestion( relevant.getSuggestionId(), 1 );

        List<Word> words = wordService.getWords();
        Word relevantWord = null;
        for (Word word : words) {
            if ( word.getWord().equals( "longtest" ) ) {
                relevantWord = word;
                break;
            }
        }
        Assertions.assertNotNull( relevantWord );

    }
}
