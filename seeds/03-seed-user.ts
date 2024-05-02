import { Knex } from 'knex'
import { seedRow } from '../utils/knex-seed'
import { hashPassword } from '../utils/hash'

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await seedRow(
        knex,
        'user',
        { username: 'Test' },
        {
            password: await hashPassword('password'),
            email: 'test@gmail.com',
            profile_pic: 'https://github.com/shadcn.png'
        }
    )

}