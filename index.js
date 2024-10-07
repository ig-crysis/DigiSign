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

    // Set initial stroke and fill colors
    colorPicker.addEventListener('change', (e) => {
        ctx.strokeStyle = e.target.value;
        ctx.fillStyle = e.target.value;
    });

    // Start drawing
    const startPosition = (e) => {
        isDrawing = true;
        lastX = e.offsetX !== undefined ? e.offsetX : e.touches[0].clientX - canvas.getBoundingClientRect().left;
        lastY = e.offsetY !== undefined ? e.offsetY : e.touches[0].clientY - canvas.getBoundingClientRect().top;
    };

    // Draw on the canvas
    const draw = (e) => {
        if (!isDrawing) return;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        lastX = e.offsetX !== undefined ? e.offsetX : e.touches[0].clientX - canvas.getBoundingClientRect().left;
        lastY = e.offsetY !== undefined ? e.offsetY : e.touches[0].clientY - canvas.getBoundingClientRect().top;
        ctx.lineTo(lastX, lastY);
        ctx.stroke();
    };

    // Stop drawing
    const endPosition = () => {
        isDrawing = false;
        ctx.beginPath();
    };

    // Mouse events
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endPosition);
    
    // Touch events
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent scrolling
        startPosition(e);
    });
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', endPosition);

    // Change background color
    canvasColor.addEventListener('change',(e) => {
        ctx.fillStyle = e.target.value;
        ctx.fillRect(0, 0, 800, 500); 
    });

    // Change line width
    fontSize.addEventListener('change', (e) => {
        ctx.lineWidth = e.target.value;
    });

    // Clear canvas
    clear.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Save canvas
    save.addEventListener('click', () => {
        localStorage.setItem('canvasContents', canvas.toDataURL());
        let link = document.createElement('a');
        link.download = 'my-canvas.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    // Retrieve saved canvas
    ret.addEventListener('click', () => {
        let savedItem = localStorage.getItem('canvasContents');
        if (savedItem) {
            let img = new Image();
            img.src = savedItem;
            img.onload = () => ctx.drawImage(img, 0, 0);
        } else {
            alert("No previous canvas");
        }
    });
});
