import express from 'express';


// create server instance
const app = express();
const port = 3000


// register a simple route
app.get('/', (req, res) => {
    res.send("Hello Developer, This is Proxy Server")
});


// run server on specified port
app.listen(port, () => {
    console.log(`'Primary server is listening on: http://localhost:${port}`);
})