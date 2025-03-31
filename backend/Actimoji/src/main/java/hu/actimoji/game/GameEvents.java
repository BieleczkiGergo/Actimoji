package hu.actimoji.game;

public enum GameEvents {

    // lifecycle events
    Waiting,
    RoundPrepare,
    Round,
    RoundOver,
    GameOver,

    // non-lifecycle events
    PlayerUpdate,
    SendChatMessage, // text message
    SendDescription, // text message consisting only of emojis
    SendHelp,

    Error, // error description

}
