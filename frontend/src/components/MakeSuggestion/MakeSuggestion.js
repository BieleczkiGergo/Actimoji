import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./MakeSuggestion.module.css";

function MakeSuggestion() {
    const [activeTab, setActiveTab] = useState("Create");
    const [operation, setOperation] = useState(0);
    const [poster, setPoster] = useState(1);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleTabChange = (tab, opValue) => {
        setActiveTab(tab);
        setOperation(opValue);
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:8080/suggest/", {
            operation: operation,
            word_id: 1,
            new_word: data.new_word,
            new_icons: data.new_icons,
            reason: data.reason,
            poster: poster
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

            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    {...register("new_word", { required: "Word is required!" })}
                    className={styles.wordInput} 
                    type="text" 
                    placeholder="Word" 
                />
                {errors.new_word && <p className={styles.error}>{errors.new_word.message}</p>}

                {(activeTab === "Create" || activeTab === "Modify") && (
                    <>
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
        </>
    );
}

export default MakeSuggestion;
