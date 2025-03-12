package hu.actimoji.moderatorRequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ModeratorRequestRepository extends JpaRepository<ModeratorRequest, Integer> {

}
