import express from "express";
import { cashierSchema } from './models/schema/schemaCashier';
import { validateBody, checkIfHasNotes } from './middleware/middlewares';
import cashierFunction from  './controller/cashierController';


const app = express();

app.use(express.json());
app.use('/cashier', validateBody(cashierSchema), checkIfHasNotes);

app.post('/cashier', cashierFunction);

export default app;

// app.listen('3002', () => {
//     console.log('Running at http://localhost:3000/');
// });