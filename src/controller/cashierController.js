import availableNotes from "../config/availableNotes";

const cashierFunction = (req, res) => {
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
    const response = {
        ...req.body,
        notes: changeInNotes
    };
    res.status(200).send(response);

};

export default cashierFunction;