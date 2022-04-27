# Build a REST API with Node JS and Express

## Requirements

> A user should be able to **GET POST AND DELETE** operations on the movie database.

> A user should enter **title**, **director** and the **release date** of the movie

> User **must** be **warned** when one of the required **fields** **not provided**.

> User must not be able to give information other than required fields.

> **When** user provided **wrong id** he/she should not be able to delete any movies

> User **must not be able to add movie** **if** that movie is **already in the database**

---

## Testing

> Endpoints and their functionalities are tested with **jest and supertest**

---

## Movie API

---

**endpoints**

> **GET** _/movies_ finds all movies

> **GET** _/movies/:id_ finds a specific movie

> **POST** _/movies_ adds a movie into movies

> **DELETE** _/movies/:id_ deletes a movie from movies

---

## Structure

```
nodeJS-test-movie-api/
┣ __tests__/
┃ ┗ app.test.js
┣ controllers/
┃ ┗ movies.js
┣ routes/
┃ ┗ movies.js
┣ README.md
┣ babel.config.cjs
┣ index.js
┣ jest.config.js
┣ package-lock.json
┗ package.json
```

---

## Express Features

- GET
- DELETE
- POST
- Middleware
- Router

---

## Packages

- express
- nodemon
- uuidv4
- supertest
- jest
- babel
- @babel/preset-env

---

## ES6 + Features

- Arrow Functions
- async/await
- Modules export/import
- Destructuring Assignment

---
