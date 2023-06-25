import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

const { NODE_ENV } = process.env;
const rootDirectory = path.resolve(process.cwd());
const filePath = NODE_ENV === 'test' ? '.test.env' : '.development.env';
const envFile = path.resolve(rootDirectory, filePath);
const envConfig = dotenv.parse(fs.readFileSync(envFile));

console.log(envConfig.MONGO_URI);

const { MONGO_URI } = envConfig;

export const config =
  NODE_ENV === 'test'
    ? {
        envFilePath: filePath,
        dbUri: MONGO_URI,
      }
    : {
        envFilePath: filePath,
        dbUri: MONGO_URI,
      };

console.log(config);
