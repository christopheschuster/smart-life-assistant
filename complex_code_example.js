/* 
 * Filename: complex_code_example.js
 * Description: This code generates a random maze using Prim's algorithm and 
 *              solves it using a modified version of the A* algorithm.
 */

class Maze {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = new Array(height).fill(null).map(() => new Array(width).fill(true));
    this.visited = new Array(height).fill(null).map(() => new Array(width).fill(false));
    this.start = { row: Math.floor(Math.random() * height), col: Math.floor(Math.random() * width) };
    this.end = { row: Math.floor(Math.random() * height), col: Math.floor(Math.random() * width) };
  }

  generate() {
    const walls = [{ row: this.start.row, col: this.start.col }];
    this.visited[this.start.row][this.start.col] = true;

    while (walls.length > 0) {
      const index = Math.floor(Math.random() * walls.length);
      const current = walls[index];
      walls.splice(index, 1);

      const { row, col } = current;
      const neighbors = [];

      if (row > 1 && !this.visited[row - 2][col]) {
        neighbors.push({ row: row - 2, col });
      }
      if (row < this.height - 2 && !this.visited[row + 2][col]) {
        neighbors.push({ row: row + 2, col });
      }
      if (col > 1 && !this.visited[row][col - 2]) {
        neighbors.push({ row, col: col - 2 });
      }
      if (col < this.width - 2 && !this.visited[row][col + 2]) {
        neighbors.push({ row, col: col + 2 });
      }

      if (neighbors.length > 0) {
        walls.push(current);

        const next = neighbors[Math.floor(Math.random() * neighbors.length)];

        this.visited[next.row][next.col] = true;
        this.visited[row + Math.floor((next.row - row) / 2)][col + Math.floor((next.col - col) / 2)] = true;
        walls.push(next);
      }
    }

    return this.grid;
  }

  solve() {
    const openSet = [];
    const start = { ...this.start, g: 0, f: 0 };
    openSet.push(start);

    const cameFrom = {};

    const calculateDistance = (a, b) => {
      return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
    };

    const calculateHeuristic = (a) => {
      return calculateDistance(a, this.end);
    };

    const reconstructPath = (current) => {
      const path = [current];
      while (current in cameFrom) {
        current = cameFrom[current];
        path.push(current);
      }
      return path.reverse();
    };

    while (openSet.length > 0) {
      let currentIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[currentIndex].f) {
          currentIndex = i;
        }
      }

      const current = openSet[currentIndex];

      if (current.row === this.end.row && current.col === this.end.col) {
        return reconstructPath(current);
      }

      openSet.splice(currentIndex, 1);

      const neighbors = [];
      const { row, col } = current;

      if (row > 0 && !this.grid[row - 1][col]) {
        neighbors.push({ row: row - 1, col });
      }
      if (row < this.height - 1 && !this.grid[row + 1][col]) {
        neighbors.push({ row: row + 1, col });
      }
      if (col > 0 && !this.grid[row][col - 1]) {
        neighbors.push({ row, col: col - 1 });
      }
      if (col < this.width - 1 && !this.grid[row][col + 1]) {
        neighbors.push({ row, col: col + 1 });
      }

      for (const neighbor of neighbors) {
        const gScore = current.g + 1;
        const fScore = gScore + calculateHeuristic(neighbor);

        if (neighbor in cameFrom && gScore >= cameFrom[neighbor].g) {
          continue;
        }

        cameFrom[neighbor] = current;
        neighbor.g = gScore;
        neighbor.f = fScore;

        let found = false;
        for (let i = 0; i < openSet.length; i++) {
          if (openSet[i].row === neighbor.row && openSet[i].col === neighbor.col) {
            openSet[i] = neighbor;
            found = true;
            break;
          }
        }

        if (!found) {
          openSet.push(neighbor);
        }
      }
    }

    return null;
  }
}

const maze = new Maze(25, 25);
const grid = maze.generate();
console.log(grid);

maze.start = { row: 0, col: 0 };
maze.end = { row: 24, col: 24 };
const path = maze.solve();
console.log(path);

/* The above code generates a random maze using Prim's algorithm and solves it using the A* algorithm. 
   The maze generation is based on a grid, where 'true' represents a wall and 'false' represents a passage.
   The code then finds the optimal path from the start point to the end point, avoiding the walls.
   The generated maze and the solved path are printed in the console for visualization. */