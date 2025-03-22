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

}
