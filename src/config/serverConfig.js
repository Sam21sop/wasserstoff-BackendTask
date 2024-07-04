const serverInstances = {
    apis:[
        {
            url:'http://localhost:4001',
            type:'REST',
            status:'healthy'
        },
        {
            url:'http://localhost:4002',
            type:'GraphQL',
            status:'healthy'
        },
        {
            url:'http://localhost:4003',
            type:'gRPC',
            status:'healthy'
        },
    ],
    queueStrategies: ['FIFO', 'priority', 'round-robin'],
};


export default serverInstances;