import { Request, Response } from 'express';

import db from './database';

type Score = {
  player: string;
  value: number;
  created_at: number;
};

const makeScore = (obj: Record<string, any>): Score | null => {
  if (
    typeof obj.created_at === 'number' &&
    typeof obj.value === 'number' &&
    typeof obj.player === 'string'
  ) {
    return obj as Score;
  }
  return null;
};

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS scores (
    player      varchar,
    value       integer,
    created_at  timestamp NOT NULL,
    PRIMARY KEY (player, created_at)
  );`
).run();

const insertScore = db.prepare(`
  INSERT OR REPLACE INTO scores (player, value, created_at)
    VALUES (@player, @value, @created_at)
`);

export function create(req: Request, res: Response) {
  if (!req.body) {
    return res.status(400).send({
      message: "Body can't be empty.",
    });
  }

  const score = makeScore(req.body);
  if (!score) {
    return res.status(400).send({
      message: 'Body is not a Score.',
    });
  }

  try {
    insertScore.run(score);
  } catch (exception) {
    console.error(exception);
    return res.status(500).send();
  }

  return res.status(200).send();
}

const listScores = db.prepare(`
  SELECT * FROM scores
    ORDER BY value DESC
    LIMIT 10
`);

export function list(_: Request, res: Response) {
  try {
    return res.status(200).send(listScores.all());
  } catch {
    return res.status(500).send();
  }
}

const wipeScores = db.prepare(`
  DELETE FROM scores
`);

export function wipe(req: Request, res: Response) {
  const secret = process.env.SECRET_FOR_WIPE;
  if (req.body && secret && req.headers.authorization === secret) {
    try {
      setTimeout(() => wipeScores.run(), 1);
      return res.status(200).send();
    } catch (exception) {
      console.error(exception);
      return res.status(500).send();
    }
  }
  return res.status(403).send();
}
