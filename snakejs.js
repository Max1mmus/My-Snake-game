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
    if(snakeHead.x == apple.x && snakeHead.y == apple.y){
        snakeArr.push(snakeHead);

        ctx.clearRect(0, 0, 20, 20);
        apple.x = Math.floor(Math.random()*30)*20;
        apple.y = Math.floor(Math.random()*30)*20;
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
        
/* pressing arrow keys to control the snake */
document.onkeydown = function usingKey(event) {   
    isPressed = true;

    /* up key */
    if(event.keyCode === 38 && !(dy === 20)){
        dx = 0;
        dy = -20;
    }
    /* down key */
    if(event.keyCode === 40 && !(dy === -20)){
        dx = 0;
        dy = 20; 
    }
    /* left key */
    if(event.keyCode === 37 && !(dx === 20)){
         dx = -20;
        dy = 0;
    }
    /* right key */
    if(event.keyCode === 39 && !(dx === -20)){
        dx = 20;
        dy = 0;
    }
    
}
draw();
createSnake();
console.log(snakeArr);
