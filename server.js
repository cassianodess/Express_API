const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");
require('dotenv').config()
const knex = require('knex')
const repository = knex(
    {
    client: 'pg',
    connection: {
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USER,
        password : process.env.DB_PASSW,
        database : process.env.DB_NAME,
    },
  }
);

const app = express();

app.listen(8080);

const middleware = app.use(express.json(), CORS(), (request, response, next) => {

    if(request.headers.authorization !== process.env.AUTH){
        return response.status(400).send({status: false, message: "Unauthorized"});
    }
    next();
});

const list = app.get("/api/students", (request, response) => {
    
    repository.raw("select * from students order by id asc")
    .then(students => {
        return response.send(students.rows);
    });
});

const retrieve = app.get("/api/students/:id", (request, response) => {
    const id = request.params.id;
    
    repository.raw("select * from students where id = ?", id)
    .then(resp => {
        if(resp.rowCount == 0){
            throw Error;
        }
        return response.send(resp.rows);
    })
    .catch(error => {
        return response.status(404).send({status: false, message: "id not found"});
    });
});

const create = app.post("/api/students", (request, response) => {
    const user = request.body;

    repository.raw("insert into students (name, course) values (?, ?) returning id, name, course", [user.name, user.course])
    .then(resp => {
        return response.send(resp.rows);
    }).catch(error => {
        return response.status(400).send({status: false, message: "missing fields"});
    });

});

const update = app.put("/api/students/:id", (request, response) => {

    const id = request.params.id;
    const data = request.body;

    repository.raw("update students set name = ?, course = ? where id = ? returning id, name, course", [data.name, data.course, id])
    .then(resp => {
        if(resp.rowCount == 0){
            return response.status(404).send({status: false, message: "id not found"});
        }
        return response.send(resp.rows);
    })
    .catch(error => {
        return response.status(400).send({status: false, message: "missing fields"});
    });

});

const remove = app.delete("/api/students/:id", (request, response) => {
    const id = request.params.id;

    repository.raw("delete from students where id = ? returning id, name, course", [id])
    .then(resp => {
        if(resp.rows = 0){
            throw Error;
        }
        return response.send(resp.rows);
    })
    .catch(error => {
        return response.status(404).send({status: false, message: "id not found"});
    });    

});
