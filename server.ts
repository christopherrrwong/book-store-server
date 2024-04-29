import express from "express";
import { Request, Response } from "express";
import { env } from './utils/env'
import { createKnex } from './utils/db'
import { AuthController } from './controllers/AuthController'
import { AuthService } from "./services/AuthService";

const app = express();
app.use(express.json())
let knex = createKnex()


const authService = new AuthService(knex)
const authController = new AuthController(authService)


app.use(authController.router)
app.get("/", function (req: Request, res: Response) {
    res.end("Hello World");
});

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});