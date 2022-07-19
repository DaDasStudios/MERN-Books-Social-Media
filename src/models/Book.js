import { model, Schema } from 'mongoose'

const bookSchema = new Schema({
    ownerId: {
        ref: "User",
        type: Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: "Anonymous"
    },
    description: {
        type: String,
        required: true
    },
    published: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Book', bookSchema)