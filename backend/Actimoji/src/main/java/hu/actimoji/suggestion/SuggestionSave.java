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

}
