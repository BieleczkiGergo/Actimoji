package hu.actimoji.moderatorRequest;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ModeratorRequestDTO {
    @NotNull
    @Size(max = 100)
    private String reason;

    @NotNull
    private Integer requestedId;

    public @NotNull String getReason() {
        return reason;
    }

    public void setReason(@NotNull String reason) {
        this.reason = reason;
    }

    public Integer getRequestedId() {
        return requestedId;
    }

    public void setRequestedId(Integer requestedId) {
        this.requestedId = requestedId;
    }
}
