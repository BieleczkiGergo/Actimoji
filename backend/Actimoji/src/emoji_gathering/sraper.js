function scrape_emojis(){
    const emojis = Array.from(document.querySelectorAll(".applyemojicard5"))
        .map( (domObject) =>
            domObject.innerHTML

        )
    ;

    const keywords = Array.from(document.querySelectorAll(".applyemojicard7"))
        .map( domObject =>
            domObject.innerHTML

        ).map( keywordsStr =>
            keywordsStr.toLowerCase()

        )
    ;

    let pairs = [];

    for (let i = 0; i < emojis.length; i++) {
        pairs.push( {
            "emoji" : emojis[i],
            "keywords" : keywords[i]

        });

    }
    console.log(
        pairs.map( pair =>
            `${pair.emoji} ${pair.keywords}`

        ).join("\n")

    );

}

scrape_emojis();
