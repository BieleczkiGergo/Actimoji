package hu.actimoji.word;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WordService {

    private static final int pageSize = 20;

    @Autowired
    private WordRepository wordRepository;

    public List<Word> getWords() {
        return wordRepository.findAll();

    }

    public List<Word> getWordsPaged( Integer page ){
        return wordRepository.getWordsPaged( pageSize, page * pageSize );

    }

    public List<WordRead> getWordChoice(int words){
        return wordRepository.getRandomWords( words ).stream()
                .map( WordRead::new )
                .collect(Collectors.toList());

    }
}
