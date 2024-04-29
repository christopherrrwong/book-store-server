import expressSession from 'express-session'
import { env } from './env'

export let sessionMiddleware = expressSession({
    secret: env.SECRET,
    resave: false,
    saveUninitialized: false
})

declare module 'express-session' {
    interface SessionData {
        user: {
            id: number
            username: string
        }
    }
}
