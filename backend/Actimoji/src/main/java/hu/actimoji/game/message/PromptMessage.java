package hu.actimoji.game.message;

public class PromptMessage extends Message {

    private String prompt;

    public PromptMessage(String prompt) {
        this.prompt = prompt;

    }

    @Override
    public String toJsonString() {
        return "";
    }
}
