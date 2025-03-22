package hu.actimoji.review;

import hu.actimoji.account.Account;
import hu.actimoji.account.AccountRepository;
import hu.actimoji.suggestion.Suggestion;
import hu.actimoji.suggestion.SuggestionRepository;
import hu.actimoji.word.Word;
import hu.actimoji.word.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    SuggestionRepository suggestionRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ReviewConverter reviewConverter;

    @Autowired
    WordRepository wordRepository;

    public List<ReviewDTO> getAllReviews() {
        return suggestionRepository.findAllByHandledAtIsNull()
                .stream().map( reviewConverter::toReviewDTO )
                .collect(Collectors.toList());

    }

    public void acceptSuggestion(Long reviewId, Integer handlerModId) {
        Suggestion suggestion = suggestionRepository.findById(reviewId).orElse(null);

        Account handlerMod = accountRepository.findById(handlerModId).orElse(null);
        suggestion.setHandlerMod( handlerMod );
        suggestion.setHandledAt( new Date() );

        suggestion.setAccepted( (byte) 1 );

        suggestionRepository.save( suggestion );
        this.completeSuggestion( suggestion );

    }

    public void rejectSuggestion(Long reviewId, Integer handlerModId) {
        Suggestion suggestion = suggestionRepository.findById(reviewId).orElse(null);

        Account handlerMod = accountRepository.findById(handlerModId).orElse(null);
        suggestion.setHandlerMod( handlerMod );
        suggestion.setHandledAt( new Date() );

        suggestion.setAccepted( (byte) 0 );

        suggestionRepository.save( suggestion );

    }

    public void completeSuggestion(Suggestion suggestion) {
        if( suggestion.getType() == 0 ){
            Word word = new Word();
            word.setWord( suggestion.getNewWord() );
            word.setBannedIcons( suggestion.getNewIcons() );
            wordRepository.save( word );

        } else if ( suggestion.getType() == 1 ) {
            Word word = suggestion.getWord();
            word.setWord( suggestion.getNewWord() );
            word.setBannedIcons( suggestion.getNewIcons() );
            wordRepository.save( word );

        }else {
            Word word = suggestion.getWord();
            suggestionRepository.deleteByWordId( word.getId() );
            wordRepository.delete( word );

        }

    }
}
