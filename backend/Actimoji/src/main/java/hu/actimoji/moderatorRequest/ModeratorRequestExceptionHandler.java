package hu.actimoji.moderatorRequest;

import hu.actimoji.account.AccountNotFoundException;
import hu.actimoji.account.ExistingAccountException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ModeratorRequestExceptionHandler {

    @ResponseStatus(value = HttpStatus.FORBIDDEN,reason = "You don't have a permission to do it")
    @ExceptionHandler(YouDontHaveAPermissionToDoItException.class)
    public void handleYouDontHaveAPermissionToDoItException(YouDontHaveAPermissionToDoItException ex) {}

    @ResponseStatus(value = HttpStatus.NOT_FOUND,reason = "There is no moderator request with this id")
    @ExceptionHandler(ModeratorRequestNotFoundException.class)
    public void handleModeratorRequestNotFoundException(ModeratorRequestNotFoundException ex) {}
}
