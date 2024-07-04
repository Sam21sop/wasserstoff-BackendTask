import express from 'express';


// create server instance
const app = express();
const port = 4002;

app.get('/', (req, res) => {
    return res.status(200).json({message: "Mock API 2 is running, which have 3 routes /health /fast /slow"})
});

app.get('/health', (req, res) => {
    return res.status(200).json({message: "Mock API 2 is healthy"})
});

app.get('/fast', (req, res)=> {
    return res.status(200).json({message:"fast response from API 2"})
});

app.get('/slow', (req, res) => {
    return setTimeout(() => res.status(200).json({message:"Slow response from API 2"}), 5000)
});


app.listen(port, ()=>{
    console.log(`Mock API listing on port: ${port}`);
});