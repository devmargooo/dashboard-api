import express from 'express';

const port = 8001;

const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log("Server started")
})
