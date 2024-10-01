import db from './databaseConfig.js';
import * as dotenv from 'dotenv';
import { logger } from './logger.js'; // Assuming you have a logger setup
dotenv.config();

// Save Payment Reference
export const savePaymentReference = async (data) => {
    try {
        logger.info('Inserting payment reference into the database');
        const result = await db('raffle').insert(data).returning("*");
        logger.info('Successfully inserted payment reference');
        return result;
    } catch (err) {
        logger.error('Error inserting payment reference', err);
        throw new Error('Database error while inserting payment reference');
    }
};

// Get Payment Result
export const getPaymentResult = async (schema) => {
    try {
        logger.info(`Retrieving payment result for reference ${schema.reference}`);
        const result = await db('raffle').where('id', schema.reference).returning("*");
        logger.info('Successfully retrieved payment result');
        return result;
    } catch (err) {
        logger.error('Error retrieving payment result', err);
        throw new Error('Database error while retrieving payment result');
    }
};

// Update Payment Result
export const putPaymentResult = async (schema) => {
    try {
        logger.info(`Updating payment result for paymentId ${schema.id}`);
        const result = await db('raffle')
            .where('paymentId', schema.id)
            .update({ status: schema.status })
            .returning("*");
        logger.info('Successfully updated payment result');
        return result;
    } catch (err) {
        logger.error('Error updating payment result', err);
        throw new Error('Database error while updating payment result');
    }
};

