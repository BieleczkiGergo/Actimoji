package hu.actimoji.review;

import hu.actimoji.suggestion.Suggestion;
import hu.actimoji.word.Word;
import hu.actimoji.word.WordRepository;
import hu.actimoji.word.WordService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {

    private Long suggestionId;
    private Byte operation;
    private String old_word;
    private String new_word;
    private String old_icons;
    private String new_icons;
    private String reason;

    public ReviewDTO(Suggestion suggestion) {
        this.suggestionId = suggestion.getId();
        this.operation = suggestion.getType();
        this.reason = suggestion.getReason();
        this.new_word = suggestion.getNewWord();
        this.new_icons = suggestion.getNewIcons();

        Word old_word = suggestion.getWord();
        if (old_word != null) {
            this.old_word = old_word.getWord();
            this.old_icons = old_word.getBannedIcons();

        }

    }
}
