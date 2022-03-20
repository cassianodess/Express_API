const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");
require('dotenv').config();
const { repository, knex } = require('./database/repository');
const students = require('./controller/students');
const teachers = require('./controller/teachers');

const app = express();

app.listen(8080);

const middleware = app.use(express.json(), CORS(), (request, response, next) => {

    if(request.headers.authorization !== process.env.AUTH){
        return response.status(400).json({status: false, message: "Unauthorized"});
    }
    next();
});

app.get("/api/students", (request, response) => { students.list(request, response, repository) });

app.get("/api/students/:id", (request, response) => { students.retrieve(request, response, repository) });

app.post("/api/students", (request, response) => { students.create(request, response, repository) });

app.put("/api/students/:id", (request, response) => { students.update(request, response, repository) });

app.delete("/api/students/:id", (request, response) => { students.remove(request, response, repository) });

app.get("/api/teachers", (request, response) => { teachers.list(request, response, repository) });

app.get("/api/teachers/:id", (request, response) => { teachers.retrieve(request, response, repository) });

app.post("/api/teachers", (request, response) => { teachers.create(request, response, repository) });

app.put("/api/teachers/:id", (request, response) => { teachers.update(request, response, repository) });

app.delete("/api/teachers/:id", (request, response) => { teachers.remove(request, response, repository) });
