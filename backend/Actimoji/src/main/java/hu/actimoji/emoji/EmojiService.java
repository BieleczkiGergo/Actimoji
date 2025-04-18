package hu.actimoji.emoji;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class EmojiService {

    @Autowired
    private EmojiRepository emojiRepository;

    @Autowired
    private EmojiParser emojiParser;

    static List<EmojiRead> allEmojis;

    @PostConstruct
    @Transactional
    public void init() {
        try {
            if ( allEmojis == null || allEmojis.isEmpty() ) {
                allEmojis = new LinkedList<>();
                Stream<EmojiRead> emojiInputStream = emojiParser.parseFile("src/main/resources/emojiSource.txt");

                emojiInputStream.forEach( allEmojis::add );

                emojiRepository.saveAll( allEmojis.stream()
                        .map( EmojiConverter::emojiReadtoEmoji )
                        .toList()

                );

            }

        } catch ( IOException e ){
            System.out.println("Error parsing emojis");

        }

        emojiRepository.saveAll( allEmojis.stream()
                .map( EmojiConverter::emojiReadtoEmoji )
                .toList()
        );

    }

    /**
     * This returns everything from a cache, because reading all emojis from database every time someone starts a game
     * would take a big load on the backend
     * @return All emojis as EmojiRead objects
     */
    public List<EmojiRead> findAll() {
        return allEmojis;

    }
}
