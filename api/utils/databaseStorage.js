import db from './databaseConfig.js';
import * as dotenv from 'dotenv' 
dotenv.config()

export const savePaymentReference = async (schema) => {
    console.log('insert payment reference into db');
    return await db.insert({ 
        numberOfTickets: schema.numberOfTickets,
        amount: schema.amount,
        name: schema.name,
        email: schema.email,
    })
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
    // console.log('insert post request into db');
    // const id = parseResultDetails(data).resultDetails.id;
    // const idclient = 1;
    // await db.insert({ 
    //     id, 
    //     idclient,
    //     cellphone: schema.cellphone,
    //     reference: schema.reference,
    //     concept: schema.concept, 
    //     amount: schema.amount,
    //     beneficiaryname: schema.beneficiaryName,
    //     beneficiaryaccount: schema.beneficiaryAccount,
    //     status: -1,
    // })
    // .into('request')
    // .then( () =>  console.log('success inserting the data'))
    // .catch(err => {
    //     console.log('error inserting the data');
    //     console.log(err);
    // });
    return 1;
}
