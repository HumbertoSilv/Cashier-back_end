import express from "express";

const app = express();


app.get('/', (req, res) => {
    res.send('get');
});

app.listen('3001', () => {
    console.log('Running at http://localhost:3000/');
});