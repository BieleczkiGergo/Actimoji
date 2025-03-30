package hu.actimoji.account;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AccountDTO {

    @NotNull
    @Size(max = 20)
    private String userName;
    @NotNull
    @Size(min = 6, max = 25)
    private String password;
    @Email
    @NotNull
    @Size(max = 40)
    private String emailAddress;

    public @NotNull @Size(max = 20) String getUserName() {
        return userName;
    }

    public void setUserName(@NotNull @Size(max = 20) String userName) {
        this.userName = userName;
    }

    public @NotNull @Size(min = 6, max = 25) String getPassword() {
        return password;
    }

    public void setPassword(@NotNull @Size(min = 6, max = 25) String password) {
        this.password = password;
    }

    public @Email @NotNull @Size(max = 40) String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(@Email @NotNull @Size(max = 40) String emailAddress) {
        this.emailAddress = emailAddress;
    }
}
