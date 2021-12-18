import express, { response } from "express";
import availableNotes from "./config/availableNotes";
import { cashierSchema } from './models/schema/schemaCashier';
import { validateBody, checkIfHasNotes } from './middleware/middlewares';

const app = express();

app.use(express.json());
app.use('/cashier', validateBody(cashierSchema), checkIfHasNotes);


app.post('/cashier', (req, res) => {
    let { thing } = req.body;
    const changeInNotes = {};

    for (let i = 0; i < availableNotes.length; i++) {
        let noteValue = Object.keys(availableNotes[i]);
        let numberOfNotes = Math.floor(thing / parseInt(noteValue));

        if(numberOfNotes != 0 ){
            changeInNotes[noteValue] = numberOfNotes;
            thing -= numberOfNotes * noteValue;            
        };

        if(availableNotes[i][noteValue] > numberOfNotes) {
            availableNotes[i][noteValue] -= numberOfNotes;
        } else{
            return res.status(400).send({Error: 'Not enough grades.'});
        };
    };
    console.log(availableNotes);
    response = {
        ...req.body,
        notes: changeInNotes
    };

    res.status(200).send(response);

});

app.listen('3002', () => {
    console.log('Running at http://localhost:3000/');
});