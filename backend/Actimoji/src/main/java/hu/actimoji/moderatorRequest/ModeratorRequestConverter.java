package hu.actimoji.moderatorRequest;

import hu.actimoji.account.Account;
import hu.actimoji.account.AccountNotFoundException;
import hu.actimoji.account.AccountRepository;
import hu.actimoji.moderatorRequest.ModeratorRequest;
import hu.actimoji.moderatorRequest.ModeratorRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModeratorRequestConverter {

    @Autowired
    private AccountRepository accountRepository;

    public ModeratorRequest toEntity(ModeratorRequestDTO dto) {
        ModeratorRequest request = new ModeratorRequest();
        request.setReason(dto.getReason());
        request.setApproved(false);

        Account account = accountRepository.findById(dto.getRequestedId())
                .orElseThrow(() -> new AccountNotFoundException());

        request.setRequested(account);
        return request;
    }
}
