package hu.actimoji.word;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/words")
public class WordController {

    private final WordService wordService = new WordService();

    @GetMapping("/query")
    public List<Word> queryWords() {
        return wordService.getWords();

    }
}
