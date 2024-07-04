import serverInstances from "../config/serverConfig.js";
import axios from "axios";

const healthCheck = async () => {
    for (let api of serverInstances.apis) {
        try {
            await axios.get(`${api.url}/health`)
        } catch (error) {
            api.status = 'unhealthy'
        }
    }
};

export {
    healthCheck
}