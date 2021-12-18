import availableNotes from '../config/availableNotes' ;

export const validateBody = (schema) => async (req, res, next) => {
    try {
        const validatedData = await schema.validate(req.body);
        req.body = validatedData;
    } catch(error) {
        return res.status(400).send({Error: error.message});
    };
    next();
    
};

export const checkIfHasNotes = (req, res, next) => {
    const { purchaseAmount, amountPaid} = req.body;
    let thing = amountPaid - purchaseAmount;
    let total = 0;

    for (let i = 0; i < availableNotes.length; i++) {
        const noteValue = Object.keys(availableNotes[i]);
        const numberOfNotes = Object.values(availableNotes[i]);
        total += numberOfNotes * noteValue;
    };

    if(thing > total) {
        return res.status(400).send({Error: 'Not enough notes.'});
    };
    req.body = {...req.body, thing};
    next();

};