import express from "express";
import moviesRoutes from './routes/movies.js'

const app = express()

const PORT = 3000

app.use(express.json())

app.use('/movies', moviesRoutes)

app.listen(PORT, () => console.log(`Server listening at ${PORT}`))

export default app