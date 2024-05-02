import { Request, Response, NextFunction, Router } from 'express'
import { HttpError } from '../utils/http.error'
import '../utils/session'
import { UserService } from '../services/UserService'

export class UserController {
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

    public constructor(private userService: UserService) {
        this.router.get('/user/:id', this.wrapMethod(this.getUserInfo))

    }

    async getUserInfo(req: Request) {
        const user_id = parseInt(req.params.id)
        if (!user_id) {
            throw new HttpError(404, 'Invalid ID')
        }

        let result = await this.userService.getUserInfo(user_id)
        return result

    }

}
