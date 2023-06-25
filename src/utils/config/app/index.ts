import * as dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV, MONGO_URI } = process.env;

export const config =
  NODE_ENV === 'test'
    ? {
        envFilePath: '.development.env',
        dbUri: 'mongodb://localhost:27014/nestauth_test',
      }
    : {
        envFilePath: '.development.env',
        dbUri: MONGO_URI,
      };

console.log(config);
