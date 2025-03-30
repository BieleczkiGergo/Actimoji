package hu.actimoji.word;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordService {

    @Autowired
    private WordRepository wordRepository;

    public List<Word> getWords() {
        return wordRepository.findAll();

    }
}
