package hu.actimoji.moderatorRequest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class YouDontHaveAPermissionToDoItException extends RuntimeException {
}
