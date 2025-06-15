  class InputHandler {
            constructor(canvas, game) {
                this.canvas = canvas;
                this.game = game;
                this.setupEventListeners();
            }

            setupEventListeners() {
                this.canvas.addEventListener('click', (e) => this.handleClick(e));
                document.addEventListener('keydown', (e) => this.handleKeyboard(e));
            }

            handleClick(e) {
                if (!this.game.isRunning()) return;
                
                const direction = this.game.getDirection();
                
                if (direction.dx === 0 && direction.dy === 0) {
                    this.game.setDirection(1, 0);
                    return;
                }

                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;

                const deltaX = x - centerX;
                const deltaY = y - centerY;

                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    if (deltaX > 0) {
                        this.game.setDirection(1, 0);
                    } else {
                        this.game.setDirection(-1, 0);
                    }
                } else {
                    if (deltaY > 0) {
                        this.game.setDirection(0, 1);
                    } else {
                        this.game.setDirection(0, -1);
                    }
                }
            }

            handleKeyboard(e) {
                if (!this.game.isRunning()) return;
                
                const direction = this.game.getDirection();
                
                if (direction.dx === 0 && direction.dy === 0) {
                    switch(e.key) {
                        case 'ArrowUp': this.game.setDirection(0, -1); break;
                        case 'ArrowDown': this.game.setDirection(0, 1); break;
                        case 'ArrowLeft': this.game.setDirection(-1, 0); break;
                        case 'ArrowRight': this.game.setDirection(1, 0); break;
                    }
                    return;
                }

                switch(e.key) {
                    case 'ArrowUp': this.game.setDirection(0, -1); break;
                    case 'ArrowDown': this.game.setDirection(0, 1); break;
                    case 'ArrowLeft': this.game.setDirection(-1, 0); break;
                    case 'ArrowRight': this.game.setDirection(1, 0); break;
                    case ' ':
                        e.preventDefault();
                        if (direction.dx === 0 && direction.dy === 0) {
                            this.game.setDirection(1, 0);
                        }
                        break;
                }
            }
        }