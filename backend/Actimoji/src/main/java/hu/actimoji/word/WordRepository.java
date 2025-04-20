package hu.actimoji.word;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Integer> {

    @Query(nativeQuery = true, value = "SELECT * FROM word LIMIT 10")
    List<Word> getSomeWords();


    @Query(value = "SELECT * FROM word ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Word> getRandomWords( @Param("limit") int limit );

    @Query(value = "SELECT * FROM word LIMIT :limit OFFSET :off", nativeQuery = true)
    List<Word> getWordsPaged( @Param("limit") int limit, @Param("off") int offset );

}
