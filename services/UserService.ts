import { Knex } from 'knex'
import { HttpError } from '../utils/http.error'

export class UserService {
    public constructor(private knex: Knex) { }

    async getUserInfo(id: number) {
        const data = await this.knex('user').select('*')
            .where('id', id)
        return data
    }


}
