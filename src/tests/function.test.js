import { cashierFunction } from "../controller/cashierController";

describe('Test cashierFunction.', () => {
    test('Should return an OBJECT with all properties.', () => {
        const obj = cashierFunction({purchaseAmount: 10.00, amountPaid: 200.00, thing: 190});

        expect(obj).toHaveProperty('purchaseAmount');
        expect(obj).toHaveProperty('amountPaid');
        expect(obj).toHaveProperty('thing');
        expect(obj).toHaveProperty('notes');
    });

});