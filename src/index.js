import express, { response } from "express";
import availableNotes from "./config/availableNotes";
import { cashierSchema } from './models/schema/schemaCashier';

const app = express();

app.use(express.json());

const validateBody = (schema) => async (req, res, next) => {
    try {
        const validatedData = await schema.validate(req.body);
        req.body = validatedData;
    } catch(error) {
        return res.status(400).send({Error: error.message});
    };
    next();
    
};



const cashBalance = () => {
    let total = 0;
    for (let i = 0; i < availableNotes.length; i++) {
        const noteValue = Object.keys(availableNotes[i]);
        const numberOfNotes = Object.values(availableNotes[i]);
        total += numberOfNotes * noteValue;
    };
    return total;
};

app.post('/cashier', validateBody(cashierSchema), (req, res) => {
    const { purchaseAmount, amountPaid} = req.body;
    const changeInNotes = {};
    let thing = amountPaid - purchaseAmount;

    if(thing > cashBalance()) {
        return res.status(400).send({Error: 'Not enough grades.'});
    };

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
        changeInNotes: changeInNotes
    };

    res.status(200).send(response);

});

app.listen('3002', () => {
    console.log('Running at http://localhost:3000/');
});