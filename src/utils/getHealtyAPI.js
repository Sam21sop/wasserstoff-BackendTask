import serverInstances from "../config/serverConfig.js";

// Intelligent Routing
const getHealthyApi = (req) => {
    let healthyApis = serverInstances.apis.filter(api => api.status === 'healthy');
    if (req.headers['content-type'] === 'application/graphql') {
        healthyApis = healthyApis.filter(api => api.type === 'GraphQL');
    } else if (req.headers['content-type'] === 'application/grpc') {
        healthyApis = healthyApis.filter(api => api.type === 'gRPC');
    } else if (req.headers['content-type'] === 'application/json') {
        healthyApis = healthyApis.filter(api => api.type === 'REST');
    }

    if (healthyApis.length === 0) return null;

    // Weighted random selection
    const totalWeight = healthyApis.reduce((acc, api) => acc + api.weight, 0);
    const randomWeight = Math.random() * totalWeight;
    let currentWeight = 0;

    for (const api of healthyApis) {
        currentWeight += api.weight;
        if (currentWeight >= randomWeight) {
            return api;
        }
    }
    return null;
};




export {
    getHealthyApi
}