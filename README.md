<h1 align="center">Intelligent Load Balancer for Multi-API Management</h1>

This project implements a load balancer that intelligently routes incoming requests to multiple unique API endpoints based on dynamic routing criteria. It showcases the understanding of load balancing concepts and the ability to design and implement a sophisticated routing mechanism.

Clusters of Node.js processes can be used to run multiple instances of Node.js 
that can distribute workloads among their application threads.

The cluster module allows easy creation of child processes that all share server ports.



## System Architecture Diagram
![System Flow](./public/loadbalancer.png)

![Round Robin](./public/RoundRobinLoadBalancer.png)


                          +-------------------------------------------+
                          |                 Clients                   |
                          +-------------------------------------------+
                              |       |       |     |     |       |       
                              |       |       |     |     |       |        <--- HTTP Requests
                              v       v       v     v     v       v       
                    +-----------------------------------------------------------+
                    |                   Load Balancer                           | 
                    |                                                           | 
                    |           +--------------------------------+              | 
                    |           |           Queue Manager        |              |
                    |           +--------------------------------+              | 
                    |               |                     |                     |                     
                    |               |                     |                     |     
                    |               |                     |                     |     
                    |               v                     v                     |         
                    |        +----------------+     +----------------+          |                                         
                    |        |   FIFO Queue   |     | Priority Queue |          |                                 
                    |        +----------------+     +----------------+          |                                                   
                    |             |                          |                  |                                         
                    |             v                          v                  |                                           
                    |        +------------------+    +------------------+       |                                   
                    |        | Request Handler  |    | Request Handler  |       |                     
                    |        +------------------+    +------------------+       |                     
                    |                |                         |                |                     
                    |                v                         v                |                     
                    |        +--------------+          +--------------+         |                   
                    |        | Healthy API  |          | Healthy API  |         |                   
                    |        |  Selector    |          |  Selector    |         |                   
                    |        +--------------+          +--------------+         |                 
                    |              |                         |                  |         
                    |              v                         v                  |         
                    |      +-------------+  +-------------+  +-------------+    |                      
                    |      | Mock API 1  |  | Mock API 2  |  | Mock API 3  |    |                      
                    |      |  (REST)     |  | (GraphQL)   |  |   (gRPC)    |    |                      
                    |      +-------------+  +-------------+  +-------------+    |                      
                    |        |       |         |       |        |       |       |                   
                    |      +-----+ +-----+   +-----+ +-----+  +-----+ +-----+   |                     
                    |      |Fast | |Slow |   |Fast | |Slow |  |Fast | |Slow |   |                     
                    |      +-----+ +-----+   +-----+ +-----+  +-----+ +-----+   |                     
                    +-----------------------------------------------------------+



### Component Descriptions
1. ***Clients*** The users or services that send HTTP requests to the load balancer.
2. ***Load Balancer*** The main component that routes incoming requests to the appropriate mock APIs based on defined criteria and queuing strategies.
    - Queue Manager: Manages different queue strategies (FIFO, priority-based, round-robin) and enqueues incoming requests.
    - Logger: Captures and logs metrics such as request times, endpoint selection, and response times.
3. ***Queues***
    - FIFO Queue: First-In-First-Out queue strategy.
    - Priority Queue: Handles requests based on priority.
    - Round-Robin Queue: Distributes requests in a round-robin manner.
4. ***Request Handler***: Processes requests from queues and selects a healthy API endpoint using the Healthy API Selector.
5. ***Healthy API Selector***: Determines the healthiest API endpoint based on a weighted random selection algorithm, which considers the health status and weights of APIs.
6. ***Mock APIs***: Simulate different types of APIs (REST, GraphQL, gRPC) with varied response times and behaviors.
    - Mock API 1: A REST API with endpoints that simulate fast and slow responses.
    - Mock API 2: A GraphQL API with endpoints that simulate fast and slow responses.
    - Mock API 3: A gRPC API with endpoints that simulate fast and slow responses.
7. ***Metrics Logger***: Logs metrics for analysis to understand the performance and load distribution of the queuing strategies.


### Steps
1. Clients send HTTP requests to the load balancer.
2. The load balancer's Queue Manager enqueues requests into the appropriate queue based on the specified strategy.
3. The Request Handler dequeues requests and uses the Healthy API Selector to determine a healthy API endpoint.
4. The request is forwarded to the selected mock API, and the response is sent back to the client.
5. The Logger captures metrics and logs the necessary information for analysis.
6. The Metrics Logger consolidates the performance data for different queuing strategies to analyze their efficiency and effectiveness.

## Functinality
1. Dynamic Routing (Routing based on API type)
2. Function simulation (simulate slow and fast response)
3. Logs and Metrics (Provide details login for analysis such as, request time, endpoint selection, response time etc)
4. Port Management (run the loadbalancer on specified port)
