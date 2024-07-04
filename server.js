import express from 'express';
import morgan from 'morgan';
import axios from 'axios';

import serverInstances from './src/config/serverConfig.js';
import Queue from './src/queueManagment./queueManagment.js';
import logger from './src/utils/logger.js';

import { getHealthyApi } from './src/utils/getHealtyAPI.js';
import { healthCheck } from './src/utils/healthCheck.js';


// create primary server or proxy server which distribute the incomming request
const app = express();
const port = 8080;
const queues = {};

serverInstances.queueStrategies.forEach((strategy) => {
    queues[strategy] = new Queue(strategy);
})

// setup morgan middleware 
app.use(morgan('combined', {
    stream: {
        write: message => logger.info(message.trim())
    }
}));

app.use(express.json());

// checking health after 5 sec repetatively 
setInterval(healthCheck, 5000);

app.get('/', (req, res) => {
    res.status(200).json({message:"Load balancer is running..."})
})


app.post('/enqueue/:strategy', (req, res) => {
    const strategy = req.params.strategy;
    if (!queues[strategy]) {
        res.status(400).send('Invalid queue strategy');
        return;
    }
    queues[strategy].enqueue(req.body);
    res.send('Request enqueued');
});

const processQueue = async (strategy) => {
    const queue = queues[strategy];
    while (true) {
        if (queue.size() > 0) {
            const request = queue.dequeue();
            const api = getHealthyApi(request);
            if (!api) {
                logger.error('All APIs are currently unavailable.');
                continue;
            }

            const startTime = Date.now();
            try {
                const response = await axios({
                    method: request.method,
                    url: `${api.url}${request.url}`,
                    data: request.body,
                    headers: request.headers,
                });
                const endTime = Date.now();
                logger.info(`Request to ${api.url} took ${endTime - startTime} ms`);
                request.res.status(response.status).send(response.data);
            } catch (error) {
                const endTime = Date.now();
                logger.error(`Request to ${api.url} failed and took ${endTime - startTime} ms`);
                request.res.status(error.response ? error.response.status : 500).send(error.message);
            }
        } else {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
};

serverInstances.queueStrategies.forEach(strategy => processQueue(strategy));


app.listen(port, () => {
    logger.info(`Load balancer listening at http://localhost:${port}`)
    console.log(`Load balancer listening at http://localhost:${port}`)
})

