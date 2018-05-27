import * as bodyParser from 'body-parser';
import express from 'express';
import { AddressInfo } from 'net';

import * as scores from './scores';

const VERSION = 'v1';

console.log('Running.');

const app = express();

app.use(bodyParser.json());

app.post(`/${VERSION}/scores`, scores.create);
app.get(`/${VERSION}/scores`, scores.list);

const listener = app.listen(process.env.PORT, () => {
  console.log(
    `Your app is listening on ${
      (listener.address() as AddressInfo).port
    }`
  );
});
