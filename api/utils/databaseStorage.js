import db from './databaseConfig.js';
import * as dotenv from 'dotenv' 
dotenv.config()

export const savePaymentReference = async (data) => {
    console.log('insert payment reference into db');
    return await db.insert(data)
    .into('raffle')
    .returning("*")
    .then( val =>  {
            console.log('success inserting the data');
            return val;
        }
    )
    .catch(err => {
        console.log('error inserting the data');
        console.log(err);
    });
}

export const getPaymentResult = async (schema) => {
    return await db('raffle')
    .returning("*")
    .where('id', schema.reference)
    .then( val =>  {
            console.log('success ');
            return val;
        }
    )
    .catch(err => {
        console.log('error ');
        console.log(err);
    });
}

export const putPaymentResult = async (schema) => {
    return await db('raffle')
    .returning("*")
    .where('paymentId', schema.id)
    .andWhere('amount', schema.amount)
    .update({ status: schema.status })
    .then( val =>  {
        console.log('success updating the data');
        return val;
    })
    .catch(err => {
        console.log('error updating the data');
        console.log(err);
        return [];
    });
}
