package hu.actimoji.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Account createAccount(Account account) {
        Account existingAccount = accountRepository.findByEmailAddress(account.getEmailAddress());
        if (existingAccount != null) {
            throw new ExistingAccountException();
        }
        account.setId(null);
        return accountRepository.save(account);
    }

    public List<Account> listAccounts() {
        return accountRepository.findAll();
    }
}
