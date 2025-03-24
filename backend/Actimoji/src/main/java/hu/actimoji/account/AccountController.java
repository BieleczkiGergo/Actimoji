package hu.actimoji.account;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@Tag(name="Account functions", description = "Manage accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/registration")
    @Operation(summary = "Create new account")
    public Account createAccount(@Valid @RequestBody AccountDTO accountDTO) {
        Account account = AccountConverter.toEntity(accountDTO);
        return accountService.createAccount(account);
    }

    @GetMapping("/list")
    @Operation(summary = "List all users")
    public List<Account> listGladiators() {
        return accountService.listAccounts();
    }


}
