package hu.actimoji.moderatorRequest;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hu.actimoji.account.Account;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotNull
    @Size(max = 100)
    private String reason;
    private boolean approved;

    @ManyToOne
    @JoinColumn(name = "requested_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Account requested;

    @ManyToOne
    @JoinColumn(name = "approved_id")
    private Account approvedBy;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public Account getRequested() {
        return requested;
    }

    public void setRequested(Account requested) {
        this.requested = requested;
    }

    public Account getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(Account approvedBy) {
        this.approvedBy = approvedBy;
    }
}
