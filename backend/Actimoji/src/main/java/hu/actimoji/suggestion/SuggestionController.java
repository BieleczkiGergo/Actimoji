package hu.actimoji.suggestion;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/suggest")
@Tag(name= "Suggestion functions", description = "Suggestions")
@CrossOrigin(origins = "http://localhost:3000")
public class SuggestionController {
    @Autowired
    private SuggestionService service;

    @PostMapping("/")
    @Operation(summary = "Send a suggestion")
    public void save(@Valid @RequestBody SuggestionSave suggestionSave) {
        service.save( suggestionSave );

    }

}
