package hu.actimoji.suggestion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuggestionService {
    @Autowired
    private SuggestionRepository suggestionRepository;

    @Autowired
    private SuggestionConverter converter;

    public void save(SuggestionSave suggestionSave) {
        Suggestion suggestion = converter.toSuggestion(suggestionSave);

        suggestionRepository.save( suggestion );

    }
}
