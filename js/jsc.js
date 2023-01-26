const colorPick = document.getElementById("color");
const size = document.getElementById("size");
const erase = document.getElementById("erase");
const canvas = document.getElementById("canvas");

erase.addEventListener("click", clear);

canvas.addEventListener("mousemove", draw)

function clear()
{
    
}

function draw(event)
{
    let x = event.clientX;
    let y = event.clientY;
    canvas.get
}