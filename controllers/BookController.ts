import { Request, Response, NextFunction, Router } from 'express'
import { AuthService } from '../services/AuthService'
import { HttpError } from '../utils/http.error'
import '../utils/session'
import { Book } from '../types'
import { BookService } from '../services/BookService'

export class BookController {
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

    public constructor(private bookService: BookService) {
        this.router.get('/book', this.wrapMethod(this.getBooksList))
        this.router.get('/category', this.wrapMethod(this.getCatoryList))
        this.router.post('/book/filter', this.wrapMethod(this.postFilterBooks))
    }

    async getBooksList(req: Request) {
        const book_list = await this.bookService.getBooksList()
        return book_list
    }

    async getCatoryList(req: Request) {
        const category_list = await this.bookService.getCatoryList()
        return category_list
    }

    async postFilterBooks(req: Request) {
        const { booktitle, author, selectedRating, selectedCategory, price, selectedPriceRange } = req.body

        const price_int = parseInt(price)

        const book_list = await this.bookService.postFilterBooks({ booktitle, author, selectedRating, selectedCategory, price_int, selectedPriceRange })

        return book_list
    }

}
