package hu.actimoji;

import hu.actimoji.emoji.EmojiService;
import hu.actimoji.game.GameUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class EmojiValidateTest {

    @Autowired
    EmojiService emojiService;

    List<String> noneBanned = new ArrayList<>();
    List<String> bannedRobot = List.of("\uD83E\uDD16");
    List<String> bannedClown = List.of("\uD83E\uDD21");

    @Test
    public void testEmojiServiceGetAll() {
        Assertions.assertNotNull( emojiService );
        Assertions.assertNotNull( emojiService.findAll() );
        Assertions.assertFalse( emojiService.findAll().isEmpty() );

    }

    @Test
    void basicTestValidEmojis() {
        String valid = "\uD83E\uDD70❤️🐈";
        Assertions.assertTrue( GameUtils.validateEmojis( valid, noneBanned ) );

    }

    @Test
    void basicTestInvalidEmojis() {
        String invalid = "asd";
        Assertions.assertFalse( GameUtils.validateEmojis( invalid, noneBanned ) );

    }

    @Test
    void basicTestAllValid() {
        String[] valid = {
                "\uD83E\uDEE0\uD83D\uDE07\uD83E\uDD16",
                "\uD83E\uDD21\uD83D\uDC7A\uD83D\uDE3F",
                "\uD83D\uDE4A\uD83D\uDCA2\uD83D\uDD73\uFE0F"
        };

        for (String validEmoji : valid) {
            Assertions.assertTrue( GameUtils.validateEmojis( validEmoji, noneBanned ) );

        }
    }

    @Test
    void basicTestAllInvalid() {
        String[] invalid = {
                "\uD83E\uDEE0\uD83D\uDE07a",
                "asdqwe",
                "\uD83D\uDD73\uFE0Fqwe"
        };

        for (String invalidEmoji : invalid) {
            Assertions.assertFalse( GameUtils.validateEmojis( invalidEmoji, noneBanned ) );
        }
    }

    @Test
    void testEmpty() {
        Assertions.assertTrue( GameUtils.validateEmojis( "", noneBanned ) );

    }

    @Test
    void testNull() {
        Assertions.assertTrue( GameUtils.validateEmojis( null, noneBanned ) );

    }

    @Test
    void testBlank() {
        Assertions.assertTrue( GameUtils.validateEmojis( " ", bannedRobot ) );
        Assertions.assertTrue( GameUtils.validateEmojis( "\t", bannedClown ) );
        Assertions.assertTrue( GameUtils.validateEmojis( "\n", bannedClown ) );
        Assertions.assertTrue( GameUtils.validateEmojis( " \t\n", bannedRobot ) );

    }

    @Test
    void testEmojiFilteringValid() {
        Assertions.assertTrue( GameUtils.validateEmojis( "\uD83E\uDD70\uD83D\uDC08", bannedRobot ) );

    }

    @Test
    void testEmojiFilteringInvalid() {
        Assertions.assertFalse( GameUtils.validateEmojis( "\uD83E\uDD70\uD83E\uDD16", bannedRobot ) );
        Assertions.assertFalse( GameUtils.validateEmojis( "\uD83E\uDD70\uD83E\uDD21", bannedClown ) );

    }
}
