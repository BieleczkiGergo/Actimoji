package hu.actimoji.suggestion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/suggest")
public class SuggestionController {
    @Autowired
    private SuggestionService service;

    @PostMapping("/")
    public void save(@RequestBody SuggestionSave suggestionSave) {
        service.save( suggestionSave );

    }

}
