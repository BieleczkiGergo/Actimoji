package hu.actimoji.account;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.security.auth.login.AccountException;

@ControllerAdvice
public class AccountExceptionHandler {

    @ResponseStatus(value = HttpStatus.CONFLICT,reason = "Account already exists")
    @ExceptionHandler(ExistingAccountException.class)
    public void handleExistingAccountException(ExistingAccountException ex) {}

    @ResponseStatus(value = HttpStatus.NOT_FOUND,reason = "You don't have an account")
    @ExceptionHandler(AccountNotFoundException.class)
    public void handleAccountNotFoundException(AccountNotFoundException ex) {}
}
