package hu.actimoji.moderatorRequest;

import hu.actimoji.account.Account;
import hu.actimoji.account.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModeratorRequestService {

    @Autowired
    private ModeratorRequestRepository moderatorRequestRepository;

    @Autowired
    private AccountRepository accountRepository;


}
