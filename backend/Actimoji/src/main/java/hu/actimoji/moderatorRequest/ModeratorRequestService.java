package hu.actimoji.moderatorRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ModeratorRequestService {

    @Autowired
    private ModeratorRequestRepository moderatorRequestRepository;

    public List<ModeratorRequest> getAllRequests() {
        return moderatorRequestRepository.findAll();
    }

    public ModeratorRequest saveRequest(ModeratorRequest request) {
        return moderatorRequestRepository.save(request);
    }

    public void acceptRequest(Long id) {
        ModeratorRequest request = moderatorRequestRepository.findById(id).orElseThrow();
        request.setApproved(true);
        moderatorRequestRepository.save(request);
    }

    public void rejectRequest(Long id) {
        moderatorRequestRepository.deleteById(id);
    }
}
