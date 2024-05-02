import { Knex } from 'knex'
import { HttpError } from '../utils/http.error'


export class BookService {
    public constructor(private knex: Knex) { }

    async getBooksList() {
        const data = await this.knex('book').select('*')
        return data
    }

    async getCatoryList() {
        const data = await this.knex('category').select('*')
        return data
    }

    async postFilterBooks(input: {
        booktitle: string
        author: string
        selectedRating: string
        selectedCategory: string
        price_int: number
        selectedPriceRange: string
    }) {

        const { booktitle, author, selectedRating, selectedCategory, price_int, selectedPriceRange } = input
        console.log(typeof price_int, price_int, typeof selectedPriceRange, selectedPriceRange)



        let query = this.knex('book').select('book.book_title', 'book.auther', 'book.rating', 'book.book_image', 'book.price_in_cent', 'category.name as category_name')
            .join('category', 'book.category_id', 'category.id')

        if (typeof booktitle === 'string' && booktitle !== '') {
            query = query.andWhere('book.book_title', 'ilike', `%${booktitle}%`)
        }

        if (typeof author === 'string' && author !== '') {
            query = query.andWhere('book.auther', 'ilike', `%${author}%`)
        }

        if (typeof selectedRating === 'string' && selectedRating !== '') {
            query = query.andWhere('book.rating', selectedRating)
        }

        if (typeof selectedCategory === 'string' && selectedCategory !== '') {
            query = query.andWhere('category.name', selectedCategory)
        }


        if (typeof price_int === 'number' && selectedPriceRange && price_int > 0) {
            if (selectedPriceRange === 'larger_than') {
                query = query.andWhere('book.price_in_cent', '>', price_int)
            } else if (selectedPriceRange === 'smaller_than') {
                query = query.andWhere('book.price_in_cent', '<', price_int)
            } else if (selectedPriceRange === 'around') {
                const lowerBound = price_int - 10
                const upperBound = price_int + 10
                query = query.andWhereBetween('book.price_in_cent', [
                    lowerBound,
                    upperBound
                ])
            }
        }

        return query
    }

    async postBookOrder(inpnt: { user_id: number, book_id: number }) {

        const { user_id, book_id } = inpnt
        const data = await this.knex('order').insert({ user_id, book_id })
        return data
    }

    async getBookOrderHistory(user_id: number) {
        const data = await this.knex('order').select('order.id, book.book_title, book.price_in_cent, category.name')
            .join('category', 'book.category_id', 'category.id')
            .join('book', 'order.book_id', 'book.id')
            .join('user', 'order.user_id', 'user.id')
            .where('user.id', user_id)

        return data
    }


}
