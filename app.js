// Set default of 16 of grid size
let root = document.documentElement;
window.onload = createGrid(17);

// root.style.setProperty("--grid-size", 17);


let gridSize = document.querySelector("#grid-size");
gridSize.value = 16;
let hexcode = document.querySelector("#hexcode");
let clearBtn = document.querySelector("#clear-btn");
let blackBtn = document.querySelector("#black-ink-btn");
let rainbowBtn = document.querySelector("#rainbow-ink-btn");
let blackInk = true;

// Event listeners

blackBtn.addEventListener("click", ()=>{
    blackInk = true;
})
rainbowBtn.addEventListener("click", () => {
    blackInk = false;
})
clearBtn.addEventListener("click", ()=>{
    let gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(item =>{
        item.style.backgroundColor = "";
    })
})
gridSize.addEventListener("change", ()=>{
    let size = gridSize.value;
    if (size > 0 && size < 100){
        resetGrid();
        createGrid(size);
    } else {
        alert("Grid size must be between 0 and 100.");
    }
})

function createGrid(number) {
    let n = number;
    let gridItems = [];
    let gridContainer = document.querySelector("#grid-container");
    let a = 0;
    root.style.setProperty("--grid-size", number);
    for (i=0; i<n; i++){
        for(j=0;j<n;j++){
            // console.log(a);
            gridItems[a] = document.createElement("div");
            gridItems[a].classList.add("grid-item");
            document.getElementById("grid-container").append(gridItems[a]);
            a += 1;
        }
    }
    let gridRow = gridItems[0].cloneNode();
    // console.log(gridItems);
    gridItems.forEach(item => {
    item.addEventListener('mouseover', (e) => {
        colorChange(item);
        // console.log(e);
        // console.log("e color: ", e.target.style.backgroundColor);
    });
});
}
function resetGrid(){
    let gridContainer = document.querySelector("#grid-container");
    let gridItems = document.querySelectorAll(".grid-item");
    // console.log(gridItems);
    // console.log(gridContainer.childNodes);
    // gridContainer.removeChild(".grid-item");
    gridItems.forEach(item => (
        item.remove()
    ));
    console.log(gridItems);
    console.log(gridContainer);
}

function colorChange(item){
    if (blackInk){
        item.style.backgroundColor = "black";
        console.log("item color: ", item.style.backgroundColor);
    } else{
        if(item.style.backgroundColor === "black" || item.style.backgroundColor === "" ){
            console.log("item color: ", item.style.backgroundColor);
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            // console.log(randomColor);
            item.style.backgroundColor = `#${randomColor}`;
        }
        else{
            let colour = item.style.backgroundColor;
            // console.log(colour);
            let rgbString = colour.match(/\d+/g);
            // console.log("String: ", rgbString);
            let rgb = []
            parseInt(rgbString[0]) <= 20? rgb[0] = 0 : rgb[0] = parseInt(rgbString[0]) * 0.8;
            parseInt(rgbString[1]) <= 20? rgb[1] = 0 : rgb[1] = parseInt(rgbString[1]) * 0.8;
            parseInt(rgbString[2]) <= 20? rgb[2] = 0 : rgb[2] = parseInt(rgbString[2]) * 0.8;
            // console.log("Integer: ", rgb);
            item.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        }
    }

    
}