import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { AddressInfo } from 'net';

import decorateConsoleFunctions from './console';
import readEnvFile from './env';
import * as scores from './scores';

decorateConsoleFunctions();
readEnvFile();

const VERSION = 'v1';

console.log('Running.');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
/*
app.use((req, _, next) => {
  console.dir(req.body, { color: true, depth: 3 });
  next();          
});
*/

app.post(`/${VERSION}/scores`, scores.create);
app.get(`/${VERSION}/scores`, scores.list);
app.delete(`/${VERSION}/scores`, scores.wipe);

app.get('/', (_, res) => res.status(200).send('Try /v1/scores. ;)'));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Your app is listening on ${
      (listener.address() as AddressInfo).port
    }`
  );
});
