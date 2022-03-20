const list = (request, response, repository) => {

    let query = "select * from students order by id asc";

    const {limit, offset} = request.query;

    if(limit && offset){
        query += ` offset ${offset} limit ${limit} `;
    }

    repository.raw(query)
    .then(students => {
        return response.json(students.rows);
    });
}

const retrieve = (request, response, repository) => {
    const id = request.params.id;
    
    repository.raw("select * from students where id = ?", id)
    .then(resp => {
        if(resp.rowCount == 0){
            throw Error;
        }
        return response.json(resp.rows);
    })
    .catch(error => {
        return response.status(404).json({status: false, message: "id not found"});
    });
}

const create = (request, response, repository) => {

    const {name, course} = request.body;

    repository.raw("insert into students (name, course) values (?, ?) returning id, name, course", [name, course])
    .then(resp => {
        return response.json(resp.rows);
    }).catch(error => {
        return response.status(400).json({status: false, message: "missing fields"});
    });

}

const update = (request, response, repository) => {

    const id = request.params.id;
    const {name, course} = request.body;


    repository.raw("update students set name = ?, course = ? where id = ? returning id, name, course", [name, course, id])
    .then(resp => {
        if(resp.rowCount == 0){
            return response.status(404).json({status: false, message: "id not found"});
        }
        return response.json(resp.rows);
    })
    .catch(error => {
        return response.status(400).json({status: false, message: "missing fields"});
    });

}

const remove = (request, response, repository) => {
    const id = request.params.id;

    repository.raw("delete from students where id = ? returning id, name, course", [id])
    .then(resp => {
        if(resp.rows = 0){
            throw Error;
        }
        return response.json(resp.rows);
    })
    .catch(error => {
        return response.status(404).json({status: false, message: "id not found"});
    });    

}

module.exports = {
    list,
    retrieve,
    create,
    update,
    remove
}
