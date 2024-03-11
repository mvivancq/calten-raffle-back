import Knex from "knex";
import pgConnection from 'pg-connection-string';
import * as dotenv from 'dotenv' 
dotenv.config()

const pgconfig = pgConnection.parse(process.env.POSTGRES_URL);
if(process.env.INSTANCE !== 'LOCALDEV'){
    //pgconfig.ssl = { rejectUnauthorized: false };
    pgconfig.port = '5432';
}

const db = Knex({
  client: 'pg',
  connection: pgconfig,
});

export default db;