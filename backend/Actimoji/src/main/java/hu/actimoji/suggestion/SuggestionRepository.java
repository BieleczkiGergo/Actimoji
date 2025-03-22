package hu.actimoji.suggestion;

import hu.actimoji.word.Word;
import io.micrometer.common.KeyValues;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Date;
import java.util.List;


public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {

    List<Suggestion> findAllByHandledAtIsNull();

    void deleteByWord(Word word);

    void deleteByWordId(Integer id);
}