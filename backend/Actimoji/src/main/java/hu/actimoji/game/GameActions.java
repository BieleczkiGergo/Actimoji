package hu.actimoji.game;

public enum GameActions {

    GameStart, // no args
    RoundStart, // when the round ends
    GameOver, // no args
    RoundOver, // no args

    SendChatMessage, // text message
    SendDescription, // text message consisting only of emojis

    SetDescribing, // no args
    UnsetDescribing, // no args
    WordChoice, // 3 words, separated by semicolons

    GuessedWord, // no args

    PlayerJoined, // player name
    PlayerLeft, // player name


    Error, // error description

}
