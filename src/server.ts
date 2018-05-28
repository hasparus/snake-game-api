import * as bodyParser from 'body-parser';
import express from 'express';
import { AddressInfo } from 'net';

import * as scores from './scores';

const VERSION = 'v1';

console.log('Running.');

const app = express();

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

app.post(`/${VERSION}/scores`, scores.create);
app.get(`/${VERSION}/scores`, scores.list);
app.get('/', (_, res) => res.status(200).send("Try /v1/scores. ;)"));

const listener = app.listen(process.env.PORT, () => {
  console.log(
    `Your app is listening on ${
      (listener.address() as AddressInfo).port
    }`
  );
});
