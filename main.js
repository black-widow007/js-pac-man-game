// const canvas = document.getElementById('canvasSpace');
// const ctx = canvas.getContext("2d");
// ctx.fillText("helloworld",10,150);

let score = 0, 
    gscore = 0, 
    countblink = 10,
    ghost = false,
    ghost2 = false;
// preset player object
let player = {
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,
    psize: 32,
    speed: 5
}

let enemy = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0,
    flash: 0,
    ghosteat: false
}

let enemy2 = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0,
    flash: 0,
    ghosteat: false
}

let powerDot = {
    x: 10,
    y: 10,
    powerup: false,
    pcountdown: 0,
    ghostNum: 0,
        ghostNum2: 0
}

// create the Canvas in JS instead of html:
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;

// import image
let mainImage = new Image();
mainImage.ready = false;
//when the images load, run function checkReady
mainImage.onload = checkReady;
mainImage.src = "pac.png";

// add key listerner
let keyclick = {};
document.addEventListener("keydown", function (event) {
    keyclick[event.keyCode] = true;
    move(keyclick);
}, false);
document.addEventListener("keyup", function (event) {
    delete keyclick[event.keyCode];
}, false);

// player moves pacman with arrow keys; for ex, 38 = up arrow key, so use y coordinate, we're also matching dir with pac man img
function move(keyclick) {
    // check click key value
    if (37 in keyclick) {
        player.x -= player.speed; player.pacdir = 64;
    }
    if (38 in keyclick) {
        player.y -= player.speed; player.pacdir = 96;
    }
    if (39 in keyclick) {
        player.x += player.speed; player.pacdir = 0;
    }
    if (40 in keyclick) {
        player.y += player.speed; player.pacdir = 32;
    }

    // when pacman goes past the canvas screen
    if (player.x >= (canvas.width - 32)) {
        player.x = 0;
    }
    if (player.y >= (canvas.height - 32)) {
        player.y = 0;
    }
    if (player.x < 0) {
        player.x = (canvas.width - 32);
    }
    if (player.y < 0) {
        player.y = (canvas.height - 32);
    }

    // open close pacman mouth
    if (player.pacmouth == 320) {
        player.pacmouth = 352;
    } else {
        player.pacmouth = 320;
    }
    render();
}

function checkReady() {
    this.ready = true;
    playGame();
}
// Game play loop
function playGame() {
    render();
    requestAnimationFrame(playGame);
}

// function that returns random values from passing a number
function myNum(n) {
    return Math.floor(Math.random() * n);
}


