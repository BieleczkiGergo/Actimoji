package hu.actimoji.emoji;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/emoji")
public class EmojiController {

    @Autowired
    private EmojiService emojiService;

    @GetMapping("/getAll")
    public List<EmojiRead> getAll() {
        return emojiService.findAll();

    }

}
