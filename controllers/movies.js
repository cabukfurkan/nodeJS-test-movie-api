import { v4 as uuidv4 } from "uuid";
export let movies = []

export const getMovies = (req, res) => {
    if (movies.length === 0) {
        res.status(404).json({
            msg: 'There is no movie, Lets add a movie'
        })
        return
    }
    res.status(200).json(movies);
}

export const addMovies = (req, res) => {
    const movie = req.body;

    const numberOfProperties = Object.keys(movie).length

    if (numberOfProperties > 3) {
        res.status(400).json({
            msg: 'you entered more than three information, please provide only requested information',
            requested: "title, director, release date"
        })
        return
    }

    if (!movie.title || !movie.director || !movie.release_date) {
        res.status(400).json({
            msg: 'Please provide all the requested information with the given format',
            requested: "title, director, release date"
        })
        return
    }

    const found = movies.find(dbMovie => dbMovie.title === movie.title)

    if (found) {
        res.status(400).json({
            msg: `${movie.title} is already in the movies, provide different movie!`,
        })
        return
    }
    movie.id = uuidv4()
    movies.push(movie);

    res.status(201).json({ msg: `movie with the id: ${movie.id} added to movies` });
}

export const getMovie = (req, res) => {
    const { id } = req.params
    const found = movies.find(movie => movie.id === id)
    if (!found) {
        res.status(404).json({ msg: `there is no movie with the id: ${id}` })
        return
    }
    res.status(200).json(found);
}

export const deleteMovie = (req, res) => {
    const { id } = req.params
    const found = movies.find(movie => movie.id === id)
    if (!found) {
        res.status(404).json({ msg: `there is no movie with the id: ${id}` })
        return
    }
    movies = movies.filter(movie => movie.id !== id)
    res.status(200).json({ msg: `movie with the id: ${id} deleted!` });
}