// draw on the canvas in order of what you want layered 1st where last will be on top; pick out specific spot on the main image
function render() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (!powerDot.powerup && powerDot.pcountdown < 5) {
        powerDot.x = myNum(420) + 30;
        powerDot.y = myNum(250) + 30;
        powerDot.powerup = true;
    }

    // check if ghost is on screen, render ghosts
    if (!ghost) {
        enemy.ghostNum = myNum(5) * 64;
        enemy.x = myNum(450);
        enemy.y = myNum(250) + 30;
        ghost = true;
    }

    if (!ghost2) {
        enemy2.ghostNum = myNum(5) * 64;
        enemy2.x = myNum(450);
        enemy2.y = myNum(250) + 30;
        ghost2 = true;
    }

    // move ghost 1
    if (enemy.moving < 0) {
        enemy.moving = (myNum(20) * 3) + myNum(1);
        // change speed randomly
        enemy.speed = myNum(1) + 1;
        // set direction
        enemy.dirx = 0;
        enemy.diry = 0;
        if (powerDot.ghosteat) {
            enemy.speed = enemy.speed * - 1
        }
        if (enemy.moving % 2) {
            if (player.x < enemy.x) {
                enemy.dirx = -enemy.speed;
            } else {
                enemy.dirx = enemy.speed;
            }
        } else {
            if (player.y < enemy.y) {
                enemy.diry = -enemy.speed;
            } else {
                enemy.diry = enemy.speed;
            }
        }
    }

    enemy.moving--;
    enemy.x = enemy.x + enemy.dirx;
    enemy.y = enemy.y + enemy.diry;

    // when ghost goes past the canvas width
    if (enemy.x >= (enemy.width - 32)) {
        enemy.x = 0;
    }
    if (enemy.y >= (canvas.height - 32)) {
        enemy.y = 0;
    }
    if (enemy.x < 0) {
        enemy.x = (canvas.width - 32);
    }
    if (enemy.y < 0) {
        enemy.y = (canvas.height - 32);
    }

    // move ghost2
    if (enemy2.moving < 0) {
        enemy2.moving = (myNum(20) * 3) + myNum(1);
        // change speed randomly
        enemy2.speed = myNum(1) + 1;
        // set direction
        enemy2.dirx = 0;
        enemy2.diry = 0;
        if (powerDot.ghosteat) {
            enemy2.speed = enemy2.speed * - 1
        }
        if (enemy2.moving % 2) {
            if (player.x < enemy2.x) {
                enemy2.dirx = -enemy2.speed;
            } else {
                enemy2.dirx = enemy2.speed;
            }
        } else {
            if (player.y < enemy2.y) {
                enemy2.diry = -enemy2.speed;
            } else {
                enemy2.diry = enemy2.speed;
            }
        }
    }

    enemy2.moving--;
    enemy2.x = enemy2.x + enemy2.dirx;
    enemy2.y = enemy2.y + enemy2.diry;

    // when ghost goes past the canvas width
    if (enemy2.x >= (enemy2.width - 32)) {
        enemy2.x = 0;
    }
    if (enemy2.y >= (canvas.height - 32)) {
        enemy2.y = 0;
    }
    if (enemy2.x < 0) {
        enemy2.x = (canvas.width - 32);
    }
    if (enemy2.y < 0) {
        enemy2.y = (canvas.height - 32);
    }

    // ---- Collision Detection Ghosts
    if (player.x <= (enemy.x + 26) && enemy.x <= (player.x + 26) && player.y <= (enemy.y +26) && enemy.y <= (player.y + 32)) {
        console.log('ghost');
            if(powerDot.ghosteat){
                score++
            } else {
                gscore++;
            }
        player.x = 10;
        player.y = 100;
        enemy.x = 300;
        enemy.y = 200;   
        powerDot.pcountdown = 0;
    }

    if (player.x <= (enemy2.x + 26) && enemy2.x <= (player.x + 26) && player.y <= (enemy2.y +26) && enemy2.y <= (player.y + 32)) {
        console.log('ghost');
            if(powerDot.ghosteat){
                score++
            } else {
                gscore++;
            }
        player.x = 10;
        player.y = 100;
        enemy2.x = 300;
        enemy2.y = 200;   
        powerDot.pcountdown = 0;
    }

    // ---- Collision Detection powerup
    if (player.x <= powerDot.x && powerDot.x <= (player.x + 32) && player.y <= powerDot.y && powerDot.y <= (player.y + 32)) {
        console.log('hit');
        powerDot.powerup = false;
        // turn the ghost blue 
        powerDot.pcountdown = 500;
        powerDot.ghostNum = enemy.ghostNum;
            powerDot.ghostNum2 = enemy2.ghostNum;
        enemy.ghostNum = 384;
            enemy2.ghostNum = 384;
        powerDot.x = 0;
        powerDot.y = 0;
        powerDot.ghosteat = true;
        player.speed = 10;
    }

    // powerup countdown
    if (powerDot.ghosteat) {
        powerDot.pcountdown--;
        if (powerDot.pcountdown <= 0) {
            powerDot.ghosteat = false;
            enemy.ghostNum = powerDot.ghostNum;
                    enemy2.ghostNum = powerDot.ghostNum2;
                player.speed = 5;
        }
    }

    //----- Draw powerup dot 
    if (powerDot.powerup) {
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.arc(powerDot.x, powerDot.y, 10, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }

    // blinking & flashing blue ghosts
    if (countblink > 0) {
        countblink--;
    } else {
        countblink = 20;
    }
    if (enemy.flash == 0) {
        enemy.flash = 32;   enemy2.flash = 32;
    } else {
        enemy.flash = 0;    enemy2.flash = 0;
    }

    // Write Score, font & color
    context.font = "20px Verdana";
    context.fillStyle = "white"
    context.fillText("Pacman: " + score + " vs Ghost: " + gscore, 2, 18);
    // render ghosts from main image
    context.drawImage(mainImage, enemy.ghostNum, enemy.flash, 32, 32, enemy.x, enemy.y, 32, 32);

    context.drawImage(mainImage, enemy2.ghostNum, enemy2.flash, 32, 32, enemy2.x, enemy2.y, 32, 32);
    // render pacman image
    context.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, 32, 32);
}