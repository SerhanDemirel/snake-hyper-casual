 class Renderer {
            constructor(canvas) {
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
                this.gridSize = CONFIG.GRID_SIZE;
            }

            clear() {
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }

            drawSnake(snake) {
                snake.forEach((segment, index) => {
                    if (index === 0) {
                        // Kafa
                        this.ctx.fillStyle = '#4ecdc4';
                        this.ctx.shadowColor = '#4ecdc4';
                        this.ctx.shadowBlur = 10;
                    } else {
                        // Vücut
                        this.ctx.fillStyle = '#45b7b8';
                        this.ctx.shadowBlur = 5;
                    }
                    
                    this.ctx.fillRect(
                        segment.x * this.gridSize + 2, 
                        segment.y * this.gridSize + 2, 
                        this.gridSize - 4, 
                        this.gridSize - 4
                    );
                    this.ctx.shadowBlur = 0;
                });
            }

            drawFood(food) {
                this.ctx.fillStyle = '#ff6b6b';
                this.ctx.shadowColor = '#ff6b6b';
                this.ctx.shadowBlur = 15;
                
                this.ctx.beginPath();
                this.ctx.arc(
                    food.x * this.gridSize + this.gridSize / 2, 
                    food.y * this.gridSize + this.gridSize / 2, 
                    this.gridSize / 2 - 2, 
                    0, 
                    2 * Math.PI
                );
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }

            playFoodAnimation() {
                this.canvas.classList.add('food-animate');
                setTimeout(() => {
                    this.canvas.classList.remove('food-animate');
                }, 200);
            }
        }
