const colorPick = document.getElementById("color");
const erase = document.getElementById("erase");
const load = document.getElementById("load");
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let saves = [];

erase.addEventListener("click", clear);
canvas.addEventListener("mousemove", draw);
colorPick.addEventListener("focusout", color);
load.addEventListener("change", loadData);



function color()
{
    ctx.strokeStyle = colorPick.value;
}

function clear()
{
    save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function save()
{
    saves.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    let newSave = document.createElement("option");
    newSave.innerHTML = "Save " + saves.length;
    newSave.setAttribute("id", saves.length);
    load.appendChild(newSave);
}

function loadData()
{
    ctx.putImageData(saves[load.options[load.selectedIndex].id - 1], 0, 0);
}

function setSize()
{
    ctx.canvas.width = window.innerWidth * 100 / 110;
    ctx.canvas.height = window.innerHeight * 100 / 120;
    setCtx();
}

function setCtx()
{
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
}

function draw(event)
{
    if (event.buttons !== 1) 
        return;
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
}

function setLineWidth(id)
{
    ctx.lineWidth = id;
}

window.onload = setSize;
window.onresize = setSize;