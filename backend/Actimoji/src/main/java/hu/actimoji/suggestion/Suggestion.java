package hu.actimoji.suggestion;


import hu.actimoji.word.Word;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Suggestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "word_id")
    @Nullable
    private Word word;
    private String bannedEmojis;
    private boolean isModerated;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Nullable
    public Word getWord() {
        return word;
    }

    public void setWord(@Nullable Word word) {
        this.word = word;
    }

    public String getBannedEmojis() {
        return bannedEmojis;
    }

    public void setBannedEmojis(String bannedEmojis) {
        this.bannedEmojis = bannedEmojis;
    }

    public boolean isModerated() {
        return isModerated;
    }

    public void setModerated(boolean moderated) {
        isModerated = moderated;
    }
}
