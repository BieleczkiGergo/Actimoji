package hu.actimoji.suggestion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {

    List<Suggestion> findAllByHandledAtIsNull();

    @Modifying
    @Query("DELETE FROM Suggestion s WHERE s.word.id = :wordId")
    int deleteByWordId( @Param("wordId") Integer wordId);

}