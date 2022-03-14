const gridElement = document.querySelector('[data-grid]'); // primary grid selectors 
const scoreDisplay = document.querySelector('[data-score]');
// globals
const blockWidth = 100;
const blockHeight = 20;
// paddle positions
const initialPaddlePosition = [230,10];
let currentPosition = initialPaddlePosition;
// board dimensions
const boardWidth = 560;
const boardHeight = 300;
// ball dimensions
const ballWidth = 20;
const ballHeight = 20;
let xDirection = 2;
let yDirection = 2;
// ball position
const ballInitialPosition = [230, 40];
let currentBallPosition = ballInitialPosition;
// timer id
let timerId;

// main block object
class Block {
    constructor(xAxis, yAxis){
        // bottom left point will serve as the anchor point
        this.bottomLeft = [xAxis, yAxis];
        // points will be used to determine the contact of the ball
        this.bottomRight = [xAxis + blockWidth , yAxis];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
        this.topLeft = [xAxis, yAxis + blockHeight];
    }
};
// blocks array containing each block object
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),

    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
];

// drawing all the blocks
function drawBlocks(){
    for(let i = 0; i< blocks.length; i++){
        const newBlockElement = document.createElement('div');
        newBlockElement.classList.add('block');
        newBlockElement.style.left = blocks[i].bottomLeft[0] + 'px';
        newBlockElement.style.bottom = blocks[i].bottomLeft[1] + 'px';
        gridElement.appendChild(newBlockElement);
    }
};
drawBlocks();

const paddleElement = document.createElement('div');
paddleElement.classList.add('paddleBlock');
gridElement.appendChild(paddleElement);
// controls paddle direction
drawPaddle();

// draws the new positions of the paddles with change
function drawPaddle(){
    paddleElement.style.left = currentPosition[0] + 'px';
    paddleElement.style.bottom = currentPosition[1] + 'px';
}

function paddleControls(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] < 0) return;
            currentPosition[0] -= 10;
            drawPaddle();
            break;
        case 'ArrowRight':
            if(currentPosition[0] > boardWidth - blockWidth) return;
            currentPosition[0] += 10;
            drawPaddle();
            break;
    }
}

// key listener
document.addEventListener('keydown', paddleControls);

// draw ball
const ballElement = document.createElement('div');
ballElement.classList.add('ball');
gridElement.appendChild(ballElement);
drawBall();

// ball movement
function drawBall(){
    ballElement.style.left = currentBallPosition[0] + 'px';
    ballElement.style.bottom = currentBallPosition[1] + 'px';
}

// incrementing the ball parameters 
function moveBall(){
    currentBallPosition[0] += xDirection;
    currentBallPosition[1] += yDirection;
    drawBall();
    collisionDetection();
};

// main function for checking all types of collisions
function collisionDetection(){
    // block collision check


    // board border collision check
    if(currentBallPosition[0] >= (boardWidth - ballHeight) || currentBallPosition[1] >= (boardHeight - ballHeight)
    || currentBallPosition[0] <= 0 ){
        switchDirection();
    }

    // ground hit collision check
    if(currentBallPosition[1] <= 0){
        clearInterval(timerId);
        scoreDisplay.innerHTML= 'YOU SUCK';
        document.removeEventListener('keydown', paddleControls);
    }
};

// switching direction of the ball after colition
function switchDirection(){
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2;
        return;
    };
    if(xDirection === 2 && yDirection === -2){
        xDirection = -2;
        return;
    };
    if(xDirection === -2 && yDirection === -2){
        yDirection = 2;
        return;
    }
    if(xDirection === -2 && yDirection === 2){
        xDirection = 2;
        return;
    }
};

timerId = setInterval(moveBall, 30);
