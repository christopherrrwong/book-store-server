import Knex from 'knex'
import { env } from './env'

export function createKnex() {
    let config = require('../knexfile')
    let profile = config[env.NODE_ENV] || 'development'
    let knex = Knex(profile)
    return knex
}
