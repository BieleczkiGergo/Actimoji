package hu.actimoji.suggestion;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/suggest")
@Tag(name= "Suggestion functions", description = "Suggestions")
public class SuggestionController {
    @Autowired
    private SuggestionService service;

    @PostMapping("/")
    @Operation(summary = "Send a suggestion")
    public void save(@RequestBody SuggestionSave suggestionSave) {
        service.save( suggestionSave );

    }

}
