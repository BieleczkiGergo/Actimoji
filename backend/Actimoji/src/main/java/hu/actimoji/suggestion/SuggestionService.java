package hu.actimoji.suggestion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuggestionService {
    @Autowired
    private SuggestionRepository suggestionRepository;

    public Suggestion createSuggestion(Suggestion suggestion) {
        return suggestionRepository.save(suggestion);
    }

    public Suggestion modifySuggestion(Long id, Suggestion updatedSuggestion) {
        Suggestion suggestion = suggestionRepository.findById(id).orElseThrow();
        suggestion.setWord(updatedSuggestion.getWord());
        suggestion.setBannedEmojis(updatedSuggestion.getBannedEmojis());
        suggestion.setModerated(updatedSuggestion.isModerated());
        return suggestionRepository.save(suggestion);
    }

    public void deleteSuggestion(Long id) {
        suggestionRepository.deleteById(id);
    }
}
