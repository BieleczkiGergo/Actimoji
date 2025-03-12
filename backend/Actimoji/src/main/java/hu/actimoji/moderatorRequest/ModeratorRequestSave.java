package hu.actimoji.moderatorRequest;

import lombok.Data;

@Data
public class ModeratorRequestSave {
    private String reason;
    private long requestedId;
}
