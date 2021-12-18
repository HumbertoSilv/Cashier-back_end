import availableNotes from "../config/availableNotes";

export const cashierFunction = (body) => {
    let { thing } = body;
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
            // 
            return false;
        };
    };
    const response = {
        ...body,
        notes: changeInNotes
    };

    return response;
};

export const cashier = (req, res) => {
    const response = cashierFunction(req.body);
    if(response){
        return res.status(200).send(response);
    };
    return res.status(400).send({Error: 'Not enough grades.'});
};