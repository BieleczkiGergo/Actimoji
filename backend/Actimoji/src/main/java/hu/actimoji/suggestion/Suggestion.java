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
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "operation")
    private SuggestionType type;

    @ManyToOne
    @JoinColumn(name = "word_id")
    private Word word;

    private String newWord;
    private String newIcons;
    private String reason;

    @ManyToOne
    @JoinColumn(name = "poster")
    private Account poster;

    @ManyToOne
    @JoinColumn(name = "handler_mod")
    private Account handlerMod;

    private Date handledAt;
}
