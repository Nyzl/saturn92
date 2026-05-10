let speed = 20;
let scale = 0.17; // Image scale (I work on 1080p monitor)
let canvas;
let ctx;
let logoColor;
let thisColorIdx = -1;

let dvd = {
    x: 200,
    y: 300,
    xspeed: 8,
    yspeed: 8,
    img: new Image()
};

(function main(){
    canvas = document.getElementById("tv-screen");
    ctx = canvas.getContext("2d");
    dvd.img.src = 'images/logo_transparent.png';

    //Draw the "tv screen"
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    pickColor();
    update();
})();

function update() {
    setTimeout(() => {
        //Draw the canvas background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //Draw DVD Logo and his background
        ctx.fillStyle = logoColor;
        ctx.fillRect(dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
        ctx.drawImage(dvd.img, dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
        //Move the logo
        dvd.x+=dvd.xspeed;
        dvd.y+=dvd.yspeed;
        //Check for collision 
        checkHitBox();
        update();   
    }, speed)
}

//Check for border collision
function checkHitBox(){
    if(dvd.x+dvd.img.width*scale >= canvas.width || dvd.x <= 0){
        dvd.xspeed *= -1;
        pickColor();
    }
        
    if(dvd.y+dvd.img.height*scale >= canvas.height || dvd.y <= 0){
        dvd.yspeed *= -1;
        pickColor();
    }    
}

//Pick a random color in RGB format
function pickColor(){
    const colours = [
        "27,231,255",  // Electric Aqua
        "240,56,255",  // Fusia
        "137,252,0",   // Lime
        "228,255,26",  // Neon Chartreuse
        "252,47,0",    // Scarlet Fire
        "255,87,20",   // Tiger Flame
        "240,56,255",  // Magenta
        "35,255,181",  // Tropical Mint
    ];
    // Pick a random colour that isn't the current one.
    const random = Math.floor(Math.random() * (colours.length - 1));
    if (random >= thisColorIdx) {
        random += 1;
    }
    thisColorIdx = random;
    logoColor = 'rgb('+colours[random]+')';
}
