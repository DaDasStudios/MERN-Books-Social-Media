import mongoose from 'mongoose'
import { MONGODB_PWD, MONGODB_URI, MONGODB_USER } from './config'

export function connectDB() {
    mongoose.connect(MONGODB_URI, {
        user: MONGODB_USER,
        pass: MONGODB_PWD,
        dbName: "jwt-books"
    })
    .then(db => console.log(`Connected to <${db.connections[0].name}>`))
    .catch(err => console.error(err))
}