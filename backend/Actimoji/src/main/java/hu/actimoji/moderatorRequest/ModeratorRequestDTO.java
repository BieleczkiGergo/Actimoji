package hu.actimoji.moderatorRequest;

import jakarta.validation.constraints.NotNull;

public class ModeratorRequestDTO {
    @NotNull
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
