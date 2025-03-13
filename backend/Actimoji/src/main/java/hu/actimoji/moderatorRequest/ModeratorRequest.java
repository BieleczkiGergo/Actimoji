package hu.actimoji.moderatorRequest;

import hu.actimoji.account.Account;
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
@Table(name = "modrequest")
public class ModeratorRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String reason;
    private boolean approved;

    @ManyToOne
    @JoinColumn(name = "requested_id")
    private Account requested;

    @ManyToOne
    @JoinColumn(name = "approved_id")
    private Account approvedBy;
}
