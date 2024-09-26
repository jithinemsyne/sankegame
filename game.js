document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const scoreElement = document.getElementById('score');
    const boardSize = 20;
    const gameSpeed = 150;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let direction = { x: 0, y: 0 };
    let score = 0;

    // Initialize Game Board
    for (let i = 0; i < boardSize * boardSize; i++) {
        const div = document.createElement('div');
        gameBoard.appendChild(div);
    }

    const cells = gameBoard.querySelectorAll('div');

    function index(x, y) {
        return y * boardSize + x;
    }

    function draw() {
        cells.forEach(cell => cell.classList.remove('snake', 'food'));

        snake.forEach(segment => {
            cells[index(segment.x, segment.y)].classList.add('snake');
        });

        cells[index(food.x, food.y)].classList.add('food');
    }

    function moveSnake() {
        const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        // Check for game over (hitting walls or itself)
        if (
            newHead.x < 0 || newHead.x >= boardSize ||
            newHead.y < 0 || newHead.y >= boardSize ||
            snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
        ) {
            alert('Game Over! Final score: ' + score);
            resetGame();
            return;
        }

        snake.unshift(newHead);

        // Check if food is eaten
        if (newHead.x === food.x && newHead.y === food.y) {
            score++;
            scoreElement.innerText = 'Score: ' + score;
            generateFood();
        } else {
            snake.pop(); // Remove the tail if no food is eaten
        }
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize),
        };

        // Ensure food doesn't spawn on the snake
        while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
            food = {
                x: Math.floor(Math.random() * boardSize),
                y: Math.floor(Math.random() * boardSize),
            };
        }
    }

    function changeDirection(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        score = 0;
        scoreElement.innerText = 'Score: 0';
        generateFood();
    }

    // Game Loop
    function gameLoop() {
        setTimeout(() => {
            moveSnake();
            draw();
            gameLoop();
        }, gameSpeed);
    }

    // Event Listeners
    document.addEventListener('keydown', changeDirection);

    // Start the game
    draw();
    gameLoop();
});
