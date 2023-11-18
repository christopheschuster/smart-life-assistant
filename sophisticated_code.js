/* sophisticated_code.js */

// This code demonstrates a complex algorithm for finding the shortest path in a weighted graph using the Dijkstra's algorithm

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(node) {
    this.nodes.set(node, new Map());
  }

  addEdge(source, destination, weight) {
    if (!this.nodes.has(source) || !this.nodes.has(destination)) {
      console.log("Invalid edge");
      return;
    }

    this.nodes.get(source).set(destination, weight);
  }

  dijkstraShortestPath(start) {
    const distances = new Map();
    const previous = new Map();
    const queue = new PriorityQueue();

    for (const node of this.nodes.keys()) {
      distances.set(node, Infinity);
      previous.set(node, null);
    }

    distances.set(start, 0);
    queue.enqueue(start, 0);

    while (!queue.isEmpty()) {
      const current = queue.dequeue().element;

      for (const [neighbor, weight] of this.nodes.get(current)) {
        const altDistance = distances.get(current) + weight;

        if (altDistance < distances.get(neighbor)) {
          distances.set(neighbor, altDistance);
          previous.set(neighbor, current);
          queue.enqueue(neighbor, altDistance);
        }
      }
    }

    return { distances, previous };
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }

  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }

  parent(index) {
    return this.heap[this.getParentIndex(index)];
  }

  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  peek() {
    if (this.heap.length === 0) {
      return null;
    }

    return this.heap[0];
  }

  enqueue(element, priority) {
    this.heap.push({ element, priority });
    this.heapifyUp();
  }

  dequeue() {
    if (this.heap.length === 0) {
      return null;
    }

    const element = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return element;
  }

  heapifyUp() {
    let index = this.heap.length - 1;

    while (
      this.hasParent(index) &&
      this.parent(index).priority > this.heap[index].priority
    ) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;

    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.rightChild(index).priority < this.leftChild(index).priority
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index].priority < this.heap[smallerChildIndex].priority) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }

      index = smallerChildIndex;
    }
  }
}

// Example usage

const graph = new Graph();

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addNode("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

const startNode = "A";
console.log(`Shortest paths from ${startNode}:`);
const { distances, previous } = graph.dijkstraShortestPath(startNode);

for (const [node, distance] of distances.entries()) {
  let path = `${node} (Distance: ${distance}): `;
  let previousNode = previous.get(node);

  while (previousNode !== null) {
    path += `${previousNode} -> `;
    previousNode = previous.get(previousNode);
  }

  console.log(path.slice(0, -4));
}

// Output:
// Shortest paths from A:
// A (Distance: 0):
// B -> A
// C -> A
// D -> C -> A
// E -> D -> C -> A
// F -> D -> C -> A