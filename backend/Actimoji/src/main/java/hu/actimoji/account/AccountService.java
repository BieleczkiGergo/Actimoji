package hu.actimoji.account;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    @PostConstruct
    public void init() {
        Account admin = createAccount("admin", "admin@actimoji.hu", "admin");
        admin.setModerator(true);
        accountRepository.save(admin);

        createAccount("test_user", "test_user@actimoji.hu", "test_user");

        createAccount("jane smith", "jane@actimoji.hu", "jane");

        createAccount("Gipszkarton Emil", "gips@actimoji.hu", "gipszkarton");


    }

    public Account createAccount(String username, String email, String password) {
        Account account = new Account();
        account.setUserName(username);
        account.setEmailAddress(email);
        account.setPassword(passwordEncoder.encode(password));

        return accountRepository.save(account);

    }

    public Account getAccountByUsername(String username) {
        return accountRepository.findByUserName(username);

    }

    public Account getAccountByEmail(String email) {
        return accountRepository.findByEmailAddress(email);

    }

    public boolean validateAccount(Account account, String password) {
        return passwordEncoder.matches(password, account.getPassword());

    }

    public List<Account> listAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByEmailAddress(username);
        if (account == null) {
            System.out.println("Username not found: " + username);
            throw new UsernameNotFoundException(username);

        }

        return new User(
                account.getUserName(),
                account.getPassword(),
                account.getRoles()
                        .stream().map( SimpleGrantedAuthority::new )
                        .toList()
        );
    }
}
