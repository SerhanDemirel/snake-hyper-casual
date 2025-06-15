  const Utils = {
            getRandomPosition(max) {
                return Math.floor(Math.random() * max);
            },

            getTileCount(canvasSize, gridSize) {
                return canvasSize / gridSize;
            },

            isPositionOccupied(position, snake) {
                return snake.some(segment => 
                    segment.x === position.x && segment.y === position.y
                );
            }
        };