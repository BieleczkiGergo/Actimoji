package hu.actimoji.suggestion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SuggestionController {
    @Autowired
    private SuggestionService suggestionService;

    @PostMapping("/create")
    public Suggestion createSuggestion(@RequestBody Suggestion suggestion) {
        return suggestionService.createSuggestion(suggestion);
    }

    @PostMapping("/modify/{id}")
    public Suggestion modifySuggestion(@PathVariable Long id, @RequestBody Suggestion updatedSuggestion) {
        return suggestionService.modifySuggestion(id, updatedSuggestion);
    }

    @PostMapping("/delete/{id}")
    public void deleteSuggestion(@PathVariable Long id) {
        suggestionService.deleteSuggestion(id);
    }
}
