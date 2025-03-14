package hu.actimoji.moderatorRequest;

import hu.actimoji.account.Account;
import hu.actimoji.account.AccountNotFoundException;
import hu.actimoji.account.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModeratorRequestService {

    @Autowired
    private ModeratorRequestRepository moderatorRequestRepository;

    @Autowired
    private AccountRepository accountRepository;


    public ModeratorRequest createModeratorRequest(ModeratorRequest moderatorRequest) {
        Optional<Account> account = accountRepository.findById(moderatorRequest.getRequested().getId());
        if (account.isEmpty()) {
            throw new AccountNotFoundException();
        }
        moderatorRequest.setApprovedBy(null);
        return moderatorRequestRepository.save(moderatorRequest);
    }

    public List<ModeratorRequest> listModeratorRequests() {

        return moderatorRequestRepository.findAll();
    }

    public ModeratorRequest acceptModeratorRequest(Integer id,  Integer moderatorId) {
        Optional<ModeratorRequest> request = moderatorRequestRepository.findById(id);
        if (request.isEmpty()) {
            throw new ModeratorRequestNotFoundException();
        }

        Optional<Account> moderatorAccount = accountRepository.findById(moderatorId);
        if (moderatorAccount.isEmpty()) {
            throw new AccountNotFoundException();
        }

        if (!moderatorAccount.get().isModerator()){
            throw new YouDontHaveAPermissionToDoItException();
        }

        ModeratorRequest modRequest = request.get();
        modRequest.setApproved(true);
        modRequest.setApprovedBy(moderatorAccount.get());

        Account requestedUser = modRequest.getRequested();
        requestedUser.setModerator(true);
        accountRepository.save(requestedUser);

        return moderatorRequestRepository.save(modRequest);
    }


    public ModeratorRequest rejectModeratorRequest(Integer id, Integer moderatorId) {
        Optional<ModeratorRequest> request = moderatorRequestRepository.findById(id);
        if (request.isEmpty()) {
            throw new ModeratorRequestNotFoundException();
        }
        Optional<Account> moderatorAccount = accountRepository.findById(moderatorId);
        if (moderatorAccount.isEmpty()) {
            throw new AccountNotFoundException();
        }

        if (!moderatorAccount.get().isModerator()){
            throw new YouDontHaveAPermissionToDoItException();
        }

        ModeratorRequest modRequest = request.get();
        modRequest.setApproved(false);
        modRequest.setApprovedBy(moderatorAccount.get());

        return moderatorRequestRepository.save(modRequest);
    }
}
