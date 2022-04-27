import { response } from "express"
import supertest from "supertest"
import app from '../index.js'

import { movies } from "../controllers/movies.js"

const request = supertest(app)

describe("GET /movies", () => {

    describe("when a movies want to be fetched", () => {
        it("should return status 404 when there is no movie in db", async () => {
            const response = await request.get(`/movies`)
            const msg = response.body.msg;
            if (msg) {
                expect(response.status).toBe(404)
            }
        })

        it("should return status 200 when there is movie in db", async () => {
            const response = await request.get(`/movies`)
            const msg = response.body.msg;
            if (!msg) {
                expect(response.status).toBe(200)
            }
        })
    })

    describe("when a specific movie want to be fetched with id", () => {
        it("should return status 404 when movie with id is not found", async () => {
            const response = await request.get(`/movies/:id`)
            const msg = response.body.msg;
            if (msg) {
                expect(response.status).toBe(404)
            }
        })

        it("should return status 200 when movie with id is found", async () => {
            const response = await request.get(`/movies/:id`)
            const msg = response.body.msg;
            if (!msg) {
                expect(response.status).toBe(200)
            }
        })
    })
});

describe("POST /movies", () => {
    describe("when movie is provided", () => {
        it("should return status 201", async () => {
            const response = await request.post("/movies").send({
                title: "LOTR3",
                director: "Peter Jackson",
                release_date: "2001-12-19"
            })
            expect(response.statusCode).toEqual(201)
        })

        it("should specify json in the content type header", async () => {
            const response = await request.post("/movies").send({
                title: "LOTR3",
                director: "Peter Jackson",
                release_date: "2001-12-19"
            })
            console.log(response);
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })

    describe("when empty field is provided", () => {
        it("should return status 400 when empty field", async () => {
            const response = await request.post("/movies").send({
                title: "",
                director: "Peter Jackson",
                release_date: "2001-12-19"
            })
            expect(response.statusCode).toEqual(400)
        })
        it("should return status 400 when empty field", async () => {
            const response = await request.post("/movies").send({
                title: "LOTR4",
                director: "",
                release_date: "2001-12-19"
            })
            expect(response.statusCode).toEqual(400)
        })
        it("should return status 400 when empty field", async () => {
            const response = await request.post("/movies").send({
                title: "LOTR4",
                director: "Peter Jackson",
                release_date: ""
            })
            expect(response.statusCode).toEqual(400)
        })
    })

    describe("when required field is missing", () => {
        it("should return status 400 ", async () => {
            const response = await request.post("/movies").send({
                director: "Peter Jackson",
                release_date: "2001-12-19",
            })
            expect(response.statusCode).toEqual(400)
        })
    })

    describe("when more than 3 field is provided", () => {
        it("should return status 400 ", async () => {
            const response = await request.post("/movies").send({
                title: "LOTR",
                director: "Peter Jackson",
                release_date: "2001-12-19",
                fourth_field: 'sjsjsj'
            })
            expect(response.statusCode).toEqual(400)
        })
    })

    describe("when movie is already in the movies", () => {
        it("should return status 400 when movie is already in db", async () => {
            const response = await request.post("/movies").send({
                title: "LOTR",
                director: "Peter Jackson",
                release_date: "2001-12-19"
            })
            const found = movies.find(movie => movie.title === response.body.title)
            if (found) {
                expect(response.status).toBe(400)
            }
        })
    })
});

describe("DELETE /movies", () => {

    describe("when a movie want to be deleted", () => {
        it("should return status 404 when movie is not found", async () => {
            const response = await request.delete(`/movies/noSuchId`)
            const id = request.params;
            const found = movies.find(movie => movie.id === id)
            if (!found) {
                expect(response.status).toBe(404)
            }
        })

        it("should return status 200 when movie is deleted", async () => {
            const response = await request.delete(`/movies/21kj3h12kj3h12983h12jk312kl3`)
            const id = request.params;
            movies.push({
                title: "LOTR",
                director: "Peter Jackson",
                release_date: "2001-12-19",
                id: "21kj3h12kj3h12983h12jk312kl3"
            })
            const found = movies.find(movie => movie.id === id)
            if (found) {
                expect(response.status).toBe(200)
            }
        })
    })
});
