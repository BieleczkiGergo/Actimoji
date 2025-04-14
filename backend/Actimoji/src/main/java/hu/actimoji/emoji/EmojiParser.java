package hu.actimoji.emoji;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class EmojiParser {

    public Stream<EmojiRead> parseFile(String fileName ) throws IOException {
        Path path = Paths.get(fileName);

        return Files.lines( path )
                .map( line -> {
                    String[] split = line.split(" ");

                    String keywords = Arrays.stream( split )
                            .skip(1)
                            .collect(Collectors.joining(" "));

                    return new EmojiRead( split[0], keywords );

                });
    }
}
