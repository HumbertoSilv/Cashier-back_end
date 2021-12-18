import * as yup from 'yup';

export const cashierSchema = yup.object().shape({
    purchaseAmount: yup.number().required(),
    amountPaid: yup.number().required()
})