
import {DocumentClient} from 'aws-sdk/clients/dynamodb';


const isTest = process.env.JEST_WORKER_ID;
const config = {
    convertEmptyValues: true,
    ...(isTest && {
        endpoint: 'localhost:3000',
        sslEnabled: false,
        region: 'local-env',
    }),
};

export const ddb = new DocumentClient(config);
