import { Request, Response, NextFunction, Router } from 'express'
import { AuthService } from '../services/AuthService'
import { HttpError } from '../utils/http.error'
import '../utils/session'

export class AuthController {
    router = Router()

    wrapMethod(method: (req: Request) => object | Promise<object>) {
        method = method.bind(this)
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                let json = await method(req)
                res.json(json)
            } catch (err) {
                /**
                 * (Disclaimer) These codes are copied from the error handler on
                 * server.ts I think the error handler has never been called, so
                 * I decided to put the error handling code here until we find a
                 * way to make the error handler works
                 */
                if (err instanceof HttpError) {
                    if (!err.statusCode) console.error(err)
                    res.status(err.statusCode || 500).json
                }
                let error = String(err).replace(/^(\w*)Error: /, '')
                console.log('\nCatch: ', error, '\n')
                if (req.headers.accept?.includes('application/json')) {
                    res.json({ error })
                } else {
                    res.end(error)
                }
            }
        }
    }

    public constructor(private authService: AuthService) {
        this.router.post('/login', this.wrapMethod(this.login))
        this.router.post('/register', this.wrapMethod(this.register))
    }

    login = async (req: Request) => {
        const { email, password } = req.body



        if (!email && !password) {
            throw new HttpError(401, 'Missing email and password')
        }

        if (!email) {
            throw new HttpError(401, 'Missing email')
        }

        if (!password) {
            throw new HttpError(401, 'Missing password')
        }

        let result = await this.authService.login(email, password)




        req.session.user = {
            id: result.id,
            username: result.username,
        }

        req.session.save()


        return result
    }

    async register(req: Request) {
        const { email, username, password } = req.body


        let missing_fields = []

        if (!username) {
            missing_fields.push('username')
        }

        if (!password) {
            missing_fields.push('password')
        }

        if (!email) {
            missing_fields.push('email')
        }

        if (missing_fields.length > 0) {
            throw new HttpError(401, `Missing ${missing_fields.join(', ')}`)
        }

        if (typeof username != 'string' || typeof password != 'string') {
            throw new HttpError(401, 'Non-string input is not allowed')
        }

        if (username.length < 3) {
            throw new HttpError(
                401,
                'Username should at least have 3 characters'
            )
        }

        if (username.length > 50) {
            throw new HttpError(
                401,
                'Username should at most have 50 characters'
            )
        }

        if (password.length < 6) {
            throw new HttpError(
                401,
                'Password should at least have 6 characters'
            )
        }

        if (password.length > 256) {
            throw new HttpError(
                401,
                'Password should at most have 256 characters'
            )
        }

        if (!password.match(/[a-z]/i)) {
            throw new HttpError(
                401,
                'Password should at least have 1 english characters (a-z)'
            )
        }

        if (!password.match(/[0-9]/)) {
            throw new HttpError(
                401,
                'Password should at least have 1 digits (0-9)'
            )
        }

        const json = await this.authService.register(email, username, password)

        if (!json) {
            throw new HttpError(404, 'Invalid username or password')
        }

        return json
    }
}
