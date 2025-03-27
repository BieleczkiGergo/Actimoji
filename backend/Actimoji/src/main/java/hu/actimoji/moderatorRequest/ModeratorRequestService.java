package hu.actimoji.moderatorRequest;

import hu.actimoji.account.Account;
import hu.actimoji.account.AccountNotFoundException;
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

    public ModeratorRequest createModeratorRequest(ModeratorRequest moderatorRequest) {
        return moderatorRequestRepository.save(moderatorRequest);
    }

    public List<ModeratorRequest> listModeratorRequests() {
        return moderatorRequestRepository.findAll();
    }

    public ModeratorRequest acceptModeratorRequest(Integer id, Integer moderatorId) {
        ModeratorRequest modRequest = moderatorRequestRepository.findById(id).orElseThrow(ModeratorRequestNotFoundException::new);

        Account moderatorAccount = accountRepository.findById(moderatorId).orElseThrow(AccountNotFoundException::new);

        if (!moderatorAccount.isModerator()) {
            throw new YouDontHaveAPermissionToDoItException();
        }

        modRequest.setApproved(true);
        modRequest.setApprovedBy(moderatorAccount);

        Account requestedUser = modRequest.getRequested();
        requestedUser.setModerator(true);
        accountRepository.save(requestedUser);

        moderatorRequestRepository.save(modRequest);
        moderatorRequestRepository.delete(modRequest);

        return modRequest;
    }

    public ModeratorRequest rejectModeratorRequest(Integer id, Integer moderatorId) {
        ModeratorRequest modRequest = moderatorRequestRepository.findById(id).orElseThrow(ModeratorRequestNotFoundException::new);

        Account moderatorAccount = accountRepository.findById(moderatorId).orElseThrow(AccountNotFoundException::new);

        if (!moderatorAccount.isModerator()) {
            throw new YouDontHaveAPermissionToDoItException();
        }

        modRequest.setApproved(false);
        modRequest.setApprovedBy(moderatorAccount);

        moderatorRequestRepository.save(modRequest);
        moderatorRequestRepository.delete(modRequest);

        return modRequest;
    }
}
