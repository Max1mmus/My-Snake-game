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
var score = 0;

var apple = {
    x : Math.floor(Math.random()*30)*20,
    y : Math.floor(Math.random()*30)*20,
}
//console.log(apple);

function createSnake(){ 

    for (var i = 0; i < 2; i++) {
        var snake = {
        x : x,
        y : y, 
        }
        x += 20   

        snakeArr.push(snake);
    }
}
createSnake();

function paintSnake(){
    for(var i = 0; i < snakeArr.length; i++){
        
        ctx.fillStyle = "#E0F73A";
        ctx.fillRect(snakeArr[i].x, snakeArr[i].y, 20, 20);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snakeArr[i].x, snakeArr[i].y, 20, 20);
    }
}

function paintApple() {

    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, 20, 20);
    ctx.strokeStyle = "black";
    ctx.strokeRect(apple.x, apple.y, 20, 20);
}

function snakeLogic(){

    let snakeHead = {
        x : snakeArr[0].x + dx,
        y : snakeArr[0].y + dy,
    }

    if(isPressed){
        snakeArr.pop();
        snakeArr.unshift(snakeHead); 
    }       
      
    /* if snake eats apple */
    if(snakeHead.x == apple.x && snakeHead.y == apple.y){
        snakeArr.push(snakeHead);
        score++;

        apple.x = Math.floor(Math.random()*30)*20;
        apple.y = Math.floor(Math.random()*30)*20;

    }
    paintSnake();
}

function trackScore(){
    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 5, 595);
}

function gameOver(){

    var snakeH = snakeArr[0];

    for(var i = 2; i < snakeArr.length; i++) {

        if(snakeH.x + dx === snakeArr[i].x && 
           snakeH.y + dy === snakeArr[i].y)
        {return true; }
    }

    if(snakeH.x > w - dx ||
       snakeH.x < 0 || 
       snakeH.y > h - dy|| 
       snakeH.y < 0) 
    {return true; }
        
}

/*function resetGame (){
    var conf = confirm("You died \nNew game?")
    if(conf === true){
    var getEl = document.getElementById("snakeG")
    }
}*/ 

function draw(){

    var drawOn = setTimeout(function() {
        
        requestAnimationFrame(draw)
        ctx.clearRect(0, 0, w, h);
        paintApple();
        snakeLogic();
        trackScore();
        gameOver();
        }, 1000/10)

        if(gameOver()){   
        clearTimeout(drawOn);         
    }  
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
console.log(snakeArr);
