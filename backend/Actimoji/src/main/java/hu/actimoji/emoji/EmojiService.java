package hu.actimoji.emoji;

import hu.actimoji.game.GameUtils;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class EmojiService {

    @Autowired
    private EmojiRepository emojiRepository;

    @Autowired
    private EmojiParser emojiParser;

    List<EmojiRead> allEmojis;

    @PostConstruct
    @Transactional
    public void init() {
        try {
            emojiParser.parseFile("src/main/resources/emojiSource.txt")
                    .map( emojiRead ->
                            new Emoji(null, emojiRead.getEmoji(), emojiRead.getKeywords())
                    )
                    .forEach( emoji -> {
                        emojiRepository.save( emoji );

                    });

        } catch ( IOException e ){
            System.out.println("Error parsing emojis");

        }

        allEmojis = emojiRepository.findAll().stream()
                .map( emoji -> new EmojiRead(emoji.getEmoji(), emoji.getKeywords()) )
                .toList();

    }

    public List<EmojiRead> findAll() {
        return allEmojis;

    }
}
