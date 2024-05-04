import { Request, Response, NextFunction, Router } from 'express'
import { AuthService } from '../services/AuthService'
import { HttpError } from '../utils/http.error'
import '../utils/session'
import { OrderService } from '../services/OrderService'

export class OrderController {
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

    public constructor(private orderService: OrderService) {
        this.router.post('/book/order', this.wrapMethod(this.postBookOrder))
        this.router.delete('/book/order/:id', this.wrapMethod(this.cancelBookOrder))
        this.router.get('/book/order-history/:id', this.wrapMethod(this.getBookOrderHistory))
    }



    async cancelBookOrder(req: Request) {
        const order_id = req.params.id
        const order = await this.orderService.cancelBookOrder(order_id)
        return { success: true }
    }

    async postBookOrder(req: Request) {
        const { user_id, book_id } = req.body
        const order = await this.orderService.postBookOrder({ user_id, book_id })

        return { success: true }
    }

    async getBookOrderHistory(req: Request) {
        const user_id = req.params.id

        if (!user_id) {
            throw new HttpError(404, 'Invalid ID')
        }


        const order = await this.orderService.getBookOrderHistory(user_id)
        return order
    }

}
