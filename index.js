const GRID_ROWS = 30;
const GRID_COLUMNS = 15;
const GRID_CELLS = GRID_COLUMNS * GRID_ROWS;

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
            el.classList.add("type");
            x[i].appendChild(el);
        }
    }
}


// SCRIPT BODY
document.addEventListener('DOMContentLoaded', function () {
    generateGrids();
});

/**
 * Call on '.play-btn' click
 */
function onPlayClick()
{
    let btn = document.querySelector(".play-btn");
    btn.classList.toggle("fa-play-circle");
    btn.classList.toggle("fa-pause-circle");
}