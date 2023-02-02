const colorPick = document.getElementById("color");
const erase = document.getElementById("erase");
const load = document.getElementById("load");
const curve = document.getElementById("curve");
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let saves = [];
let activeDraw = false;
let activeCurve = false;
let coords = [];
let curveObj = null;

erase.addEventListener("click", clear);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("click", drawCurve);
colorPick.addEventListener("focusout", color);
load.addEventListener("change", loadData);
curve.addEventListener("click", activate);


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
    if (activeCurve)
        return;
    if (event.buttons !== 1) 
    {
        ctx.beginPath();
        return;
    }
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
}

function setLineWidth(id)
{
    ctx.lineWidth = id;
}

function activate()
{
    if(activeCurve)
        activeCurve = false;
    else
        activeCurve = true;
}

function drawCurve(event)
{
    if(!activeCurve)
        return;
    if(coords.length >= 8)
        return;
    coords.push(event.clientX - canvas.offsetLeft);
    coords.push(event.clientY - canvas.offsetTop);
    ctx.beginPath();
    ctx.arc(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    if(coords.length == 8)
    {
        curveObj = new BezCurve(coords[0], coords[1], coords[2], coords[3], coords[4], coords[5], coords[6], coords[7]);
        ctx.beginPath();
        ctx.moveTo(curveObj.start_x, curveObj.start_y);
        ctx.bezierCurveTo(curveObj.cp1_x, curveObj.cp1_y, curveObj.cp2_x, curveObj.cp2_y, curveObj.end_x, curveObj.end_y);
        ctx.stroke();
    }
}

window.onload = setSize;
window.onresize = setSize;

class BezCurve
{
    constructor(start_x, start_y, cp1_x, cp1_y, cp2_x, cp2_y, end_x, end_y)
    {
        this.start_x = start_x;
        this.start_y = start_y;
        this.cp1_x = cp1_x;
        this.cp1_y = cp1_y;
        this.cp2_x = cp2_x;
        this.cp2_y = cp2_y;
        this.end_x = end_x;
        this.end_y = end_y;
    }
}