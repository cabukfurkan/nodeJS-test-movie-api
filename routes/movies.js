import express from 'express'
import { getMovies, addMovies, getMovie, deleteMovie } from "../controllers/movies.js";

const router = express.Router()

router.get('/', getMovies)

router.post('/', addMovies)

router.get('/:id', getMovie)

router.delete('/:id', deleteMovie)

export default router
