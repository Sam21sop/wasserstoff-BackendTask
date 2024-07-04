class Queue {
  constructor(strategy) {
    this.strategy = strategy;
    this.queue = [];
    this.priorityQueue = new Map();
    this.currentIndex = 0;
  }

  enqueue(request) {
    if (this.strategy === 'priority') {
      const priority = request.priority || 0;
      if (!this.priorityQueue.has(priority)) {
        this.priorityQueue.set(priority, []);
      }
      this.priorityQueue.get(priority).push(request);
    } else {
      this.queue.push(request);
    }
  }

  dequeue() {
    if (this.strategy === 'FIFO') {
      return this.queue.shift();
    }
    else if (this.strategy === 'priority') {
      const priorities = Array.from(this.priorityQueue.keys()).sort((a, b) => b - a);
      for (const priority of priorities) {
        const requests = this.priorityQueue.get(priority);
        if (requests.length > 0) {
          const request = requests.shift();
          if (requests.length === 0) {
            this.priorityQueue.delete(priority);
          }
          return request;
        }
      }
    }
    else if (this.strategy === 'round-robin') {
      const request = this.queue[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % this.queue.length;
      return request;
    }
    return null;
  }

  size() {
    if (this.strategy === 'priority') {
      let size = 0;
      for (const requests of this.priorityQueue.values()) {
        size += requests.length;
      }
      return size;
    }
    return this.queue.length;
  }
}

export default Queue;
