package hu.actimoji.account;

public class AccountConverter {
    public static Account toEntity(AccountDTO dto) {
        Account account = new Account();
        account.setUserName(dto.getUserName());
        account.setPassword(dto.getPassword());
        account.setEmailAddress(dto.getEmailAddress());
        account.setModerator(false);
        return account;
    }
}
