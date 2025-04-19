package hu.actimoji.emoji;

import jakarta.persistence.*;

@Entity
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmoji() {
        return emoji;
    }

    public void setEmoji(String emoji) {
        this.emoji = emoji;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }
}
