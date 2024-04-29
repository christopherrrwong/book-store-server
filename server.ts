import express from "express";
import { Request, Response } from "express";
import { env } from './utils/env'
import { createKnex } from './utils/db'

const app = express();
let knex = createKnex()


app.get("/", function (req: Request, res: Response) {
    res.end("Hello World");
});

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});