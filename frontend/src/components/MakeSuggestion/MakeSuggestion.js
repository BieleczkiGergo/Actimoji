import React, {useState} from "react";
import styles from "./MakeSuggestion.module.css";

function MakeSuggestion () {

    const [activeTab, setActiveTab] = useState("Create");

    const renderContent = () => {
        switch (activeTab) {
            case "Create":
                return (
                    <>
                        <input className={styles.wordInput} type="text" placeholder="Word"></input>
                        <input className={styles.emojiInput} type="text" placeholder="Emoji"></input>
                        <input className={styles.textField} type="text" placeholder="Reason for ..."></input>
                        <button className={styles.sendButton}>Create</button>
                    </>
                )
            case "Modify":
                return (
                    <>
                        <input className={styles.wordInput} type="text" placeholder="Word"></input>
                        <input className={styles.emojiInput} type="text" placeholder="Emoji"></input>
                        <input className={styles.textField} type="text" placeholder="Reason for ..."></input>
                        <button className={styles.sendButton}>Modify</button>
                    </>
                )
            case "Delete":
                return (
                    <>
                        <input className={styles.wordInput} type="text" placeholder="Word"></input>
                    </>
                )
        }
    }
    
    return (
        <>
            <div>
                <button className={styles.mainButtons} onClick={() => {setActiveTab("Create")}}>Create</button>
                <button className={styles.mainButtons} onClick={() => {setActiveTab("Modify")}}>Modify</button>
                <button className={styles.mainButtons} onClick={() => {setActiveTab("Delete")}}>Delete</button>
            </div> 
    
            {renderContent()}

        </>
    )

}

export default MakeSuggestion;
