import * as dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV, MONGO_URI } = process.env;

export const config =
  NODE_ENV === 'test'
    ? {
        envFilePath: '.test.env',
        dbUri: MONGO_URI,
      }
    : {
        envFilePath: '.development.env',
        dbUri: MONGO_URI,
      };

console.log(config);
