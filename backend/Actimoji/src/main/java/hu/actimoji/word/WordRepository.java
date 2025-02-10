package hu.actimoji.word;

import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WordRepository extends CrudRepository<Word, Long> {

    @NativeQuery("SELECT * FROM words LIMIT 10")
    List<Word> getSomeWords();


}
