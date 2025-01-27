import React, {useState} from "react";
import styles from "./MakeSuggestion.module.css";

function MakeSuggestion () {

    const [activeTab, setActiveTab] = useState("Create");

    const renderContent = () => {
        switch (activeTab) {
            case "Create":
                return (
                    <>
                        <p className={styles.select + ' ' + styles.create}>Create</p>
                    </>
                )
            case "Modify":
                return (
                    <>
                        <p className={styles.select + ' ' + styles.modify}>Modify</p>
                    </>
                )
            case "Delete":
                return (
                    <>
                        <p className={styles.select + ' ' + styles.delete}>Delete</p>
                    </>
                )
        }
    }
    
    return (
        <>
            <div>
                <button onClick={() => {setActiveTab("Create")}}>Create</button>
                <button onClick={() => {setActiveTab("Modify")}}>Modify</button>
                <button onClick={() => {setActiveTab("Delete")}}>Delete</button>
            </div> 
        
            <h2>Teszt</h2>
            {renderContent()}

        </>
    )

}

export default MakeSuggestion;
