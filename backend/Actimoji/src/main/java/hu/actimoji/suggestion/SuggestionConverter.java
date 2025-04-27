package hu.actimoji.suggestion;

import hu.actimoji.account.Account;
import hu.actimoji.account.AccountRepository;
import hu.actimoji.word.Word;
import hu.actimoji.word.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SuggestionConverter {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private WordRepository wordRepository;

    public Suggestion toSuggestion(SuggestionSave suggestionSave) {
        Suggestion suggestion = new Suggestion();

        suggestion.setType( (byte) ((int) suggestionSave.getType()) );
        suggestion.setNewWord(suggestionSave.getNew_word());
        suggestion.setNewIcons(suggestionSave.getNew_icons());
        suggestion.setReason(suggestionSave.getReason());

        // suggestion.setId( null ); // not needed, because it's the default value
        suggestion.setAccepted( (byte) 0 );
        suggestion.setHandlerMod( null );
        suggestion.setHandledAt( null );

        Account poster = accountRepository.findById( suggestionSave.getPoster() ).get();
        suggestion.setPoster( poster );

        // TODO: Implement default actions if word is null
        Word word = wordRepository.findById( suggestionSave.getWord_id() ).get();
        suggestion.setWord( word );

        return suggestion;
    }

}
