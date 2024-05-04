import express from "express";
import { Request, Response } from "express";
import { env } from './utils/env'
import { createKnex } from './utils/db'
import { AuthController } from './controllers/AuthController'
import { AuthService } from "./services/AuthService";
import { BookService } from "./services/BookService";
import { BookController } from "./controllers/BookController";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { isLoggedIn } from './utils/guard'
import { OrderService } from "./services/OrderService";
import { OrderController } from "./controllers/OrderController";

const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())
let knex = createKnex()


const authService = new AuthService(knex)
const authController = new AuthController(authService)
const bookService = new BookService(knex)
const bookController = new BookController(bookService)
const userService = new UserService(knex)
const userController = new UserController(userService)
const orderService = new OrderService(knex)
const orderController = new OrderController(orderService)


app.use(authController.router)
app.use(bookController.router)
app.use(isLoggedIn, userController.router)
app.use(orderController.router)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});