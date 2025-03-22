package hu.actimoji.review;

import hu.actimoji.account.AccountRepository;
import hu.actimoji.suggestion.Suggestion;
import hu.actimoji.suggestion.SuggestionRepository;
import hu.actimoji.word.Word;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class ReviewConverter {

    @Autowired
    SuggestionRepository suggestionRepository;
    @Autowired
    AccountRepository accountRepository;

    public ReviewDTO toReviewDTO(Suggestion suggestion) {
        ReviewDTO reviewDTO = new ReviewDTO();


        reviewDTO.setSuggestionId(suggestion.getId());
        reviewDTO.setOperation(suggestion.getType());
        reviewDTO.setReason(suggestion.getReason());
        reviewDTO.setNew_word(suggestion.getNewWord());
        reviewDTO.setNew_icons(suggestion.getNewIcons());

        Word old_word = suggestion.getWord();
        if (old_word != null) {
            reviewDTO.setOld_word(old_word.getWord());
            reviewDTO.setOld_icons(old_word.getBannedIcons());

        }

        return reviewDTO;
    }

    public Suggestion toSuggestion(ReviewDTO reviewDTO, Integer handlerModId) throws NullPointerException {
        Suggestion suggestion = suggestionRepository.findById(reviewDTO.getSuggestionId()).orElse(null);

        suggestion.setHandlerMod( accountRepository.findById(handlerModId).orElse(null) );
        suggestion.setHandledAt( new Date(null) );

        return suggestion;
    }
}
