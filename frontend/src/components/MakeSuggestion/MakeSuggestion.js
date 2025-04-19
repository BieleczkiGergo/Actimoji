import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import styles from "./MakeSuggestion.module.css";
import ListWords from "../ListWords/ListWords";
import { EmojiKeyboard, removeLastEmoji } from "../Keyboard/EmojiKeyboard.jsx";

function MakeSuggestion() {
    const { token, user } = useAuth();
    const [activeTab, setActiveTab] = useState("Create");
    const [type, setType] = useState(0);
    const [poster] = useState(user?.id || 1);
    const [selectedWord, setSelectedWord] = useState(null);
    const [openListWords, setOpenListWords] = useState(false);

    const [emojiValue, setEmojiValue] = useState("");
    const emojiInputRef = useRef(null);
    const emojiKeyboardRef = useRef(null);
    const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleTabChange = (tab, typeValue) => {
        setActiveTab(tab);
        setType(typeValue);
        setSelectedWord(null);
    };

    const handleWordSelect = (word) => {
        setSelectedWord(word);
        setOpenListWords(false);
    };

    const onSubmit = (data) => {
        const payload = {
            type,
            word_id: selectedWord ? selectedWord.id : 1,
            reason: data.reason,
            poster
        };

        if (type === 0 || type === 1) {
            payload.new_word = data.new_word;
            payload.new_icons = emojiValue;
        }

        axios.post("http://localhost:8080/suggest/", payload, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log("Successfully submitted:", response.data);
                reset();
                setEmojiValue("");
                setSelectedWord(null);
            })
            .catch(error => {
                console.error("Error occurred during submission:", error);
            });
    };

    const handleEmojiSelect = (emoji) => {
        const input = emojiInputRef.current;
        if (input) {
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const newValue = emojiValue.slice(0, start) + emoji + emojiValue.slice(end);
            setEmojiValue(newValue);
            setTimeout(() => {
                input.setSelectionRange(start + emoji.length, start + emoji.length);
                input.focus();
            }, 0);
        }
    };

    const handleEmojiDelete = () => {
        const newValue = removeLastEmoji(emojiValue);
        setEmojiValue(newValue);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiKeyboardRef.current &&
                !emojiKeyboardRef.current.contains(event.target) &&
                !emojiInputRef.current.contains(event.target)
            ) {
                setShowEmojiKeyboard(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div>
                <button className={styles.mainButtons} onClick={() => handleTabChange("Create", 0)}>Create</button>
                <button className={styles.mainButtons} onClick={() => handleTabChange("Modify", 1)}>Modify</button>
                <button className={styles.mainButtons} onClick={() => handleTabChange("Delete", 2)}>Delete</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.inputsContainer}>
                {(activeTab === "Modify" || activeTab === "Delete") && (
                    <>
                        <button type="button" onClick={() => setOpenListWords(true)} className={styles.mainButtons}>
                            Select Old Word
                        </button>
                        {selectedWord && <p>Selected: {selectedWord.word}</p>}
                    </>
                )}

                {(activeTab === "Create" || activeTab === "Modify") && (
                    <>
                        <input
                            {...register("new_word", { required: "Word is required!" })}
                            className={styles.wordInput}
                            type="text"
                            placeholder="Word"
                        />
                        {errors.new_word && <p className={styles.error}>{errors.new_word.message}</p>}

                        <input
                            ref={emojiInputRef}
                            className={styles.emojiInput}
                            type="text"
                            placeholder="Emoji"
                            value={emojiValue}
                            onChange={(e) => setEmojiValue(e.target.value)}
                            onFocus={() => setShowEmojiKeyboard(true)}
                        />
                        {errors.new_icons && <p className={styles.error}>{errors.new_icons.message}</p>}

                        {showEmojiKeyboard && (
                            <div ref={emojiKeyboardRef}>
                                <EmojiKeyboard
                                    onEmojiSelect={handleEmojiSelect}
                                    onEmojiDelete={handleEmojiDelete}
                                />
                            </div>
                        )}
                    </>
                )}

                <input
                    {...register("reason", { required: "Reason is required!" })}
                    className={styles.textField}
                    type="text"
                    placeholder="Reason for ..."
                />
                {errors.reason && <p className={styles.error}>{errors.reason.message}</p>}

                <button type="submit" className={styles.sendButton}>
                    {activeTab}
                </button>
            </form>

            <ListWords open={openListWords} onClose={() => setOpenListWords(false)} onSelect={handleWordSelect} />
        </>
    );
}

export default MakeSuggestion;
