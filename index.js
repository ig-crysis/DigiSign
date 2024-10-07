document.addEventListener("DOMContentLoaded", () => {
    const colorPicker = document.getElementById("colorPic");
    const canvasColor = document.getElementById("bgPick");
    const canvas = document.getElementById("myCanvas");
    const clear = document.getElementById("clearBtn");
    const save = document.getElementById("saveBtn");
    const ret = document.getElementById("retBtn");
    const fontSize = document.getElementById("fontSize");
    const ctx = canvas.getContext('2d');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    colorPicker.addEventListener('change', (e) => {
        ctx.strokeStyle = e.target.value;
        ctx.fillStyle = e.target.value;
    });

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();

            lastX = e.offsetX;
            lastY = e.offsetY;
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvasColor.addEventListener('change',(e)=>{
        ctx.fillStyle = e.target.value;
        ctx.fillRect(0,0,800,500); 
    })    

    fontSize.addEventListener('change',(e)=>{
        ctx.lineWidth = e.target.value;

    })
    clear.addEventListener('click',()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
    })
    save.addEventListener('click',()=>{
        localStorage.setItem('canvasContents',canvas.toDataURL());
        let link = document.createElement('a');
        link.download = 'my-canvas.png';
        link.href = canvas.toDataURL();
        link.click();
    })
    ret.addEventListener('click',()=>{
        let savedItem = localStorage.getItem('canvasContents');
        if(savedItem){
            let img = new Image();
            img.src = savedItem;
            ctx.drawImage(img,0,0);
        }
        else
            alert("No previous canvas");
    })
});
