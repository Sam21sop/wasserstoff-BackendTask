import express from 'express';


// create server instance
const app = express();
const port = 4003;

app.get('/', (req, res) => {
    return res.status(200).json({message: "Mock API 3 is running, which have 3 routes /health /fast /slow"})
});

app.get('/health', (req, res) => {
    return res.status(200).json({message: "Mock API 3 is healthy"})
});

app.get('/fast', (req, res)=> {
    return res.status(200).json({message:"fast response from API 3"})
});

app.get('/slow', (req, res) => {
    return setTimeout(() => res.status(200).json({message:"Slow response from API 3"}), 4000)
});


app.listen(port, ()=>{
    console.log(`Mock API listing on port: ${port}`);
});