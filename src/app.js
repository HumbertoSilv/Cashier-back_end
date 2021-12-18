import express from "express";
import { cashierSchema } from './models/schema/schemaCashier';
import { validateBody, checkIfHasNotes } from './middleware/middlewares';
import { cashier } from  './controller/cashierController';


const app = express();

app.use(express.json());
app.use('/cashier', validateBody(cashierSchema), checkIfHasNotes);

app.post('/cashier', cashier);

export default app;
