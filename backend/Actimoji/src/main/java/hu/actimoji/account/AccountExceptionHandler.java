package hu.actimoji.account;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.security.auth.login.AccountException;

@ControllerAdvice
public class AccountExceptionHandler {

    @ResponseStatus(value = HttpStatus.CONFLICT,reason = "Account already exists")
    @ExceptionHandler(AccountException.class)
    public void handleAccountException(AccountException ex) {}
}
