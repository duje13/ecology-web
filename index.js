const GRID_ROWS = 30;
const GRID_COLUMNS = 15;
const GRID_CELLS = GRID_COLUMNS * GRID_ROWS;
const LANGUAGE_STORAGE_KEY = "language";

let timerId;

/**
 * Generate divs inside .grid div with 'type'
 * class
 */
function generateGrids()
{
    let x = document.querySelectorAll(".grid");
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < GRID_CELLS; j++) {
            let el = document.createElement('div');
            x[i].appendChild(el);
        }
    }
}

/**
 * Set given text as content of elements
 * with given selector
 * 
 * @param {string} selector
 * @param {string} text
 */
function setTranslation(selector, text)
{
    let x = document.querySelectorAll(selector);
    for (let i = 0; i<x.length; i++) {
        x[i].innerHTML = text;
    }
}

/**
 * Apply given language to page
 * 
 * @param {string} lan Language to set
 */
function setLanguage(lan)
{
    let dict;

    switch (lan) {
        case "hr":
            dict = croatianDict;
            break;
        case "en":
            dict = englishDict;
            break;
        default:
            console.warn("Unknown language! Loading english instead...");
            dict = englishDict;
            break;
    }

    setTranslation(".title-translate", dict.title);
    setTranslation(".type-label-translate", dict.types_label);
    setTranslation(".type-1-translate", dict.type_1);
    setTranslation(".type-2-translate", dict.type_2);
    setTranslation(".type-3-translate", dict.type_3);
    setTranslation(".type-4-translate", dict.type_4);
    setTranslation(".x-label-translate", dict.x_label);
    setTranslation(".y-label-translate", dict.y_label);
    setTranslation(".z-label-translate", dict.z_label);
}

/**
 * Load language based on browser language or saved language
 * from previous session
 */
function loadLanguage()
{
    let lan = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (lan !== null) {
        setLanguage(lan);
        document.getElementById("language-selector").value = lan;
        return;
    }

    lan = navigator.language;
    switch (lan.substring(0,2)) {
        case "hr":
        case "sr":
        case "sh":
        case "bs":
            lan = "hr";
            break;
        default:
            lan = "en";
            break;
    }

    setLanguage(lan);
    document.getElementById("language-selector").value = lan;
}

/**
 * Set random class
 * 
 * @param {string} selector Elements to set class
 * @param {array} probabilities Array of arrays of two elements: 0: probability 1: class
 */
function setRandomClass(selector, probabilities)
{
    let x = document.querySelectorAll(selector);

    for (let i = 0; i<x.length; i++) {
        let r = Math.random();
        let sum = 0;
        for (let j = 0; j<probabilities.length; j++) {
            sum += probabilities[j][0];
            if (r < sum) {
                x[i].className = probabilities[j][1];
                break;
            }
        }
    }
}

/**
 * Set color to grids (x, y and z)
 */
function setGridColors()
{
    setRandomClass(".x-grid > div", [[0.51, "type-4"], [0.23, "type-2"], [0.26, "type-3"]]);
    setRandomClass(".y-grid > div", [[0.03, "type-4"], [0.37, "type-2"], [0.24, "type-1"], [0.36, "type-3"]]);
    setRandomClass(".z-grid > div", [[0.58, "type-1"], [0.23, "type-2"], [0.19, "type-3"]]);
}

// SCRIPT BODY
document.addEventListener('DOMContentLoaded', function () {
    loadLanguage();
    generateGrids();
    setGridColors();
});

/**
 * Call on '.play-btn' click
 */
function onPlayClick()
{
    let btn = document.querySelector(".play-btn");
    btn.classList.toggle("fa-play-circle");
    let isStarted = btn.classList.toggle("fa-pause-circle");

    if (isStarted) {
        timerId = setInterval(setGridColors, 1000);
    } else {
        clearInterval(timerId);
    }
}

/**
 * Call on '#language-selector' value change
 */
function onLanguageSelectorChange()
{
    let len = document.getElementById("language-selector").value;
    setLanguage(len);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, len);
}