package hu.actimoji.suggestion;

import hu.actimoji.account.Account;
import hu.actimoji.word.Word;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Suggestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "operation")
    private byte type;

    @ManyToOne( cascade = CascadeType.REMOVE )
    @JoinColumn(name = "word_id")
    private Word word;

    private String newWord;
    private String newIcons;
    private String reason;

    @ManyToOne
    @JoinColumn(name = "poster")
    private Account poster;

    private Byte accepted;

    @ManyToOne
    @JoinColumn(name = "handler_mod")
    private Account handlerMod;

    private Date handledAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte getType() {
        return type;
    }

    public void setType(byte type) {
        this.type = type;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }

    public String getNewWord() {
        return newWord;
    }

    public void setNewWord(String newWord) {
        this.newWord = newWord;
    }

    public String getNewIcons() {
        return newIcons;
    }

    public void setNewIcons(String newIcons) {
        this.newIcons = newIcons;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Account getPoster() {
        return poster;
    }

    public void setPoster(Account poster) {
        this.poster = poster;
    }

    public Byte getAccepted() {
        return accepted;
    }

    public void setAccepted(Byte accepted) {
        this.accepted = accepted;
    }

    public Account getHandlerMod() {
        return handlerMod;
    }

    public void setHandlerMod(Account handlerMod) {
        this.handlerMod = handlerMod;
    }

    public Date getHandledAt() {
        return handledAt;
    }

    public void setHandledAt(Date handledAt) {
        this.handledAt = handledAt;
    }
}
