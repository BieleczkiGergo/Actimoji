package hu.actimoji.word;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/words")
@Tag(name="Word functions", description = "Manage words")
@CrossOrigin(origins = "http://localhost:3000")
public class WordController {

    @Autowired
    private WordService wordService;

    @GetMapping("/query")
    @Operation(summary = "List all words")
    public List<Word> queryWords( @RequestParam(required = false) Integer page ) {
        return wordService.getWordsPaged(page);

    }
}
