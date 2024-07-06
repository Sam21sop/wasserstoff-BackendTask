import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import express from 'express';


/**
 * Clusters of Node.js processes can be used to run multiple instances of Node.js 
 * that can distribute workloads among their application threads.
 * 
 * The cluster module allows easy creation of child processes that all share server ports.
 */

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Workers can share any TCP connection In this case, it is an HTTP server with Express
  const app = express();

  app.get('/', (req, res) => {
    res.send(`hello Developer, Worker ${process.pid} executed`);
  });

  app.listen(8000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
