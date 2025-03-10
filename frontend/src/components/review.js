import React, { createContext, useState } from "react";


let ReviewCtx = createContext();

function ReviewProvider({ children }){

    // azért csináltam state-el hogy később a módosítást is lehessen dummy adatokkal csinálni
    // na meg a tényleges adat is state-ben lesz
    // és contextben
    // ha nem úgy csinálod, átírom

    let [reviews, setReviews] = useState([
        {
            /* módosítás esetén type=1
            az old és a new változóknak is van értékük, meg kell hogy jelenjenek
            */
            "old_word": "word",
            "old_icons": "😎😍",
            "new_word": "world",
            "new_icons": "🌐⚙️",
            "type": 1,
            "reason": "asdasd a  s   dasdasdasdasdefmi9,qeú 9wötőasd ",

        },
        {
            /* létrehozás esetén type=0
            csak a new változóknak van értékük, csak ezeknek kell megjelenni
            */
            "old_word": "",
            "old_icons": "",
            "new_word": "melon",
            "new_icons": "🍉🍈",
            "type": 0,
            "reason": "lorem ipsum dolor sit amet consectetur nemtom hogy van tovább",

        },
        {
            /* törlés esetén type=2
            csak az old változóknak van értékük, csak ezek kell hogy megjelenjenek

            */
            "old_word": "lemon",
            "old_icons": "🍋",
            "new_word": "",
            "new_icons": "",
            "type": 2,
            "reason": "Lelesz Szabolcs",

        },
        {
            // pár extra random adat
            "old_word": "skibidi toilet",
            "old_icons": "🍋",
            "new_word": "",
            "new_icons": "",
            "type": 0,
            "reason": "Sigma sigma boy sigma boy sigma boy",

        },

    ]);

    return <ReviewCtx.Provider value={reviews}>
        { children }
    </ReviewCtx.Provider>

}

export { ReviewCtx, ReviewProvider };