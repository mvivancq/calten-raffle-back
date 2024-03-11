import db from './databaseConfig.js';
import { parseResultDetails } from "./parsing.js";
import * as dotenv from 'dotenv' 
dotenv.config()

export const savePaymentReference = async (schema, data) => {
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
    return 2;
}
