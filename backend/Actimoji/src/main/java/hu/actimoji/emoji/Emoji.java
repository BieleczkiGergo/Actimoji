package hu.actimoji.emoji;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Emoji {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String emoji;

    String keywords;

    public Emoji(Integer id, String emoji, String keywords) {
        this.id = id;
        this.emoji = emoji;
        this.keywords = keywords;
    }

    public Emoji() {

    }

    @Override
    public String toString() {
        return "Emoji{" +
                "id=" + id +
                ", emoji='" + emoji + '\'' +
                ", keywords='" + keywords + '\'' +
                '}';
    }
}
