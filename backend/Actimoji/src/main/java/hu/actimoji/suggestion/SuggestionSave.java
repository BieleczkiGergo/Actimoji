package hu.actimoji.suggestion;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SuggestionSave {

    private Integer type;
    private Integer word_id;
    private String new_word;
    private String new_icons;
    private String reason;
    private Integer poster;

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getWord_id() {
        return word_id;
    }

    public void setWord_id(Integer word_id) {
        this.word_id = word_id;
    }

    public String getNew_word() {
        return new_word;
    }

    public void setNew_word(String new_word) {
        this.new_word = new_word;
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

    public Integer getPoster() {
        return poster;
    }

    public void setPoster(Integer poster) {
        this.poster = poster;
    }
}
