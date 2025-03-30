package hu.actimoji.security;

import hu.actimoji.account.Account;
import hu.actimoji.account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class AuthController {

    @Autowired
    AccountService accountService;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginDto loginDto) {
        Account account = accountService.getAccountByUsername( loginDto.getUsername() );

        if (account == null) {
            return new LoginResponse("", "User not found");

        }

        if (!accountService.validateAccount( account, loginDto.getPassword()) ){
            return new LoginResponse("", "Wrong password");

        }

        return new LoginResponse(jwtUtil.generateToken( account ), "Success");

    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public LoginResponse register(@RequestBody RegisterDTO registerDTO) {
        Account account = accountService.getAccountByEmail( registerDTO.getEmail() );

        if (account != null) {
            return new LoginResponse("", "Account already exists");

        }

        account = accountService.createAccount( registerDTO.getUsername(), registerDTO.getEmail(), registerDTO.getPassword() );

        return new LoginResponse(jwtUtil.generateToken( account ), "Success");

    }

}
