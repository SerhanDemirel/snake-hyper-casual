  class SnakeGame {
            constructor() {
                this.canvas = document.getElementById('gameCanvas');
                this.scoreElement = document.getElementById('score');
                this.gameOverElement = document.getElementById('gameOver');
                this.finalScoreElement = document.getElementById('finalScore');
                
                this.renderer = new Renderer(this.canvas);
                this.inputHandler = new InputHandler(this.canvas, this);
                
                this.tileCount = Utils.getTileCount(CONFIG.CANVAS_WIDTH, CONFIG.GRID_SIZE);
                
                this.reset();
            }

            reset() {
                this.snake = [{x: 10, y: 10}];
                this.food = {};
                this.dx = 0;
                this.dy = 0;
                this.score = 0;
                this.gameRunning = true;
                this.gameLoopId = null;
                
                this.updateScore();
                this.generateFood();
                this.hideGameOver();
            }

            generateFood() {
                do {
                    this.food = {
                        x: Utils.getRandomPosition(this.tileCount),
                        y: Utils.getRandomPosition(this.tileCount)
                    };
                } while (Utils.isPositionOccupied(this.food, this.snake));
            }

            move() {
                if (this.dx === 0 && this.dy === 0) return;
                
                const head = {
                    x: this.snake[0].x + this.dx, 
                    y: this.snake[0].y + this.dy
                };
                
                this.snake.unshift(head);

                if (head.x === this.food.x && head.y === this.food.y) {
                    this.score += CONFIG.FOOD_POINTS;
                    this.updateScore();
                    this.generateFood();
                    this.renderer.playFoodAnimation();
                } else {
                    this.snake.pop();
                }
            }

            checkCollisions() {
                const head = this.snake[0];

                // Duvar çarpışması
                if (head.x < 0 || head.x >= this.tileCount || 
                    head.y < 0 || head.y >= this.tileCount) {
                    console.log("Duvara çarpma:", head.x, head.y);
                    this.endGame();
                    return;
                }

                // Kendine çarpışma
                if (this.snake.length > CONFIG.MIN_COLLISION_LENGTH) {
                    for (let i = CONFIG.MIN_COLLISION_LENGTH; i < this.snake.length; i++) {
                        if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                            console.log("Kendine çarpma:", head.x, head.y, "segment:", i);
                            this.endGame();
                            return;
                        }
                    }
                }
            }

            render() {
                this.renderer.clear();
                this.renderer.drawFood(this.food);
                this.renderer.drawSnake(this.snake);
            }

            gameLoop() {
                if (!this.gameRunning) {
                    if (this.gameLoopId) {
                        clearTimeout(this.gameLoopId);
                        this.gameLoopId = null;
                    }
                    return;
                }

                this.gameLoopId = setTimeout(() => {
                    this.render();
                    this.move();
                    
                    if (this.gameRunning) {
                        this.checkCollisions();
                    }
                    
                    this.gameLoop();
                }, CONFIG.GAME_SPEED);
            }

            start() {
                this.gameLoop();
            }

            endGame() {
                this.gameRunning = false;
                this.finalScoreElement.textContent = this.score;
                this.gameOverElement.style.display = 'block';
            }

            restart() {
                if (this.gameLoopId) {
                    clearTimeout(this.gameLoopId);
                    this.gameLoopId = null;
                }
                this.reset();
                this.start();
            }

            // Getter/Setter methods
            isRunning() {
                return this.gameRunning;
            }

            getDirection() {
                return { dx: this.dx, dy: this.dy };
            }

            setDirection(dx, dy) {
                this.dx = dx;
                this.dy = dy;
            }

            updateScore() {
                this.scoreElement.textContent = this.score;
            }

            hideGameOver() {
                this.gameOverElement.style.display = 'none';
            }
        }