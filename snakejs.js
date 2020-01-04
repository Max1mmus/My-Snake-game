const canvas = document.getElementById("sCanvas");
const ctx = canvas.getContext("2d");

var h = 600;
var w = 600;

//starting points of snake
var x = w/2;
var y = h/2;

var dx = null;
var dy = null;

var isPressed = false;

canvas.width = w;
canvas.height = h;

var snakeArr = [];

var apple = {
    x : Math.floor(Math.random()*30)*20,
    y : Math.floor(Math.random()*30)*20,
}
console.log(apple);

function createSnake(){ 
    
    for (var i = 0; i < 2; i++) {
        var snake = {
        x : x,
        y : y, 
        }
        x = x + 20;   
    
        snakeArr.push(snake);
    }
}

function paintApple() {

    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, 20, 20);
    ctx.strokeStyle = "black";
    ctx.strokeRect(apple.x, apple.y, 20, 20);

    if(apple.x == snakeArr[0].x && apple.y == snakeArr[0].y){
        ctx.clearRect(0, 0, 20, 20);

        apple.x = Math.floor(Math.random()*30)*20;
        apple.y = Math.floor(Math.random()*30)*20;   
    }
}

function paintSnake(){

    for(var i = 0; i < snakeArr.length; i++){
        
        ctx.fillStyle = "#8CAA78";
        ctx.fillRect(snakeArr[i].x, snakeArr[i].y, 20, 20);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snakeArr[i].x, snakeArr[i].y, 20, 20);
    }
    
    let snakeHead = {
        x : snakeArr[0].x + dx,
        y : snakeArr[0].y + dy,
    }
     
    if(isPressed == true ){     
        snakeArr.pop();
        snakeArr.unshift(snakeHead);        
    }

    //if snake eats apple
    if(snakeArr[0].x == apple.x && snakeArr[0].y == apple.y){
        snakeArr.push(snakeHead); 
    } 
}


function draw(){
    setTimeout(function() {
        requestAnimationFrame(draw)
        ctx.clearRect(0, 0, w, h);
        paintSnake();
        paintApple();
        
        }, 1000/10)
} 
        
draw();

document.onkeydown = function usingKey(event) {
    //arrow keys 
    isPressed = true;
    switch(event.keyCode) {

        case 38: /*arrow up*/
        dx = 0;
        dy = -20;  
        break;

        case 40: /* arrow down*/
        dx = 0;
        dy = 20;
        break;

        case  37: /*arrow left */
        dx = -20;
        dy = 0;
        break;

        case 39: /*arrow right */
        dx = 20;
        dy = 0;
        break;
    }
}
createSnake();
console.log(snakeArr);
