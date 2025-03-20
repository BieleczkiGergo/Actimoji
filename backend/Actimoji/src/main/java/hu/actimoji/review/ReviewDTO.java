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

    public Long getSuggestionId() {
        return suggestionId;
    }

    public void setSuggestionId(Long suggestionId) {
        this.suggestionId = suggestionId;
    }

    public Byte getOperation() {
        return operation;
    }

    public void setOperation(Byte operation) {
        this.operation = operation;
    }

    public String getOld_word() {
        return old_word;
    }

    public void setOld_word(String old_word) {
        this.old_word = old_word;
    }

    public String getNew_word() {
        return new_word;
    }

    public void setNew_word(String new_word) {
        this.new_word = new_word;
    }

    public String getOld_icons() {
        return old_icons;
    }

    public void setOld_icons(String old_icons) {
        this.old_icons = old_icons;
    }

    public String getNew_icons() {
        return new_icons;
    }

    public void setNew_icons(String new_icons) {
        this.new_icons = new_icons;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
