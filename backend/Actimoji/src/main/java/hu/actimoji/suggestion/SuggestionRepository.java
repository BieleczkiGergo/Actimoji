package hu.actimoji.suggestion;

import org.springframework.data.jpa.repository.JpaRepository;


public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {

}