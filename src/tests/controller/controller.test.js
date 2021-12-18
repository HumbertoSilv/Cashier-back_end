import request from 'supertest';
import app from '../../app';

const payload = {
	purchaseAmount: 10.00,
	amountPaid: 200.00
};

describe('Cashier integration tests', () => {
    test('Return with success.', async () => {
        const response = await request(app).post('/cashier').send(payload);

        expect(response.statusCode).toBe(200);
    });

	test('Failed return.', async () => {
		const response = await request(app).post('/cashier').send({purchaseAmount: 10.00,});

		expect(response.statusCode).toBe(400);
	});
});