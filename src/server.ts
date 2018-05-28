import * as bodyParser from 'body-parser';
import express from 'express';
import { AddressInfo } from 'net';
import cors from 'cors';
import morgan from 'morgan';

import * as scores from './scores';

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

app.post(`/${VERSION}/scores`, (_, res) => {
  console.log("Create!");
  res.status(200).send("Ok");
});
app.get(`/${VERSION}/scores`, scores.list);
app.get('/', (_, res) => res.status(200).send("Try /v1/scores. ;)"));

const listener = app.listen(process.env.PORT, () => {
  console.log(
    `Your app is listening on ${
      (listener.address() as AddressInfo).port
    }`
  );
});
