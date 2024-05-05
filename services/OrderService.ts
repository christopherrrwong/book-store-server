import { Knex } from 'knex'
import { HttpError } from '../utils/http.error'


export class OrderService {
    public constructor(private knex: Knex) { }



    async postBookOrder(inpnt: { user_id: number, book_id: number }) {

        const { user_id, book_id } = inpnt
        const now = new Date();
        const order_date = now.toISOString().split('T')[0];
        const data = await this.knex('order').insert({ user_id: user_id, book_id: book_id, order_date: order_date })

        return data
    }

    async cancelBookOrder(order_id: string) {
        const data = await this.knex('order').where('id', order_id).del()

        return data
    }

    async getBookOrderHistory(user_id: string) {
        const data = await this.knex('order').select('order.id as order_id', 'order.order_date', 'book.book_title', 'category.name', 'book.price_in_cent')
            .join('book', 'order.book_id', 'book.id')
            .join('user', 'order.user_id', 'user.id')
            .join('category', 'book.category_id', 'category.id')
            .where('order.user_id', user_id)


        const updatedData = data.map(item => ({
            ...item,
            order_date: new Date(item.order_date).toISOString().split('T')[0],
        }));


        return updatedData
    }




}
