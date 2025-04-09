package hu.actimoji.account;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@Tag(name="Account functions", description = "Manage accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/list")
    @Operation(summary = "List all users")
    public List<Account> listUsers() {
        return accountService.listAccounts();
    }



}
