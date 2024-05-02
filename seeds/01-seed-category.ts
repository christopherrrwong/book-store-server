import { Knex } from 'knex'
import { seedRow } from '../utils/knex-seed'


export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await seedRow(
        knex,
        'category',
        { name: 'Fiction' },
    )
    await seedRow(
        knex,
        'category',
        { name: 'Mystery/Thriller' },
    )
    await seedRow(
        knex,
        'category',
        { name: 'Romance' },
    )
    await seedRow(
        knex,
        'category',
        { name: 'Biography' },
    )
    await seedRow(
        knex,
        'category',
        { name: 'Self-Help' },
    )
    await seedRow(
        knex,
        'category',
        { name: 'Business/Finance' },
    )
    await seedRow(
        knex,
        'category',
        { name: 'Travel' },
    )
    await seedRow(
        knex,
        'category',
        { name: 'Cooking/Food' },
    )

}