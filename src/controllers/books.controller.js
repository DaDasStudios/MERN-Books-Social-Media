import Book from '../models/Book'
import { INTERNAL_ERROR, INVALID_DATA, INVALID_ID } from '../util/jsonStatus'

export async function getAllBooks(req, res) {
    const foundBooks = await Book.find({ visibility: "Public" })
    return res.status(200).json(foundBooks)
}

export async function getSingleBookById(req, res) {
    const foundBook = await Book.findById(req.params.id)
    return res.status(200).json(foundBook)
}

export async function getBooksByUserId(req, res) {
    try {
        const books = await Book.find({ ownerId: req.params.id })
        return res.status(200).json(books)
    } catch (error) {
        return res.status(500).json(INVALID_ID)
    }

}

export async function createBook(req, res) {
    const { ownerId, name, author, description, published, category, imgUrl, visibility } = req.body
    if (!ownerId || !name || !description || !published || !category || !imgUrl || !visibility) return res.status(400).json(INVALID_DATA)

    const newBook = new Book({ ownerId, name, description, published, category, author, imgUrl, visibility })
    const savedBook = await newBook.save()
    res.status(201).json(savedBook)
}

export async function updateBookById(req, res) {
    try {
        const { ownerId, name, author, description, published, category, imgUrl, visibility } = req.body
        if (
            [ownerId, name, author, description, published, category, imgUrl, visibility].every(each => !each)
        ) return res.status(400).json(INVALID_DATA)
        console.log(visibility)
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json(updatedBook)
    } catch (error) {
        return res.status(500).json(INTERNAL_ERROR)
    }
}

export async function deleteAllBooks(req, res) {
    const deletedBooks = await Book.deleteMany()
    res.sendStatus(204)
}

export async function deleteBookById(req, res) {
    const deletedBook = await Book.findByIdAndDelete(req.params.id)
    return deletedBook ? res.sendStatus(204) : res.status(400).json(INVALID_DATA)
}

