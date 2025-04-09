import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../Context/AuthContext"; // Importáljuk az AuthContext-et
import styles from "./MakeSuggestion.module.css";
import ListWords from "../ListWords/ListWords";

function MakeSuggestion() {
    const { token, user } = useAuth(); // Token és user beszerzése az AuthContext-ből
    const [activeTab, setActiveTab] = useState("Create");
    const [type, setType] = useState(0);  // "operation" átnevezve "type"-ra
    const [poster, setPoster] = useState(user?.sub || 1);  // A bejelentkezett user ID-ja (vagy 1, ha nincs bejelentkezve)
    const [selectedWord, setSelectedWord] = useState(null);  // A kiválasztott szó
    const [openListWords, setOpenListWords] = useState(false);  // ListWords modál állapota

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleTabChange = (tab, typeValue) => {
        setActiveTab(tab);
        setType(typeValue);
        setSelectedWord(null);  // Töröljük a kiválasztott szót, ha új tabra váltunk
    };

    const handleWordSelect = (word) => {
        setSelectedWord(word);  // Beállítjuk a kiválasztott szót
        setOpenListWords(false);  // Bezárjuk a modált
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:8080/suggest/", {
            type: type,  // "operation" átnevezve "type"-ra
            word_id: selectedWord ? selectedWord.id : 1,  // Ha nincs kiválasztott szó, akkor 1 (Create esetén)
            new_word: data.new_word,
            new_icons: data.new_icons,
            reason: data.reason,
            poster: poster  // A bejelentkezett user ID-ja
        }, {
            headers: { Authorization: `Bearer ${token}` }  // Token átadása az axios kérésben
        })
        .then(response => {
            console.log("Successfully submitted:", response.data);
            reset();
        })
        .catch(error => {
            console.error("Error occurred during submission:", error);
        });
    };

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
                        {selectedWord && <p>Selected: {selectedWord.word}</p>}  {/* A kiválasztott szó megjelenítése */}
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
                            {...register("new_icons", { required: "Emoji is required!" })}
                            className={styles.emojiInput} 
                            type="text" 
                            placeholder="Emoji" 
                        />
                        {errors.new_icons && <p className={styles.error}>{errors.new_icons.message}</p>}
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
            
            {/* ListWords modal */}
            <ListWords open={openListWords} onClose={() => setOpenListWords(false)} onSelect={handleWordSelect} />
        </>
    );
}

export default MakeSuggestion;
