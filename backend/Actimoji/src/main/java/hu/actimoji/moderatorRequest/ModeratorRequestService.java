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

    public ModeratorRequest saveRequest(ModeratorRequest request) {
        if (!accountRepository.existsById(request.getRequested_id()))
            throw new RuntimeException("Account does not exist");

        Account requestedBy = accountRepository.getReferenceById(request.getRequested_id());

        request.setApproved(false);

        return moderatorRequestRepository.save(request);
    }

    public void acceptRequest(Integer id) {
        if (!moderatorRequestRepository.existsById(id))
            throw new RuntimeException();

        ModeratorRequest request = moderatorRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Moderator request not found"));

        request.setApproved(true);

        moderatorRequestRepository.save(request);
    }

    public void rejectRequest(Integer id) {
        if (!moderatorRequestRepository.existsById(id))
            throw new RuntimeException("Moderator request not found");

        ModeratorRequest request = moderatorRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Moderator request not found"));

        request.setApproved(false);

        moderatorRequestRepository.save(request);
    }

    public List<ModeratorRequest> getAllRequests() {
        return moderatorRequestRepository.findAll();
    }
}
