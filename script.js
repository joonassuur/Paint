const c = document.querySelector("canvas");
const ctx = c.getContext('2d');
const wrapper = document.querySelector(".wrapper"),
    btnClear = document.querySelector(".clear"),
    btnEraser = document.querySelector(".eraser"),

    btnRed = document.querySelector(".red"),
    btnBlack = document.querySelector(".black"),
    btnOrange = document.querySelector(".orange"),
    btnBlue = document.querySelector(".blue"),
    btnYellow = document.querySelector(".yellow"),
    btnBrown = document.querySelector(".brown"),
    btnGreen = document.querySelector(".green"),
    btnPurple = document.querySelector(".purple"),
    btnCustom = document.querySelector(".custom"),
    btnColor = document.querySelectorAll(".btn.color"),
    btnLine = document.querySelectorAll(".line-cont");
c.height = wrapper.clientHeight-5;
c.width = wrapper.clientWidth-5;
c.style.background = "#f0f0f0";

let x, y, lastX, lastY, down = false, mouseVisible, colorPick = "#000", out, eraser = false, lineW = 2;
let setCusColor;
//buttons start
btnClear.onmousedown = () => { ctx.clearRect(0, 0, innerWidth, innerHeight);}
//remove marker from nonselected colors
removeClass = () => {
    for (let i=0;i<btnColor.length;i++) {
            btnColor[i].classList.remove("selected");
    }
}
//mark selected color/eraser
for (let i = 0; i < btnColor.length; i++) {
    btnColor[i].onmousedown = () => {
        removeClass();
        eraser = false;
        btnColor[i].classList.add("selected");
        colorPick = window.getComputedStyle(btnColor[i], null).getPropertyValue("background-color")
        if (btnColor[i] === btnEraser) {
            colorPick = "#f0f0f0";
            eraser = true;
        }
        if(btnColor[i] === btnCustom) {
            setCusColor = setInterval(function(){ colorPick = document.querySelector(".custom").value, 100;});
        }
        if (btnColor[i] !== btnCustom) {
            clearInterval(setCusColor);
        } 
    }
}

for (let i = 0; i < btnLine.length; i++) {
    btnLine[i].onmousedown = () => {
        switch (btnLine[i]) {
            case btnLine[0]:
                lineW = 2;
                break;
            case btnLine[1]:
                lineW = 4;
                break;
            case btnLine[2]:
                lineW = 6;
                break;
        }

    }
}

//end buttons



draw = (x, y) => {

    if (down && (x !== lastX || y !== lastY)) {
        ctx.strokeStyle = colorPick;
        if (eraser) {
            ctx.lineWidth = 20;
        } else {
            ctx.lineWidth = lineW;
        }
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    lastX = x;
    lastY = y;
}





c.addEventListener("mouseleave", () => {down = false;});
c.addEventListener("mousedown", () => {
    down = true; draw(x,y);
    ctx.fillStyle = colorPick; 
    ctx.beginPath();
    ctx.arc(x,y,1,0,2*Math.PI); 
    ctx.fill();})
c.addEventListener("mouseup", () => {down = false; lastX = 0; lastY = 0;})
c.addEventListener("mousemove", (e) => {x=e.clientX,y=e.clientY;draw(x,y)})
window.addEventListener("resize", () => {
    let canvasImage = ctx.getImageData(0, 0, wrapper.clientWidth-5, wrapper.clientHeight-5);

    c.height = wrapper.clientHeight-5;
    c.width = wrapper.clientWidth-5; 

    ctx.putImageData(canvasImage, 0, 0);
})

