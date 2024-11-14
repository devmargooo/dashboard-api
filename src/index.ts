import express from 'express';
import { userRouter } from './users/users.js';

const port = 8001;

const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello world')
})

app.get('/error', (req, res) => {
    throw new Error('err');
})

app.use((err, res, next) => {
    console.log(err);
    next();
    // res.status(500).send(err.statusMessage); 
})


app.use((req, res, next) => {
    console.log('Время ', Date.now());
    next();
})

app.use('/users', userRouter);


app.listen(port, () => {
    console.log("Server started")
})