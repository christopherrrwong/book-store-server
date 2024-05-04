import { Knex } from 'knex'
import { comparePassword, hashPassword } from '../utils/hash'
import jwtSimple from 'jwt-simple'
import jwt from '../utils/jwt'
import { HttpError } from '../utils/http.error'

export class AuthService {
    public constructor(private knex: Knex) { }

    table() {
        return this.knex('user')
    }

    async login(email: string, password_input: string) {
        let user = await this.table().select('*').where('email', email)

        if (user.length > 0) {
            let password_hash = user[0].password

            let compareResult = await comparePassword(
                password_input,
                password_hash
            )

            if (compareResult) {
                // upon successful login, create JWT to send back
                const payload = {
                    id: user[0].id,
                    username: user[0].username
                }

                const token = jwtSimple.encode(payload, jwt.jwtSecret)

                console.log(token)

                return {
                    message: 'success',
                    token: token,
                    id: user[0].id,
                    username: user[0].username,
                }
            } else {
                throw new HttpError(401, 'wrong username or password')
            }
        } else {
            throw new HttpError(401, 'wrong username or password')
        }
    }

    async register(email: string, username: string, password: string) {



        const notUnique = await this.knex('user')
            .select('id')
            .where({ email })
            .first()

        if (notUnique) throw new HttpError(401, 'Email not unique')

        const user = await this.knex('user')
            .insert({
                email: email,
                username: username,
                password: await hashPassword(password),
            })
            .returning(['id'])

        if (!user) throw new HttpError(500, 'Failed to insert new user')

        const insertedUser = user[0]

        const user_id = insertedUser.id

        const payload = {
            id: user_id,
            username: user[0].username
        }

        const token = jwtSimple.encode(payload, jwt.jwtSecret)

        return {
            message: 'success',
            token: token,
            id: user[0].id,
            username: user[0].username,
        }
    }
}
